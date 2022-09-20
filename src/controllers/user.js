const BigPromise = require("../utils/bigPromise");
const bcrypt = require("bcryptjs");
const db = require("../database/index");
const cookietoken = require("../utils/cookietoken");
const DBUsers = db.users;

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return next(new Error("Name, email, password are required."));
  }
  const existingUsers = await DBUsers.findAll({ where: { email } });
  if (existingUsers.length) {
    return next(new Error("User already exists."));
  }

  const newUser = await DBUsers.create({ name, email, password });

  cookietoken(newUser, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("Email and Password are Required."));
  }
  // Check User in DB
  const user = await DBUsers.findOne({ where: { email } });
  if (!user) {
    return next(new Error("Email does not exists."));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new Error("Please Enter Correct Password."));
  }
  cookietoken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  // Deleting the cookies
  res.cookie(process.env.COOKIE_TOKEN_NAME, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Successfully Logged out" });
});
