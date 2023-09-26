import { DataTypes, Model } from "sequelize";

//import { TRADER_TABLE } from "./trader";
import { ARTIST_TABLE } from "./artist";
import { ALBUM_TABLE } from "./album";

const VINYL_TABLE = "vinyl";

const VinylSchema = {
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
  /*trader_id: {
    field: "trader_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: TRADER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },*/
  artist_id: {
    field: "artist_id",
    allowNull: false,
    //type: DataTypes.INTEGER,
    type: DataTypes.UUID,
    references: {
      model: ARTIST_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  album_id: {
    field: "album_id",
    allowNull: false,
    //type: DataTypes.INTEGER,
    type: DataTypes.UUID,
    references: {
      model: ALBUM_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

class Vinyl extends Model {
  static associate(models: any) {
    this.belongsTo(models.Album, { as: "Album", foreignKey: "album_id" });
    this.belongsTo(models.Artist, { as: "Artist", foreignKey: "artist_id" });
    /*this.belongsTo(models.Trader, {
      as: "Trader",
      foreignKey: "trader_id",
      targetKey: "id",
    });*/
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: VINYL_TABLE,
      modelName: "Vinyl",
      timestamps: true,
    };
  }
}

export { Vinyl, VINYL_TABLE, VinylSchema };
