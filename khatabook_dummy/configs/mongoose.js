const mongoose = require("mongoose");

const connectionDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/khatabook_dummy");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Getting error in Connecting to MongoDB");
    console.error(err);
  }
};

module.exports = connectionDb;
