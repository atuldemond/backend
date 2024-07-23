const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const db = require("../configs/mongoose");

router.get("/data", async (req, res) => {
  const users = await userModel.find();
  res.json({ status: "success", data: users });
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

router.patch("/update/:id", async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );
  res.json({ status: "success", data: user });
});

router.delete("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.json({ status: "success", message: "User deleted" });
});
module.exports = router;
