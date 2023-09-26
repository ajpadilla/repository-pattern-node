import { Request, Response } from "express";

import { UserByIdFinder } from "../../appication/user-by-id-finder";
import { WelcomeMessageSender } from "../../appication/welcome-email-sender";
import { UserNotFound } from "../../domain/user-not-found";

export class UserController {
  constructor(
    private readonly userByIdFinder: UserByIdFinder,
    private readonly welcomeMessageSender: WelcomeMessageSender
  ) {}

  async run(req: Request, res: Response) {
    try {
      const user = await this.userByIdFinder.run(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(404).send();
      }
      res.status(500).send();
    }
  }

  async sendWelcomeMessage(req: Request, res: Response) {
    const { id: userId } = req.params;
    await this.welcomeMessageSender.sendToUser(userId);
    res.status(200).send();
  }
}
