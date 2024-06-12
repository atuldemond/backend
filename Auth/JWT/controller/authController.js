const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
const cookieParser = require("cookie-parser");
module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(200).send("Your Account has been registered");
    }
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
    });
    let token = genrateToken({ email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send(user);
  } catch (e) {
    res.status(500).send("something went wrong from /register");
  }
};
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).send("email and password is Wrong");
    }

    let result = await bcrypt.compare(password, user.password);
    console.log(result);
    if (result) {
      let token = genrateToken({ email });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).send("loggin successful");
    } else {
      res.status(500).send("email and password is Wrong");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports.logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
  });

  res.status(201).send("logout successfully");
};
module.exports.getUserProfile = (req, res) => {
  console.log(req.user);
  res.send("we got your cookie and app dekh sakte ho profile");
};
