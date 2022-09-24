require("dotenv").config();
const express = require("express");
const errorHandler = require("./src/middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
require("./src/database/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const user = require("./src/routes/user");
const post = require("./src/routes/post");

app.use("/api/v1/user", user);
app.use("/api/v1/post", post);

app.use(errorHandler);

module.exports = app;
