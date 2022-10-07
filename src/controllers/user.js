const BigPromise = require("../middlewares/bigPromise");
const bcrypt = require("bcryptjs");
const cookietoken = require("../utils/cookietoken");
const db = require("../database/index");
const DBUsers = db.users;
const DBFollowers = db.followers;

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
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

exports.getUserDetail = BigPromise(async (req, res, next) => {
  const user = await DBUsers.findOne({
    attributes: ["id", "name", "email", "joinedOn", "avatar"],
    where: { id: req.user.id },
  });
  res.status(200).json({ success: true, user });
});

exports.updateUserDetail = BigPromise(async (req, res, next) => {
  const { name } = req.body;
  await DBUsers.update({ name }, { where: { id: req.user.id } });
  res.status(200).json({ success: true });
});

exports.getAllUser = BigPromise(async (req, res, next) => {
  const users = await DBUsers.findAll({
    attributes: ["id", "name", "email", "joinedOn", "avatar"],
  });
  const following = await DBFollowers.findAll({
    attributes: ["followingId"],
    where: { followerId: req.user.id },
  });

  for (let i = 0; i < users.length; i++) {
    for (let j of following) {
      if (users[i].dataValues.id === j.dataValues.followingId) {
        users[i].dataValues["isFollowing"] = true;
        break;
      } else {
        users[i].dataValues["isFollowing"] = false;
      }
    }
  }
  res.status(200).json({ success: true, users });
});

exports.follow = BigPromise(async (req, res, next) => {
  const followerId = req.user.id;
  const followingId = req.body.id;
  const user = await DBFollowers.findOne({
    where: { followerId, followingId },
  });
  if (user) {
    return next(new Error("User Already Following."));
  }
  await DBFollowers.create({ followerId, followingId });
  res.status(200).json({ success: true });
});

exports.unfollow = BigPromise(async (req, res, next) => {
  const followerId = req.user.id;
  const followingId = req.body.id;
  await DBFollowers.destroy({ where: { followerId, followingId } });
  res.status(200).json({ success: true });
});

exports.getFollowingUser = BigPromise(async (req, res, next) => {
  const following = await DBFollowers.findAll({
    where: { followerId: req.user.id },
    include: [
      {
        model: DBUsers,
        as: "followingUser",
        attributes: ["id", "name", "email", "joinedOn", "avatar"],
      },
    ],
  });
  const users = [];
  following.map((item) => {
    const { followingUser } = item;
    followingUser.dataValues["isFollowing"] = true;
    users.push(followingUser);
  });
  res.status(200).json({ success: true, users });
});
// Delete User
