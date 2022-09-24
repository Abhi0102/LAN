const BigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
const db = require("../database/index");
const DBUsers = db.users;

// Check User is Logged in or not and inject it in request if logged in
exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_TOKEN_NAME];

  if (!token) {
    return next(new Error("Please Login First to access this page."));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await DBUsers.findByPk(decode.id);
  next();
});
