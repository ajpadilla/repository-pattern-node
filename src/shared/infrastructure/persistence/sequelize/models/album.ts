import { DataTypes, Model } from "sequelize";

import { ARTIST_TABLE } from "./artist";

const ALBUM_TABLE = "album";

const AlbumSchema = {
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
    // type: DataTypes.INTEGER,
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: ARTIST_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  year_released: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  artwork: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

class Album extends Model {
  static associate(models: any) {
    this.belongsTo(models.Artist, {
      as: "Artist",
      foreignKey: "artist_id",
    });
    this.belongsToMany(models.Genre, {
      as: "AlbumGenres",
      through: models.TagAlbumGenre,
      foreignKey: "album_id",
      otherKey: "genre_id",
    });
    this.hasMany(models.Vinyl, {
      as: "vinyl",
      foreignKey: "album_id",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: ALBUM_TABLE,
      modelName: "Album",
      timestamps: true,
      underscored: true,
    };
  }
}

export { Album, ALBUM_TABLE, AlbumSchema };
