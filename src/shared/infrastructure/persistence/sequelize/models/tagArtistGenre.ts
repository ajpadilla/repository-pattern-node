import { DataTypes, Model } from "sequelize";

import { ARTIST_TABLE } from "./artist";
import { GENRE_TABLE } from "./genre";

const TAG_ARTIST_GENRE_TABLE = "tag_artist_genre";

const TagArtistGenreSchema = {
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
  artist_id: {
    field: "artist_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: ARTIST_TABLE,
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

class TagArtistGenre extends Model {
  static associate(models: any) {
    this.belongsTo(models.Artist, {
      foreignKey: "artist_id",
      targetKey: "artist_id",
      as: "Artist",
    });
    this.belongsTo(models.Genre, {
      foreignKey: "genre_id",
      targetKey: "genre_id",
      as: "Genre",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TAG_ARTIST_GENRE_TABLE,
      modelName: "TagArtistGenre",
      timestamps: true,
      underscored: true,
    };
  }
}

export { TAG_ARTIST_GENRE_TABLE, TagArtistGenre, TagArtistGenreSchema };
