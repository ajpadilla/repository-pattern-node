import { Genre } from "./genre";
import { GenreId } from "./GenreId";

export interface GenderRepository {
  create(genre: Genre): Promise<Genre>;
  getById(genreId: GenreId | string): Promise<Genre | null>;
}
