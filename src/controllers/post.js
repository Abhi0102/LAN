const BigPromise = require("../middlewares/bigPromise");
const db = require("../database/index");
const DBUsers = db.users;
const DBPosts = db.posts;
const DBComments = db.comments;
exports.getAllPost = BigPromise(async (req, res, next) => {
  const posts = await DBPosts.findAll({
    include: [
      {
        model: DBUsers,
        as: "user",
        attributes: ["id", "name", "email", "joinedOn", "avatar"],
      },
      {
        model: DBComments,
        as: "comments",
        include: [
          {
            model: DBUsers,
            as: "user",
            attributes: ["id", "name", "email", "joinedOn", "avatar"],
          },
        ],
      },
    ],
  });
  res.status(200).json({ success: true, posts });
});

exports.addPost = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  const { content, image } = req.body;
  const post = await DBPosts.create({ userId, content, image });
  res.status(200).json({ success: true, post });
});
