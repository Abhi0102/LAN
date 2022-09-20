const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../models/user")(sequelize, DataTypes);

db.sequelize
  .sync()
  .then(() => {
    console.log("Models Successfully Synced");
  })
  .catch((error) => console.log("Error occured while syncing models", error));

module.exports = db;
