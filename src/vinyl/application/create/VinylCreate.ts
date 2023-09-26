import { Album } from "../../../album/domain/album";
import { Artist } from "../../../artist/domain/artist";
import { ArtistName } from "../../../artist/domain/artistName";
import { Genre } from "../../../genre/domain/genre";
import { Result } from "../../../shared/domain/logic/Result";
import { Vinyl } from "../../domain/vinyl";
import { VinylRepository } from "../../domain/vinyl-repository";
import { GenderRepository } from "../../../genre/domain/gender-repository";
import { GenreId } from "../../../genre/domain/GenreId";
import { UniqueEntityID } from "../../../shared/domain/core/UniqueEntityID";
import { TextUtil } from "../../../utils/TextUtil";
import { ArtistRepository } from "../../../artist/domain/artist-repository";
import { AlbumRepository } from "../../../album/domain/album-repository";

interface GenresRequestDTO {
  new: string[];
  ids: string[];
}

interface AddVinylToCatalogUseCaseRequestDTO {
  artistNameOrId: string;
  artistGenres: string | GenresRequestDTO;
  albumNameOrId: string;
  albumGenres: string | GenresRequestDTO;
  albumYearReleased: number;
  traderId: string;
}

export class VinylCreate {
  constructor(
    private readonly vinylRepository: VinylRepository,
    private readonly genderRepository: GenderRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  private getGenresFromRequest(genres: GenresRequestDTO): Genre[] {
    const genderList: Genre[] = [];

    if (genres.ids) {
      genres.ids.map(async (id: string) => {
        const genre = await this.genderRepository.getById(
          GenreId.create(new UniqueEntityID(id))
        );
        genderList.push(<Genre>genre);
      });
    } else {
      genres.new.map(async (name: string) => {
        const genre = await this.genderRepository.create(
          <Genre>Genre.create(name).getValue()
        );
        genderList.push(<Genre>genre);
      });
    }

    return genderList;
  }

  private async getArtist(
    request: AddVinylToCatalogUseCaseRequestDTO
  ): Promise<Result<Artist>> {
    const { artistNameOrId, artistGenres } = request;
    const isArtistIdProvided = TextUtil.isUUID(artistNameOrId);

    if (isArtistIdProvided) {
      const artist = await this.artistRepository.getById(artistNameOrId);
      const found = !!artist;
      if (found) {
        return Result.ok<Artist>(artist);
      } else {
        return Result.fail<Artist>(
          `Couldn't find artist by id=${artistNameOrId}`
        );
      }
    } else {
      return Artist.create({
        name: <ArtistName>ArtistName.create(artistNameOrId).getValue(),
        genres: this.getGenresFromRequest(<GenresRequestDTO>artistGenres),
      });
    }
  }

  private async getAlbum(
    request: AddVinylToCatalogUseCaseRequestDTO,
    artist: Artist
  ): Promise<Result<Album>> {
    const { albumNameOrId, albumGenres, albumYearReleased } = request;
    const isAlbumIdProvided = TextUtil.isUUID(albumNameOrId);

    if (isAlbumIdProvided) {
      const album = await this.albumRepository.getById(albumNameOrId);
      const found = !!album;

      if (found) {
        return Result.ok<Album>(album);
      } else {
        return Result.fail<Album>(`Couldn't find album by id=${album}`)
      }
    } else {
      return Album.create({
        name: albumNameOrId,
        artistId: artist.artistId,
        genres: this.getGenresFromRequest(<GenresRequestDTO>albumGenres),
        yearReleased: albumYearReleased,
      });
    }
  }

  async run(
    request: AddVinylToCatalogUseCaseRequestDTO
  ): Promise<Result<Vinyl>> {
    let artist: Artist;
    let album: Album;
    try {
      const artistOrError = await this.getArtist(request);
      if (artistOrError.isFailure) {
        return Result.fail<Vinyl>(artistOrError.error);
      } else {
        artist = <Artist>artistOrError.getValue();
      }

      const albumOrError = await this.getAlbum(request, artist);
      if (albumOrError.isFailure) {
        return Result.fail<Vinyl>(albumOrError.error);
      } else {
        album = <Album>albumOrError.getValue();
      }

      const vinylOrError = Vinyl.create({
        album: album,
        artist: artist,
        traderId: 1,
      });

      if (vinylOrError.isFailure) {
        return Result.fail<Vinyl>(vinylOrError.error);
      }

      const vinyl = <Vinyl>vinylOrError.getValue();

      // This is where all the magic happens
      await this.vinylRepository.create(vinyl);

      return Result.ok<Vinyl>(vinyl);
    } catch (err) {
      console.log(err);
      return Result.fail<Vinyl>(err);
    }
  }
}
