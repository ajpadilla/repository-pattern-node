import { Entity } from "../../shared/domain/core/Entity";
import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";

export class ArtistId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
  public static create(id?: UniqueEntityID): ArtistId {
    return new ArtistId(id);
  }
}
