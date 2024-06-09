const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // Ensures usernames are unique across the database
  },
  email: {
    type: String,
    required: true,
    // Ensures emails are unique across the database
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // References the Post model
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
