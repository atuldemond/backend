const mongoose = require("mongoose");

const connectionDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to Db");
  } catch (err) {
    console.error("Mongodb connection error", err);
    process.exit(1);
  }
};

module.exports = connectionDb;
