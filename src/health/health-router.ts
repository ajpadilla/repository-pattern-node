import express from "express";

import { HealthController } from "./health-controller";

const healthRouter = express.Router();

const healthController = new HealthController();

healthRouter.post("/", healthController.run.bind(healthController));

export { healthRouter };
