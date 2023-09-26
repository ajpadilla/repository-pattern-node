import { Command } from "../../../shared/domain/core/bus/Command";

interface GenresRequestDTO {
  new: string[];
  ids: string[];
}

interface AddVinylToCatalogUseCaseRequestDTO {
  artistNameOrId: string;
  artistGenres: string | GenresRequestDTO;
  albumNameOrId: string;
  albumGenres: string | GenresRequestDTO;
  albumYearReleased: number;
  traderId: string;
}

export class CreateVinylCommand implements Command {
  private readonly _artistNameOrId: string;
  private readonly _artistGenres: string | GenresRequestDTO;
  private readonly _albumNameOrId: string;
  private readonly _albumYearReleased: number;
  private readonly _traderId: string;
  private readonly _albumGenres: string | GenresRequestDTO;

  constructor(request: AddVinylToCatalogUseCaseRequestDTO) {
    this._artistNameOrId = request.artistNameOrId;
    this._artistGenres = request.artistGenres;
    this._albumNameOrId = request.albumNameOrId;
    this._albumGenres = request.albumGenres;
    this._albumYearReleased = request.albumYearReleased;
    this._traderId = request.traderId;
  }

  get artistNameOrId(): string {
    return this._artistNameOrId;
  }

  get artistGenres(): string | GenresRequestDTO {
    return this._artistGenres;
  }

  get albumNameOrId(): string {
    return this._albumNameOrId;
  }

  get albumYearReleased(): number {
    return this._albumYearReleased;
  }

  get traderId(): string {
    return this._traderId;
  }

  get albumGenres(): string | GenresRequestDTO {
    return this._albumGenres;
  }

  public print(): void {
    console.log("You are calling CreateVinylCommand", this._artistNameOrId);
  }
}
