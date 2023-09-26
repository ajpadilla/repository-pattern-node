import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { USER_COLLECTION } from "./user-collection";

export class ElasticUserRespository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    console.log("Using elastic");
    const rawUser = USER_COLLECTION.find((user) => user.id === id);
    return rawUser ? new User(rawUser.id, rawUser.name, rawUser.email) : null;
  }

  create(data: object): Promise<User | null> {
    return null;
  }
}
