import { Genre } from "../../genre/domain/genre";
import { Entity } from "../../shared/domain/core/Entity";
import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Guard } from "../../shared/domain/logic/Guard";
import { Result } from "../../shared/domain/logic/Result";
import { ArtistId } from "./artistId";
import { ArtistName } from "./artistName";

interface ArtistProps {
  name: ArtistName;
  genres: Genre[];
}

export class Artist extends Entity<ArtistProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get artistId(): ArtistId {
    return ArtistId.create(this.id);
  }

  get name(): ArtistName {
    return this.props.name;
  }

  get genres(): Genre[] {
    return this.props.genres;
  }

  public static create(
    props: ArtistProps,
    id?: UniqueEntityID
  ): Result<Artist> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.genres, argumentName: "genres" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Artist>(guardResult.message);
    } else {
      return Result.ok<Artist>(
        new Artist(
          {
            ...props,
            genres: Array.isArray(props.genres) ? props.genres : [],
          },
          id
        )
      );
    }
  }
}
