export class Trader {
  private readonly _UserId: number;
  private readonly _reputation: number;

  constructor(UserId: number, reputation: number) {
    this._UserId = UserId;
    this._reputation = reputation;
  }

  get UserId(): number {
    return this._UserId;
  }

  get reputation(): number {
    return this._reputation;
  }

  public static create(UserId: number, reputation: number): Error | Trader{
    if (!UserId || !reputation) {
      throw new Error("Must provide a valid genre list or valid name");
    } else {
      return new Trader(UserId, reputation);
    }
  }
}
