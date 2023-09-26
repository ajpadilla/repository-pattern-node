import { Album } from "../../album/domain/album";
import { AlbumMap } from "../../album/mapper/AlbumMap";
import { Artist } from "../../artist/domain/artist";
import { ArtistMap } from "../../artist/mapper/ArtistMap";
//import { UniqueEntityID } from "../../shared/domain/core/UniqueEntityID";
import { Mapper } from "../../shared/infrastructure/Mapper";
import { Vinyl } from "../domain/vinyl";

export class VinylMap extends Mapper<Vinyl> {
  public static toDomain(raw: any): Vinyl | null {
    const vinylOrError = Vinyl.create(
      {
        traderId: raw.trader_id,
        artist: <Artist>ArtistMap.toDomain(raw.Artist),
        album: <Album>AlbumMap.toDomain(raw.Album),
      },
      //new UniqueEntityID(raw.vinyl_id)
      raw.id
    );

    vinylOrError.isFailure ? console.log(vinylOrError) : "";

    return vinylOrError.isSuccess ? <Vinyl>vinylOrError.getValue() : null;
  }

  public static toPersistence(vinyl: Vinyl): any {
    return {
      id: vinyl.id.toString(),
      artist_id: vinyl.artist.artistId.id.toString(),
      album_id: vinyl.album.albumId.id.toString(),
      notes: vinyl.vinylNotes?.value,
    };
  }
}
