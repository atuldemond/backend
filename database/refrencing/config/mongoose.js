const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/referencing");

const db = mongoose.connection;
db.on("open", () => {
  console.log("we are connected to Database too");
});

module.exports = db;
