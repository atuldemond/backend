const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
