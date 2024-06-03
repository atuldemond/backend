const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/testigaddbms");
const debuglog = require("debug")("development:mongooseconfig");
const db = mongoose.connection;

db.on("error", (err) => {
  debuglog(err);
});

db.on("open", () => {
  debuglog("connection opened");
});

module.exports = db;
