const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  createUser,
  loginAc,
} = require("../controllers/authController");
router.get("/register", registerUser);
router.post("/createuser", createUser);
router.get("/login", loginUser);
router.post("/loginac", loginAc);
router.get("/logout", logoutUser);
router.get("/profile", getUserProfile);

module.exports = router;
