module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define("lan_followers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "lan_users",
        key: "id",
      },
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      references: {
        model: "lan_users",
        key: "id",
      },
      allowNull: false,
    },
  });
  return Follower;
};
