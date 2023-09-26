import { Vinyl } from "./vinyl";
import { VinylId } from "./VinylId";

export interface VinylRepository {
  create(vinyl: Vinyl): Promise<Vinyl | null>;
  getById(vinylId: VinylId | string): Promise<Vinyl | null>;
}
