module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("lan_comments", {
    commentId: {
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
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "lan_posts",
        key: "id",
      },
    },
  });
  return Comment;
};
