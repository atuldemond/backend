const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/revison");
db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

module.exports = db;
