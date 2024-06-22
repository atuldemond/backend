const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  id: Number,
  name: String,
  email: String,
});
module.exports = mongoose.model("user", userSchema);
