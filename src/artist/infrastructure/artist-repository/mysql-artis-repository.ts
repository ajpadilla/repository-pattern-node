import { GenderRepository } from "../../../genre/domain/gender-repository";
import { sequelize } from "../../../shared/infrastructure/persistence /sequelize/service/sequelize";
//import { sequelize } from "../../../shared/infrastructure/persistence /sequelize/service/sequelize";
import { Artist } from "../../domain/artist";
import { ArtistRepository } from "../../domain/artist-repository";
import { ArtistId } from "../../domain/artistId";
import { ArtistMap } from "../../mapper/ArtistMap";
import { Genre } from "../../../genre/domain/genre";
import bodyParser from "body-parser";

export class MysqlArtisRepository implements ArtistRepository {
  constructor(readonly mysqlGenderRepository: GenderRepository) {}

  private createBaseQuery(): any {
    return {
      where: {},
      include: [
        {
          model: sequelize.models.Artist,
          as: "Artist",
          include: [
            {
              model: sequelize.models.Genre,
              as: "ArtistGenres",
              required: false,
            },
          ],
        },
      ],
    };
  }

  async getById(artistId: ArtistId | string): Promise<Artist | null> {
    const artistModel = sequelize.models.Artist;
    const query = this.createBaseQuery();
    query["id"] =
      artistId instanceof ArtistId
        ? (<ArtistId>artistId).id.toValue()
        : artistId;
    const artistSequelizeInstance = await artistModel.findOne(query);
    return ArtistMap.toDomain(artistSequelizeInstance);
  }

  public async exists(artistId: ArtistId | string): Promise<boolean> {
    const artistModel = sequelize.models.Artist;
    const query = this.createBaseQuery();
    query["id"] =
      artistId instanceof ArtistId
        ? (<ArtistId>artistId).id.toValue()
        : artistId;
    const artistSequelizeInstance = await artistModel.findOne(query);
    return !!artistSequelizeInstance;
  }

  public async removeArtistById(artistId: ArtistId | string): Promise<any> {
    const artistModel = sequelize.models.Artist;
    return artistModel.destroy({
      where: {
        id:
          artistId instanceof ArtistId
            ? (<ArtistId>artistId).id.toValue()
            : artistId,
      },
    });
  }

  public async rollbackSave(artist: Artist): Promise<any> {
    const artistModel = sequelize.models.Artist;
    await this.mysqlGenderRepository.removeByGenreIds(
      artist.genres.map((g) => g.genreId)
    );
    await artistModel.destroy({
      where: {
        id: artist.id.toString(),
      },
    });
  }

  private async setArtistGenres (sequelizeArtistModel: any, genres: Genre[]): Promise<any[]> {
    if (!sequelizeArtistModel || genres.length === 0) return [];
    return sequelizeArtistModel.setGenres(
      genres.map((d) => d.genreId.id.toString())
    );
  }

  async create(artist: Artist): Promise<Artist> {
    const artistModel = sequelize.models.Artist;
    const exists: boolean = await this.exists(artist.artistId);
    const artistToPersistir: any = ArtistMap.toPersistence(artist);
    let rawArtist;

    try {
      if (!exists) {
        rawArtist = await artistModel.create(artistToPersistir);
      } else {
        rawArtist = await artistModel.update(artistToPersistir);
      }

      if (artist.genres && rawArtist) {
        for (const gender of artist.genres) {
          const newGenre = await this.mysqlGenderRepository.create(gender);
          await sequelize.models.TagArtistGenre.create({
            artist_id: rawArtist.dataValues.id,
            genre_id: newGenre.id,
          });
        }
      }
    } catch (err) {
      console.log(err);
      await this.rollbackSave(artist);
    }

    return artist;
  }
}
