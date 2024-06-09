const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/aggregations");
db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to Mongoose database");
});

module.exports = db;
