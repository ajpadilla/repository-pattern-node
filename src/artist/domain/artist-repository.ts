import { Artist } from "./artist";
import { ArtistId } from "./artistId";

export interface ArtistRepository {
  create(artist: Artist): Promise<Artist>;
  getById(artistId: ArtistId | string): Promise<Artist | null>;
  removeArtistById(artistId: ArtistId): Promise<any>;
}
