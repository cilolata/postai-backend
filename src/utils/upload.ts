import { Readable } from "typeorm/platform/PlatformTools";
import ffmpeg from "fluent-ffmpeg";
import FfmpegPath from "@ffmpeg-installer/ffmpeg";
import { bucket } from "../lib/firebase/firebase";

ffmpeg.setFfmpegPath(FfmpegPath.path);

export class UploadService {
  constructor(private file: Express.Multer.File | undefined) {}

  async uploadVideo(): Promise<string> {
    if (!this.file) return "";
    const fileName = Date.now() + "_" + (this.file.originalname ?? 'video');
    const firebaseFile = bucket.file(fileName);

    const stream = firebaseFile.createWriteStream({
      metadata: {
        contentType: this.file.mimetype,
      },
      resumable: true,
      validation: false,
      public: true,
      timeout: 30 * 60 * 1000, // 30 minutos
    });

    const uploadPromise = new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });

    stream.end(this.file.buffer);
    await uploadPromise;
    await firebaseFile.makePublic();
    return firebaseFile.publicUrl();
  }

  async extractAudio(): Promise<string | undefined> {
    try {
      if (!this.file) return "";
      const name = this.file.originalname.split(".")[0] ?? Date.now() + "_" + 'video';
      const firebaseFile = bucket.file(`audio/${name}.mp3`);

      const audioBucket = firebaseFile.createWriteStream({
        metadata: {
          contentType: "audio/mp3",
        },
        resumable: true,
        validation: false,
        public: true,
        timeout: 30 * 60 * 1000, // 30 minutos
      });

      const video = Buffer.from(this.file.buffer);
      const videoStream = Readable.from(video);

      ffmpeg(videoStream)
        .toFormat("mp3")
        .audioBitrate("128k")
        .on("error", (err) => console.error("Erro FFmpeg:", err))
        .pipe(audioBucket, { end: true });

      const newFileName = `audio/${name}.mp3.wav_transcription.txt`;
      const url = bucket.file(newFileName);
      await url.makePublic();
      const newTranscription = await bucket.file(newFileName).download();
      const textStringfy =  newTranscription.toString('utf8')
      return JSON.stringify(textStringfy);
    } catch (error) {
      console.log(error);
    }
  }
}
