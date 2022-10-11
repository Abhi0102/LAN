const BigPromise = require("../middlewares/bigPromise");
const db = require("../database/index");
const { sequelize } = require("../database/index");
const DBUsers = db.users;
const DBPosts = db.posts;
const DBComments = db.comments;
const DBFollowers = db.followers;
const DBReactions = db.reactions;

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
      {
        model: DBReactions,
        as: "reactions",
        attributes: ["userId", "reaction"],
      },
    ],
  });

  posts.map((post) => {
    let postReaction = 0;
    if (post.dataValues.reactions.length) {
      post.dataValues.reactions.map((reaction) => {
        // console.log(reaction.dataValues.reaction);
        postReaction = postReaction + reaction.dataValues.reaction;
      });
    }
    post.dataValues["reactionSum"] = postReaction;
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
  await DBReactions.destroy({ where: { postId } });
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

exports.getPostById = BigPromise(async (req, res, next) => {
  const followerId = req.user.id;
  const followingId = req.params.id;
  const isFollowing = await DBFollowers.findAll({
    where: { followerId, followingId },
  });
  if (followingId != followerId && !isFollowing.length) {
    return next(new Error("You are not allowed to access the posts."));
  }

  const posts = await DBPosts.findAll({
    where: { userId: followingId },
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
      {
        model: DBReactions,
        as: "reactions",
        attributes: ["userId", "reaction"],
      },
    ],
  });

  posts.map((post) => {
    let postReaction = 0;
    if (post.dataValues.reactions.length) {
      post.dataValues.reactions.map((reaction) => {
        // console.log(reaction.dataValues.reaction);
        postReaction = postReaction + reaction.dataValues.reaction;
      });
    }
    post.dataValues["reactionSum"] = postReaction;
  });

  res.status(200).json({ success: true, posts });
});

exports.upVote = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  const { postId } = req.body;
  const reaction = await DBReactions.findOne({
    where: { userId, postId },
  });
  if (reaction) {
    await DBReactions.destroy({ where: { userId, postId } });
    const newReactions = await DBReactions.findAll({
      where: { postId },
      attributes: ["userId", "reaction"],
    });
    let sumReaction = 0;
    if (newReactions.length) {
      newReactions.map((reaction) => {
        sumReaction += reaction.dataValues.reaction;
      });
    }
    res.status(200).json({
      success: true,
      isReactionAvailable: false,
      sumReaction,
      newReactions,
    });
  } else {
    await DBReactions.create({ postId, userId, reaction: 1 });
    const newReactions = await DBReactions.findAll({
      where: { postId },
      attributes: ["userId", "reaction"],
    });
    let sumReaction = 0;
    if (newReactions.length) {
      newReactions.map((reaction) => {
        sumReaction += reaction.dataValues.reaction;
      });
    }
    res.status(200).json({
      success: true,
      isReactionAvailable: true,
      sumReaction,
      newReactions,
    });
  }
});

exports.downVote = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  const { postId } = req.body;
  const reaction = await DBReactions.findOne({
    where: { userId, postId },
  });
  if (reaction) {
    await DBReactions.destroy({ where: { userId, postId } });
    const newReactions = await DBReactions.findAll({
      where: { postId },
      attributes: ["userId", "reaction"],
    });
    let sumReaction = 0;
    if (newReactions.length) {
      newReactions.map((reaction) => {
        sumReaction += reaction.dataValues.reaction;
      });
    }
    res.status(200).json({
      success: true,
      isReactionAvailable: false,
      sumReaction,
      newReactions,
    });
  } else {
    await DBReactions.create({ postId, userId, reaction: -1 });
    const newReactions = await DBReactions.findAll({
      where: { postId },
      attributes: ["userId", "reaction"],
    });
    let sumReaction = 0;

    if (newReactions.length) {
      newReactions.map((reaction) => {
        sumReaction += reaction.dataValues.reaction;
      });
    }
    res.status(200).json({
      success: true,
      isReactionAvailable: true,
      sumReaction,
      newReactions,
    });
  }
});
