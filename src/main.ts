import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import { healthRouter } from "./health/health-router";
import { userRouter } from "./users/infrastructure/http/user-router";
import { vinylRouter } from "./vinyl/infrastructure/http/vinyl-routes";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/health", healthRouter);
  app.use("/users", userRouter);
  app.use("/vinyl", vinylRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
