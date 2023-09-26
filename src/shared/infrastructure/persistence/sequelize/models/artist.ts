import { DataTypes, Model } from "sequelize";

const ARTIST_TABLE = "artist";

const ArtistSchema = {
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

class Artist extends Model {
  static associate(models: any) {
    this.hasMany(models.Album, {
      as: "Album",
      foreignKey: "artist_id",
    });
    this.belongsToMany(models.Genre, {
      as: "ArtistGenres",
      through: models.TagArtistGenre,
      foreignKey: "artist_id",
      otherKey: "genre_id",
    });
    this.hasMany(models.Vinyl, {
      as: "vinyl",
      foreignKey: "artist_id",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: ARTIST_TABLE,
      modelName: "Artist",
      timestamps: true,
      underscored: true,
    };
  }
}

export { Artist, ARTIST_TABLE, ArtistSchema };
