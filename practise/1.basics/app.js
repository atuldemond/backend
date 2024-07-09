const express = require("express");
const app = express();
const path = require("path");

//database configuration
const mongoose = require("./config/mongoose");
const UserModel = require("./models/useModel");

//configuration of  ejs and public and json and urlencoded
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

//creating new post and saving it to the database
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  console.log(name, age);

  const existingUser = await UserModel.findOne({ age });
  if (existingUser) {
    return res.send("User already exists");
  }

  const user = await UserModel.create({ name, age });
  console.log(user);
  res.send("User created successfully");
});

app.use((req, res) => {
  res.status(404).send("You are on the wrong path");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
