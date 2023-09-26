import { USER_COLLECTION } from "./user-collection";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";

export class InMemoryUserRepository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    console.log("Using InMemory");
    const rawUser = USER_COLLECTION.find((user) => user.id === id);

    if (!rawUser) {
      return null;
    }

    return new User(rawUser.id, rawUser.name, rawUser.email);
  }

  create(data: object): Promise<User | null> {
    return null;
  }
}
