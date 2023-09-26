import { Request, Response } from "express";

export class HealthController {
  async run(req: Request, res: Response) {
    console.log(req.body);
    res.status(200).send();
  }
}
