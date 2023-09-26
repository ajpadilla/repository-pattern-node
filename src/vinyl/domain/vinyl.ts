import { Album } from "../../album/domain/album";
import { Artist } from "../../artist/domain/artist";
import { AggregateRoot } from "../../shared/domain/core/AggregateRoot";
import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Guard } from "../../shared/domain/logic/Guard";
import { Result } from "../../shared/domain/logic/Result";
import { VinylId } from "./VinylId";
import { VinylNotes } from "./VinylNotes";

interface VinylProps {
  traderId: number;
  artist: Artist;
  album: Album;
  vinylNotes?: VinylNotes;
  dateAdded?: Date;
}

export type VinylCollection = Vinyl[];

export class Vinyl extends AggregateRoot<VinylProps> {
  get vinylId(): VinylId {
    return VinylId.create(this.id);
  }

  get artist(): Artist {
    return this.props.artist;
  }

  get album(): Album {
    return this.props.album;
  }

  get dateAdded(): Date {
    return <Date>this.props.dateAdded;
  }

  get traderId(): number {
    return this.props.traderId;
  }

  get vinylNotes(): VinylNotes | undefined {
    return this.props.vinylNotes;
  }

  private constructor(props: VinylProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: VinylProps, id?: UniqueEntityID): Result<Vinyl> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.album, argumentName: "album" },
      { argument: props.artist, argumentName: "artist" },
      { argument: props.traderId, argumentName: "traderId" },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Vinyl>(propsResult.message);
    }

    const vinyl = new Vinyl(
      {
        ...props,
        dateAdded: props.dateAdded ? props.dateAdded : new Date(),
      },
      id
    );
    return Result.ok<Vinyl>(vinyl);
  }
}
