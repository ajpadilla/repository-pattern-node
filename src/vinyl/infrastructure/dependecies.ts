import { MysqlAlbumRepository } from "../../album/infrastructure/album-repository/mysql-album-repository";
import { MysqlArtisRepository } from "../../artist/infrastructure/artist-repository/mysql-artis-repository";
import { MysqlGenderRepository } from "../../genre/infrastructure/gender-repository/mysql-gender-repository";
import { CreateVinylCommandHandler } from "../application/create/CreateVinylCommandHandler";
import { VinylFinder } from "../application/find/VinylFinder";
import { VinylController } from "./http/vinyl-controller";
import { MysqlVinylRepository } from "./vinyl-repository/mysql-vinyl-repository";
import { VinylCreate } from "../application/create/VinylCreate";

const genreRepository = new MysqlGenderRepository();

const artisRepository = new MysqlArtisRepository(genreRepository);
const albumRepository = new MysqlAlbumRepository(genreRepository)

const vinylRepository = new MysqlVinylRepository(
  artisRepository,
  albumRepository
);

const vinylFinder = new VinylFinder(vinylRepository);

const vinylCreate = new VinylCreate(
  vinylRepository,
  genreRepository,
  artisRepository,
  albumRepository
);

const createVinylCommandHandler = new CreateVinylCommandHandler(vinylCreate);

createVinylCommandHandler.setupSubscriptions();

export const vinylController = new VinylController(vinylFinder);
