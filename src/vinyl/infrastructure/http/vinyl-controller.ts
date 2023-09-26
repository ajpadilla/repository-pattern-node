import { Request, Response } from "express";

import { InMemoriaCommandBus } from "../../../shared/domain/core/bus/command/InMemoriaCommandBus";
import { CreateVinylCommand } from "../../application/create/CreateVinylCommand";
import { VinylFinder } from "../../application/find/VinylFinder";

export class VinylController {
  constructor(
    //private readonly vinylCreate: VinylCreate,
    private readonly vinylFinder: VinylFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      //const vinyl = await this.vinylCreate.run(req.body);
      InMemoriaCommandBus.dispatch(new CreateVinylCommand(req.body));
      //res.status(200).send(vinyl);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  }

  async vinyls(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const vinyl = await this.vinylFinder.run(id);
      res.status(200).send(vinyl);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  }
}
