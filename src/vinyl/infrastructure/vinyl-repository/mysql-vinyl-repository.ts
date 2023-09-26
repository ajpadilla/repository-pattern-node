import { AlbumRepository } from "../../../album/domain/album-repository";
import { ArtistRepository } from "../../../artist/domain/artist-repository";
import { sequelize } from "../../../shared/infrastructure/persistence /sequelize/service/sequelize";
import { Vinyl } from "../../domain/vinyl";
import { VinylRepository } from "../../domain/vinyl-repository";
import { VinylMap } from "../../mapper/VinylMap";
import { VinylId } from "../../domain/VinylId";
/*import { Genre } from "../../../genre/domain/Genre";
import { Album } from "../../../album/domain/album";
import { Artist } from "../../../artist/domain/artist";*/
//import { USER_COLLECTION } from "../../../users/infrastructure/user-repository/user-collection";

export class MysqlVinylRepository implements VinylRepository {
  constructor(
    public readonly artistRepository: ArtistRepository,
    public readonly albumRepository: AlbumRepository
  ) {}

  public createBaseQuery(): any {
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

  async getById(vinylId: VinylId | string): Promise<Vinyl | null> {
    const vinylModel = sequelize.models.Vinyl;
    const query = this.createBaseQuery();
    query.where["id"] =
      vinylId instanceof VinylId ? (<VinylId>vinylId).id.toValue() : vinylId;
    const sequelizeVinylInstance = await vinylModel.findOne(query);
    if (!sequelizeVinylInstance) {
      return null;
    }
    return VinylMap.toDomain(sequelizeVinylInstance);
  }

  public async exist(vinylId: VinylId | string): Promise<boolean> {
    const vinylModel = sequelize.models.Vinyl;
    const query = this.createBaseQuery();
    query.where["id"] =
      vinylId instanceof VinylId ? (<VinylId>vinylId).id.toValue() : vinylId;
    const sequelizeVinylInstance = await vinylModel.findOne(query);
    return !!sequelizeVinylInstance;
  }
  /*
  *  public async getVinylCollection (traderId: TraderId | string): Promise<Vinyl[]> {
    const VinylModel = this.models.Vinyl;
    const query = this.createBaseQuery();
    query.where['trader_id'] = (
      traderId instanceof TraderId ? (<TraderId>traderId).id.toValue() : traderId
    );
    const sequelizeVinylCollection = await VinylModel.findAll(query);
    return sequelizeVinylCollection.map((v) => VinylMap.toDomain(v));
  }
  * */

  private async rollbackSave(vinyl: Vinyl) {
    const VinylModel = sequelize.models.Vinyl;
    await this.artistRepository.removeArtistById(vinyl.artist.artistId);
    await this.albumRepository.removeAlbumById(vinyl.artist.artistId);
    await VinylModel.destroy({
      where: {
        vinyl_id: vinyl.vinylId.id.toString(),
      },
    });
  }

  async create(vinyl: Vinyl): Promise<Vinyl | null> {
    const VinylModel = sequelize.models.Vinyl;
    const exist: boolean = await this.exist(vinyl.vinylId);
    const rawVinyl: any = VinylMap.toPersistence(vinyl);
    try {
      await this.artistRepository.create(vinyl.artist);
      await this.albumRepository.create(vinyl.album);

      if (!exist) {
        await VinylModel.create(rawVinyl);
      } else {
        await VinylModel.update(rawVinyl);
      }
    } catch (err) {
      console.log(err);
      await this.rollbackSave(vinyl);
    }
    return vinyl;
  }
}
