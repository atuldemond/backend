const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  pasword: String,
});
module.exports = mongoose.model("user", userSchema);
