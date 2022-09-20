const express = require("express");
const { login, signup, logout } = require("../controllers/user");
const Router = express.Router();

Router.route("/login").post(login);
Router.route("/signup").post(signup);
Router.route("/logout").get(logout);

module.exports = Router;
