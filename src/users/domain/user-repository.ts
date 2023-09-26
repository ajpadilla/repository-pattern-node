import { User } from "./user";

export interface UserRepository {
  create(data: object): Promise<User | null>;
  getById(id: string): Promise<User | null>;
}
