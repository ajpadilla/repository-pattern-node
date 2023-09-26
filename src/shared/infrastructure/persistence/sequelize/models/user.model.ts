import { DataTypes, Model } from "sequelize";

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  is_email_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: "customer",
  },
};

class User extends Model {
  static associate(models: any) {
    //this.hasOne(models.Trader, { as: "Trader", foreignKey: "trader_base_id" });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: true,
    };
  }
}

export { User, USER_TABLE, UserSchema };
