require("dotenv").config();
const app = require("./app");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 8080;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
