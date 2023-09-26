import { ArtistId } from "../../artist/domain/artistId";
import { Genre } from "../../genre/domain/genre";
import { Entity } from "../../shared/domain/core/Entity";
import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Guard } from "../../shared/domain/logic/Guard";
import { Result } from "../../shared/domain/logic/Result";
import { AlbumId } from "./albumId";

interface AlbumProps {
  name: string;
  artistId: ArtistId;
  yearReleased?: number;
  genres?: Genre[];
  artwork?: string;
}

export class Album extends Entity<AlbumProps> {
  public static MAX_NUMBER_GENRES_PER_ALBUM = 3;

  private constructor(props: AlbumProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get albumId(): AlbumId {
    return AlbumId.create(this.id);
  }

  get artistId(): ArtistId {
    return this.props.artistId;
  }

  get name(): string {
    return this.props.name;
  }

  get genres(): Genre[] | undefined {
    return this.props.genres;
  }

  get yearReleased(): number {
    return <number>this.props.yearReleased;
  }

  get artwork(): string {
    return <string>this.props.artwork;
  }

  public static create(props: AlbumProps, id?: UniqueEntityID): Result<Album> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.artistId, argumentName: "artistId" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Album>(guardResult.message);
    } else {
      return Result.ok<Album>(
        new Album(
          {
            ...props,
            genres: props.genres ? props.genres : [],
          },
          id
        )
      );
    }
  }
}
