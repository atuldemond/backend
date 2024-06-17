const mongoose = require("mongoose");
const multerSchema = new mongoose.Schema({
  name: String,
  username: String,
  image: String,
});

const Multer = mongoose.model("Multer", multerSchema);
module.exports = Multer;
