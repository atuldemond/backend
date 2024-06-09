const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:2027/lookup");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to Database safely");
});

module.exports = db;
