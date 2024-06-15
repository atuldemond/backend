const mongoose = require("mongoose");

const ConnectionDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Getting error in Connecting to MongoDB");
    console.error(err);
  }
};

module.exports = ConnectionDb;
