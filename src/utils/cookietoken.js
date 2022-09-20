const jwt = require("jsonwebtoken");

const cookietoken = (user, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_DAY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;
  res
    .status(200)
    .cookie(process.env.COOKIE_TOKEN_NAME, token, options)
    .json({ success: true, user });
};

module.exports = cookietoken;
