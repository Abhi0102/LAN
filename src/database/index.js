const { Sequelize } = require("sequelize");
const config = require("./config");

const db = {
  Op: Sequelize.Op,
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

db.sync = async () => {
  await db.sequelize.sync();

  await seedData();
};
async function seedData() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = db;
