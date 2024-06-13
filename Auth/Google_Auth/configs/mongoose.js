const mongoose = require("mongoose");
const db = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB");
    process.exit(1);
  }
};
module.exports = db;
