const express = require("express");
const {
  getAllPost,
  addPost,
  addComment,
  deleteComment,
  deletePost,
  getPostById,
  upVote,
  downVote,
} = require("../controllers/post");
const { isLoggedIn } = require("../middlewares/user");
// const { getPosts } = require();

const Router = express.Router();

Router.route("/get-posts").get(getAllPost);
Router.route("/add-post").post(isLoggedIn, addPost);
Router.route("/delete-post").post(isLoggedIn, deletePost);
Router.route("/add-comment").post(isLoggedIn, addComment);
Router.route("/delete-comment").post(isLoggedIn, deleteComment);
Router.route("/upvote").post(isLoggedIn, upVote);
Router.route("/downvote").post(isLoggedIn, downVote);
Router.route("/get-user-post/:id").get(isLoggedIn, getPostById);
// Router.route("/signup").post(signup);
// Router.route("/logout").get(logout);
// Router.route("/get-user").get(isLoggedIn, getUserDetail);
// Router.route("/update-user").post(isLoggedIn, updateUserDetail);
// Router.route("/test").get(() => {
//   console.log("Hey");
// });

module.exports = Router;
