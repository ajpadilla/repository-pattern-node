import express from "express";

import { vinylController } from "../dependecies";

const vinylRouter = express.Router();

vinylRouter.post("/store", vinylController.run.bind(vinylController));
vinylRouter.get("/:id", vinylController.vinyls.bind(vinylController));

export { vinylRouter };
