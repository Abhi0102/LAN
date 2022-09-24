const express = require("express");
const { getAllPost, addPost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares/user");
// const { getPosts } = require();

const Router = express.Router();

Router.route("/get-posts").get(getAllPost);
Router.route("/add-post").post(isLoggedIn, addPost);
// Router.route("/signup").post(signup);
// Router.route("/logout").get(logout);
// Router.route("/get-user").get(isLoggedIn, getUserDetail);
// Router.route("/update-user").post(isLoggedIn, updateUserDetail);
// Router.route("/test").get(() => {
//   console.log("Hey");
// });

module.exports = Router;
