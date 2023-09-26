import { GenderRepository } from "../../../genre/domain/gender-repository";
import { sequelize } from "../../../shared/infrastructure/persistence /sequelize/service/sequelize";
import { Album } from "../../domain/album";
import { AlbumRepository } from "../../domain/album-repository";
import { AlbumId } from "../../domain/albumId";
import { AlbumMap } from "../../mapper/AlbumMap";
import { Genre } from "../../../genre/domain/genre";

export class MysqlAlbumRepository implements AlbumRepository {
  constructor(readonly genderRepository: GenderRepository) {}

  private createBaseQuery(): any {
    return {
      where: {},
      include: [
        {
          model: sequelize.models.Album,
          as: "Album",
          include: [
            {
              model: sequelize.models.Genre,
              as: "AlbumGenres",
              required: false,
            },
          ],
        },
      ],
    };
  }

  public async exists(albumId: AlbumId | string): Promise<boolean> {
    const AlbumModel = sequelize.models.Album;
    const query = this.createBaseQuery();
    query["id"] =
      albumId instanceof AlbumId ? (<AlbumId>albumId).id.toValue() : albumId;

    const album = await AlbumModel.findOne(query);
    return !!album;
  }

  public removeAlbumById(albumId: AlbumId | string): Promise<number> {
    const AlbumModel = sequelize.models.Artist;
    return AlbumModel.destroy({
      where: {
        id:
          albumId instanceof AlbumId
            ? (<AlbumId>albumId).id.toValue()
            : albumId,
      },
    });
  }

  public async rollbackSave(album: Album): Promise<any> {
    const AlbumModel = sequelize.models.Artist;
    await this.genderRepository.removeByGenreIds(album.genres.map((g) => g.genreId));
    await AlbumModel.destroy({
      where: {
        album_id: album.id.toString()
      }
    })
  }

  private async setAlbumGenres(
    sequelizeAlbumModel: any,
    genres: Genre[]
  ): Promise<any[]> {
    if (!!!sequelizeAlbumModel || genres.length === 0) return [];
    return sequelizeAlbumModel.setGenres(
      genres.map((d) => d.genreId.id.toString())
    );
  }

  async getById(albumId: AlbumId | string): Promise<Album | null> {
    const albumModel = sequelize.models.Album;
    const query = this.createBaseQuery();
    query["id"] =
      albumId instanceof AlbumId ? (<AlbumId>albumId).id.toValue() : albumId;
    const album = await albumModel.findOne(query);
    if (!album) {
      return null;
    }
    return AlbumMap.toDomain(album);
  }

  async create(album: Album): Promise<Album> {
    console.log("album", album);
    const albumModel = sequelize.models.Album;
    const exists: boolean = await this.exists(album.albumId);
    const toPersistence: any = AlbumMap.toPersistence(album);

    let sequelizeAlbumModel;
    try {
      // const rawAlbum = await albumModel.create(toPersistence);

      if (!exists) {
        sequelizeAlbumModel = await albumModel.create(toPersistence);
      } else {
        sequelizeAlbumModel = await albumModel.update(toPersistence);
      }

      if (album.genres) {
        for (const gender of album.genres) {
          const newGenre = await this.genderRepository.create(gender);
          await sequelize.models.TagAlbumGenre.create({
            album_id: sequelizeAlbumModel.dataValues.id,
            genre_id: newGenre.id,
          });
        }
      }
    } catch (err) {
      console.log(err);
      await this.rollbackSave(album);
    }

    return album;
  }
}
