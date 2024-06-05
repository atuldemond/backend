const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/khatabook");
db = mongoose.connection;

db.on("error", (err) => {
  console.log("getting error from database connection ");
});

db.on("open ", () => {
  console.log("Connection is Sucessfull");
});

module.exports = db;
