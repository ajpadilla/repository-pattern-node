import { Entity } from "../../shared/domain/core/Entity";
import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Result } from "../../shared/domain/logic/Result";
import { GenreId } from "./GenreId";

interface GenreProps {
  value: string;
}

export class Genre extends Entity<GenreProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get genreId(): GenreId {
    return GenreId.create(this.id);
  }

  get value(): string {
    return this.props.value;
  }

  private constructor(props: GenreProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(name: string, id?: UniqueEntityID): Result<Genre> {
    if (!name || name.length === 0) {
      return Result.fail<Genre>("Must provide a genre name");
    } else {
      return Result.ok<Genre>(new Genre({ value: name }, id));
    }
  }
}
