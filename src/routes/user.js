const express = require("express");
const {
  login,
  signup,
  logout,
  getUserDetail,
  updateUserDetail,
  getAllUser,
  follow,
  unfollow,
  getFollowingUser,
  deleteUser,
} = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/user");
const Router = express.Router();

Router.route("/login").post(login);
Router.route("/signup").post(signup);
Router.route("/logout").get(logout);
Router.route("/get-user").get(isLoggedIn, getUserDetail);
Router.route("/update-user").post(isLoggedIn, updateUserDetail);
Router.route("/get-all-users").get(isLoggedIn, getAllUser);
Router.route("/follow").post(isLoggedIn, follow);
Router.route("/unfollow").post(isLoggedIn, unfollow);
Router.route("/get-following-users").get(isLoggedIn, getFollowingUser);
Router.route("/delete").get(isLoggedIn, deleteUser);
Router.route("/test").get(() => {
  console.log("Hey");
});

module.exports = Router;
