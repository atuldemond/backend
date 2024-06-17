const userModel = require("../models/user-model");

module.exports.registerUser = async (req, res) => {
  try {
    // Simulating registration logic
    res.render("register");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.createUser = async (req, res) => {
  const { username, password, email, name } = req.body;
  try {
    let user = await userModel.create({
      name,
      username,
      email,
      password,
    });
    console.log(user);
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    // Simulating login logic
    res.render("login");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.loginAc = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({
      $and: [{ email: email }, { password: password }],
    });

    if (user && user.email === email && user.password === password) {
      res.render("profile", { user });
      console.log(user);
    } else {
      res.render("pagenotfound");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    // Simulating logout logic
    res.render("logout");
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    // Simulating get user profile logic
    res.render("profile");
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).send("Internal Server Error");
  }
};
