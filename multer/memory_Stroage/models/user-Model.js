const mongoose = require("mongoose");
const multerSchema = new mongoose.Schema({
  name: String,
  username: String,
  image: Buffer,
});

const Multer = mongoose.model("Multer", multerSchema);
module.exports = Multer;
