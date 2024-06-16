const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
router.get("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", getUserProfile);

module.exports = router;