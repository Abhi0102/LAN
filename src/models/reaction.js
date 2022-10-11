module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define("lan_reactions", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "lan_users",
        key: "id",
      },
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "lan_posts",
        key: "id",
      },
      allowNull: false,
    },
    reaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Reaction;
};
