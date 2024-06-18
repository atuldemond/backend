const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/multerjs");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Conneted to Multer");
});

module.exports = db;
