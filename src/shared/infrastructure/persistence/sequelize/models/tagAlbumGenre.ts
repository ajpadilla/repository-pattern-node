import { DataTypes, Model } from "sequelize";

import { ALBUM_TABLE } from "./album";
import { GENRE_TABLE } from "./genre";

const TAG_ALBUM_GENRE_TABLE = "tag_album_genre";

const TagAlbumGenreSchema = {
  id: {
    /*allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,*/

    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  album_id: {
    field: "album_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: ALBUM_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    unique: "unique-genre-per-artist",
  },
  genre_id: {
    field: "genre_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: GENRE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    unique: "unique-genre-per-artist",
  },
};

class TagAlbumGenre extends Model {
  static associate(models: any) {
    this.belongsTo(models.Album, {
      as: "Album",
      foreignKey: "album_id",
    });
    this.belongsTo(models.Genre, {
      as: "Genre",
      foreignKey: "genre_id",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TAG_ALBUM_GENRE_TABLE,
      modelName: "TagAlbumGenre",
      timestamps: true,
      underscored: true,
    };
  }
}

export { TAG_ALBUM_GENRE_TABLE, TagAlbumGenre, TagAlbumGenreSchema };
