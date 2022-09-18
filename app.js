const express = require("express");
const app = express();
const db = require("./src/database/index");
db.sync();

module.exports = app;
