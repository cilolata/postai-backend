import "reflect-metadata";
import "dotenv/config";
import "./lib/typeorm/typeorm";

import express from "express";
import { router } from "./routes/routes";
import { handleError } from "./middlewares/errorHandlers";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger";
import cors from "cors";
import multer from "multer";

import timedout from "connect-timeout";
import { createPostController } from "./http/controllers/post-controller/create-post";

const app = express();
app.use(cors());

// Para vídeos grandes (até 1GB)
export const uploadVideo = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
    files: 2, // Apenas 1 arquivo
  },
}).single("video")

app.post("/posts", timedout(30 * 60 * 2000), uploadVideo, createPostController);

app.use(express.json());
app.use("/postai", swaggerUi.serve, swaggerUi.setup(specs));
app.use(router);
app.use(handleError);

app.listen(3000, () => console.log("server running on port 3000"));
