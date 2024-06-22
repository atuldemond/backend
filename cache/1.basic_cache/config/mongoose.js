const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/reddismodal");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to database sucesfully");
});

module.exports = db;
