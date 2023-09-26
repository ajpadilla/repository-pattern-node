import { UserRepository } from "../../domain/user-repository";
import { User } from "../../domain/user";
import { USER_COLLECTION } from "./user-collection";
import { sequelize } from "../../../shared/infrastructure/persistence /sequelize/service/sequelize";

export class MysqlUserRepository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    console.log("Using mongo");
    const rawUser = USER_COLLECTION.find((user) => user.id === id);
    return rawUser ? new User(rawUser.id, rawUser.name, rawUser.email) : null;
  }

  async create(data: object): Promise<User | null> {
    const newUser = await sequelize.models.User.create({
      ...data,
    });
    return newUser
      ? new User(
          newUser.dataValues.id,
          newUser.dataValues.name,
          newUser.dataValues.email
        )
      : null;
  }
}
