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
db.posts = require("../models/post")(sequelize, DataTypes);
db.comments = require("../models/comment")(sequelize, DataTypes);
db.followers = require("../models/follower")(sequelize, DataTypes);
db.reactions = require("../models/reaction")(sequelize, DataTypes);

db.users.hasMany(db.posts, { foreignKey: "userId", as: "post" });
db.posts.belongsTo(db.users, { foreignKey: "userId", as: "user" });

db.posts.hasMany(db.comments, { foreignKey: "postId", as: "comments" });
db.comments.belongsTo(db.posts, { foreignKey: "postId", as: "post" });

db.users.hasMany(db.comments, { foreignKey: "userId", as: "comments" });
db.comments.belongsTo(db.users, { foreignKey: "userId", as: "user" });

db.users.hasMany(db.followers, { foreignKey: "followerId", as: "follower" });
db.followers.belongsTo(db.users, {
  foreignKey: "followerId",
  as: "followerUser",
});

db.users.hasMany(db.followers, { foreignKey: "followingId", as: "following" });
db.followers.belongsTo(db.users, {
  foreignKey: "followingId",
  as: "followingUser",
});

db.users.hasMany(db.reactions, { foreignKey: "userId", as: "user" });
db.reactions.belongsTo(db.users, { foreignKey: "userId", as: "user" });

db.posts.hasMany(db.reactions, { foreignKey: "postId", as: "reactions" });
db.reactions.belongsTo(db.users, { foreignKey: "postId", as: "post" });

db.sequelize
  .sync()
  .then(() => {
    console.log("Models Successfully Synced");
  })
  .catch((error) => console.log("Error occured while syncing models", error));

module.exports = db;
