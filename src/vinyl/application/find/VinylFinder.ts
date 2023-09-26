import { Vinyl } from "../../domain/vinyl";
import { VinylRepository } from "../../domain/vinyl-repository";

export class VinylFinder {
  constructor(private readonly vinylRepository: VinylRepository) {}

  async run(id: string): Promise<Vinyl | null> {
    return await this.vinylRepository.getById(id);
  }
}
