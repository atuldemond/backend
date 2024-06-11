const express = require("express");
const router = express.Router();
const { indexController } = require("../controllers/index-controller");
const { isLoggedin } = require("../middleware/is-Loggedin");

router.get("/", isLoggedin, indexController);

module.exports = router;
