require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("./src/database/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const user = require("./src/routes/user");

app.use("/api/v1/user", user);

module.exports = app;
