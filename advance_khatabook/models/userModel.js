const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Simple length check
        return v.length >= 5;
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Basic email validation
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not valid`,
    },
  },
  posts: [
    {
      // Assuming post schema here, replace with actual post schema details
      title: String,
      content: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
