const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const db = require("../configs/mongoose");
const data = require("../database/userdata");
const userModel = require("../models/userModel");

router.get("/data", async (req, res) => {
  const user = await userModel.find();
  res.json(user);
});

module.exports = router;
