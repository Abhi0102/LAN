const express = require("express");
const {
  login,
  signup,
  logout,
  getUserDetail,
  updateUserDetail,
} = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/user");
const Router = express.Router();

Router.route("/login").post(login);
Router.route("/signup").post(signup);
Router.route("/logout").get(logout);
Router.route("/get-user").get(isLoggedIn, getUserDetail);
Router.route("/update-user").post(isLoggedIn, updateUserDetail);
Router.route("/test").get(() => {
  console.log("Hey");
});

module.exports = Router;
