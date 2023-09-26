import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Mapper } from "../../shared/infrastructure/Mapper";
import { Genre } from "../domain/genre";

export class GenreMap extends Mapper<Genre | null> {
  public static toDomain(raw: any): Genre | null {
    const genreOrError = Genre.create(
      raw.name,
      new UniqueEntityID(raw.genre_id)
    );

    genreOrError.isFailure ? console.log(genreOrError.error) : "";

    return genreOrError.isSuccess ? <Genre>genreOrError.getValue() : null;
  }

  public static toPersistence(genre: Genre): any {
    return {
      id: genre.genreId.id.toString(),
      name: genre.value,
    };
  }
}
