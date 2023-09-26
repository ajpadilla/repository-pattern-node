export class UserNotFound extends Error {
  constructor(id: string) {
    super(`User not foun "${id}"`);
  }
}
