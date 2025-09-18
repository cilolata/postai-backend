import "reflect-metadata";
import "dotenv/config";
import "./lib/typeorm/typeorm";

import express from "express";
import { router } from "./routes/routes";
import { handleError } from "./middlewares/errorHandlers";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use(router);
app.use(handleError);

app.use("/postai", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
