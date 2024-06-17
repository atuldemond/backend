const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  encrypted: {
    type: Boolean,
    default: false,
  },
  shareable: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  passcode: {
    // Only present when 'encrypted' is true
    type: String,
  },
  edit: {
    // Only true when 'shareable' is true
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
