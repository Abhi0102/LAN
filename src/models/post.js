module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("lan_posts", {
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    imageId: {
      type: DataTypes.STRING,
    },
  });
  return Post;
};
