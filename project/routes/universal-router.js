const express = require("express");
const router = express.Router();
const { universalController } = require("../controllers/universal-controller");
router.get("*", universalController);

module.exports = router;
