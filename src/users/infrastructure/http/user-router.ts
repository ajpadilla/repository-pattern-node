import express from "express";

import { userController } from "../dependencies";
const userRouter = express.Router();

userRouter.get("/:id", userController.run.bind(userController));
userRouter.post(
  "/:id/welcome",
  userController.sendWelcomeMessage.bind(userController)
);

export { userRouter };
