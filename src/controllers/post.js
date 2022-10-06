const BigPromise = require("../middlewares/bigPromise");
const db = require("../database/index");
const DBUsers = db.users;
const DBPosts = db.posts;
const DBComments = db.comments;
const cloudinary = require("cloudinary").v2;
exports.getAllPost = BigPromise(async (req, res, next) => {
  const posts = await DBPosts.findAll({
    order: [
      ["id", "DESC"],
      ["comments", "commentId", "DESC"],
    ],
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
  const { content } = req.body;
  let image = null;
  let imageId = null;
  if (req.files) {
    let file = req.files.image;
    const picUploadResult = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      }
    );
    image = picUploadResult.secure_url;
    imageId = picUploadResult.public_id;
  }
  if (!content) {
    return next(new Error("Post content is required."));
  }
  const newPost = await DBPosts.create({ userId, content, image, imageId });
  const post = await DBPosts.findByPk(newPost.id, {
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
  res.status(200).json({ success: true, post });
});

exports.deletePost = BigPromise(async (req, res, next) => {
  const { postId, imageId } = req.body;
  if (!postId) {
    return next(new Error("Post Id is required."));
  }
  //   const post = await DBPosts.findByPk(postId);
  if (imageId) {
    await cloudinary.uploader.destroy(imageId);
  }
  await DBPosts.destroy({ where: { id: postId } });
  await DBComments.destroy({ where: { postId } });
  res.status(200).json({ success: true });
});

exports.addComment = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  const { comment, postId } = req.body;
  if (!comment || !postId) {
    return next(new Error("Post Id and Comment are required."));
  }
  const newComment = await DBComments.create({
    userId,
    content: comment,
    postId,
  });
  const respComment = await DBComments.findByPk(newComment.commentId, {
    include: [
      {
        model: DBUsers,
        as: "user",
        attributes: ["id", "name", "email", "joinedOn", "avatar"],
      },
    ],
  });
  res.status(200).json({ success: true, comment: respComment });
});

exports.deleteComment = BigPromise(async (req, res, next) => {
  const { postId, commentId } = req.body;
  if (!postId || !commentId) {
    return next(new Error("Post Id and Comment Id are required."));
  }
  await DBComments.destroy({
    where: {
      postId,
      commentId,
    },
  });
  res.status(200).json({ success: true });
});
