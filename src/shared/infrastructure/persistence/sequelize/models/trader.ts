import { DataTypes, Model } from "sequelize";

import { USER_TABLE } from "./user.model";

const TRADER_TABLE = "trader";

const TraderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  trader_base_id: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "user_id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class Trader extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "trader_base_id",
      targetKey: "id",
      as: "BaseUser",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: TRADER_TABLE,
      modelName: "Trader",
      timestamps: true,
    };
  }
}

export { Trader, TRADER_TABLE, TraderSchema };
