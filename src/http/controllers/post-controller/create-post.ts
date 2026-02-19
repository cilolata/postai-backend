import { Request, Response } from "express";
import { makeCreatePostUseCase } from "../../../use-cases/factory/make-create-post-use-case";
import { EPermission } from "../../../entities/models/user.interface";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindUserUseByIdCase } from "../../../use-cases/factory/make-find-user-by-id";
import { UploadService } from "../../../utils/upload";
import { FILE } from "dns";

export const createPostController = async (req: Request, res: Response) => {
  try {
    const { user_id, ...rest } = req.body;
    const findUserPermission = makeFindUserUseByIdCase();
    const user = await findUserPermission.findUserByIdUseCase(user_id);

    if (!user) {
      throw new ErrorHandler(404, "Usuário nao encontrado");
    }

    if (user?.permission_type !== EPermission.TEACHER) {
      throw new ErrorHandler(
        401,
        "Usuário não tem permissão para criar postagens"
      );
    }

    if (req.file) {
        const videoBuffer = new UploadService(req.file as unknown as Express.Multer.File);
        const url = await videoBuffer.uploadVideo();
        const transcription = await videoBuffer.extractAudio();

        const newPost = {
          ...rest,
          user_id,
          teacher: user.username,
          url,
          transcription,
        };

      if(url &&  transcription) {
      const createPostUseCase = makeCreatePostUseCase();
      await createPostUseCase.createPostUseCase(newPost);
      }
    } else {
      const newPost = {
        ...rest,
        user_id,
        teacher: user.username,
      };
      const createPostUseCase = makeCreatePostUseCase();
      await createPostUseCase.createPostUseCase(newPost);
    }

    return res.status(201).json({ success: "Post criado com sucesso" });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
