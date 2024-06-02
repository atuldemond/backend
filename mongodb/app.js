const express = require("express");
const app = express();
const mongooseConnection = require("./config/mongoose");
const debuglog = require("debug")("development:app");
const userModel = require("./models/user");

const port = 3000;
app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/create", async function (req, res) {
  let createduser = await userModel.create({
    username: "Anup",
    name: "Anup Kumar",
    email: "anupkumar@gmail.com",
    password: "AnupKumar$123",
  });
  console.log("User Created");

  res.send(createduser);
});

app.get("/read", async function (req, res) {
  // let user = await userModel.findOne({
  //   name: "Atul Demond",
  // });

  let user = await userModel.find();

  console.log("user Found");
  res.send(user);
});

app.get("/update", async function (req, res, next) {
  let user = await userModel.findOneAndUpdate(
    { name: "Atul Demond" },
    { name: "Updated Atul Demond" },
    { new: true }
  );
  res.send(user);
});

app.get("/delete", async function (req, res) {
  let user = await userModel.findOneAndDelete({ name: "Ratnesh Kumar" });
  res.send(user);
});

app.post("/senddata", async function (req, res, next) {
  let { username, name, email, password } = req.body;
  let userCreated = await userModel.create({
    username,
    name,
    email,
    password,
  });
  console.log("user added to database");
  res.send(userCreated);
});
app.get("/readusers", async function (req, res) {
  let users = await userModel.find();
  res.send(users);
});

app.get("/users/:username", async function (req, res) {
  let users = await userModel.findOne({ username: req.params.username });
  res.send(users);
});
app.get("/update/:username", async function (req, res) {
  let { username, name, email } = req.body;
  let users = await userModel.findOneAndUpdate(
    { username: req.params.username },
    { username, name, email },
    {
      new: true,
    }
  );
  res.send(users);
});

app.get("/delete/:username", async function (req, res) {
  let { username, name, email } = req.body;
  let user = await userModel.findOneAndDelete({
    username: req.params.username,
  });
  res.send("User Delted");
});

app.get("*", (req, res) => {
  res.send("Page Not Found");
});

app.listen(port);
