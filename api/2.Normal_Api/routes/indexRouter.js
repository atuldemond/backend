const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const db = require("../configs/mongoose");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/create", async (req, res) => {
  const user = await new userModel({
    name: req.body.name,
    age: req.body.age,
  });
  await user.save();
  console.log(user);
  // res.json({ status: "success", message: "User created" });
  res.redirect("/api/data");
});

module.exports = router;
