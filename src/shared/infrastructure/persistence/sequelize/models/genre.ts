import { DataTypes, Model } from "sequelize";

const GENRE_TABLE = "genre";

const GenreSchema = {
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

class Genre extends Model {
  static associate(models: any) {
    this.belongsToMany(models.Artist, {
      as: "ArtistGenres",
      through: models.TagArtistGenre,
      foreignKey: "genre_id",
      otherKey: "artist_id",
    });
    this.belongsToMany(models.Album, {
      as: "AlbumGenres",
      through: models.TagAlbumGenre,
      foreignKey: "genre_id",
      otherKey: "album_id",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: GENRE_TABLE,
      modelName: "Genre",
      timestamps: true,
      underscored: true,
    };
  }
}

export { Genre, GENRE_TABLE, GenreSchema };
