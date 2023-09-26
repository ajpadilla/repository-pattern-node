import { ArtistId } from "../../artist/domain/artistId";
import { Mapper } from "../../shared/infrastructure/Mapper";
import { Album } from "../domain/album";
import { AlbumId } from "../domain/albumId";

export class AlbumMap extends Mapper<Album> {
  public static toDomain(raw: any): Album | null {
    const albumOrError = Album.create(
      {
        artistId: ArtistId.create(raw.artist_id),
        name: raw.name,
        artwork: raw.artwork,
        yearReleased: raw.year_released,
      },
      AlbumId.create(raw.id).id
    );

    albumOrError.isFailure ? console.log(albumOrError.error) : "";

    return albumOrError.isSuccess ? <Album>albumOrError.getValue() : null;
  }

  public static toPersistence(album: Album): any {
    return {
      id: album.id.toString(),
      artist_id: album.artistId.id.toString(),
      name: album.name,
      year_released: album.yearReleased,
      artwork: album.artwork,
    };
  }
}
