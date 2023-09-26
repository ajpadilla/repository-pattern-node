import { sequelize } from "../../../shared/infrastructure/persistence /sequelize/service/sequelize";
import { GenderRepository } from "../../domain/gender-repository";
import { Genre } from "../../domain/genre";
import { GenreMap } from "../../mapper/GenreMap";
import { GenreId } from "../../domain/GenreId";

export class MysqlGenderRepository implements GenderRepository {
  private createBaseQuery (): any {
    return {
      where: {},
    };
  }
  async create(genre: Genre): Promise<Genre> {
    const newGenre = await sequelize.models.Genre.create({
      ...GenreMap.toPersistence(genre),
    });
    return <Genre>GenreMap.toDomain(newGenre.dataValues);
  }

  async saveCollection(genres: []): Promise<void> {
    const GenreModel = sequelize.models.Genre;
    await GenreModel.bulkCreate(genres, {
      ignoreDuplicates: true,
    });
  }

  async getById(genreId: GenreId | string): Promise<Genre | null> {
    const GenreModel = sequelize.models.Genre;
    const query = this.createBaseQuery();
    query.where["id"] =
      genreId instanceof GenreId ? (<GenreId>genreId).id.toValue() : genreId;
    const sequelizeGenreInstance = await GenreModel.findOne(query);
    if (!sequelizeGenreInstance) {
      return null;
    }
    return GenreMap.toDomain(sequelizeGenreInstance);
  }
}
