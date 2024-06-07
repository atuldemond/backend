const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  posts: [
    {
      content: String,
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
