import { GenreMap } from "../../genre/mapper/GenreMap";
import { Mapper } from "../../shared/infrastructure/Mapper";
//import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Artist } from "../domain/artist";
import { ArtistName } from "../domain/artistName";
import { ArtistId } from "../domain/artistId";

export class ArtistMap extends Mapper<Artist> {
  public static toDomain(raw: any): Artist | null {
    const artistOrError = Artist.create(
      {
        name: <any>ArtistName.create(raw.name).getValue(),
        genres: raw.Genres.map((g: any) => GenreMap.toDomain(g.dataValues)),
      },
      //new UniqueEntityID(raw.artist_id)
      ArtistId.create(raw.id).id
    );

    artistOrError.isFailure ? console.log(artistOrError.error) : "";

    return artistOrError.isSuccess ? <Artist>artistOrError.getValue() : null;
  }

  public static toPersistence(artist: Artist): any {
    return {
      id: artist.artistId.id.toString(),
      name: artist.name.value,
    };
  }
}
