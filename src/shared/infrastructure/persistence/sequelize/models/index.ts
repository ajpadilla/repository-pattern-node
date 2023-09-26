import { Album, AlbumSchema } from "./album";
import { Artist, ArtistSchema } from "./artist";
import { Genre, GenreSchema } from "./genre";
import { TagAlbumGenre, TagAlbumGenreSchema } from "./tagAlbumGenre";
import { TagArtistGenre, TagArtistGenreSchema } from "./tagArtistGenre";
import { User, UserSchema } from "./user.model";
import { Vinyl, VinylSchema } from "./vinyl";

export const setupModels = (sequelize: any): void => {
  User.init(UserSchema, User.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  Artist.init(ArtistSchema, Artist.config(sequelize));
  Album.init(AlbumSchema, Album.config(sequelize));
  TagArtistGenre.init(TagArtistGenreSchema, TagArtistGenre.config(sequelize));
  TagAlbumGenre.init(TagAlbumGenreSchema, TagAlbumGenre.config(sequelize));
  Vinyl.init(VinylSchema, Vinyl.config(sequelize));

  User.associate(sequelize.models);
  Genre.associate(sequelize.models);
  Artist.associate(sequelize.models);
  Album.associate(sequelize.models);
  Vinyl.associate(sequelize.models);
};
