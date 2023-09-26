import { Album } from "./album";

export interface AlbumRepository {
  create(album: Album): Promise<Album>;
  getById(id: string): Promise<Album | null>;
}
