import { Sequelize } from "sequelize";

import { setupModels } from "../models";

const sequelize = new Sequelize("domain_user", "root", "Heme19234099", {
  host: "localhost",
  dialect: "mysql",
  query: { raw: true },
});

setupModels(sequelize);
sequelize.sync();

export { sequelize };
