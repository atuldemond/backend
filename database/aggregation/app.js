const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb
const mongoose = require("./config/mongoose");
const postModel = require("./models/posts-model");
const userModel = require("./models/user-model");

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

app.post("/createuser", async (req, res) => {
  let { username, password, email } = req.body;
  console.log(username, password, email);
  let user = await userModel.create({
    username: username,
    password: password,
    email: email,
  });
  res.send(user);
});

app.post("/:username/createpost", async (req, res) => {
  let username = req.params.username;
  let content = req.body.content;

  let user = await userModel.findOne({ username: username });
  let post = await postModel.create({
    content: content,
    user: user._id,
  });
  user.posts.push(post);
  user.save();
  res.send(post);
});

app.get("/agri", async (req, res) => {
  let user = await userModel.aggregate([
    { $match: { username: "atuldemond" } },
    { $match: { email: "atuldemond@gmail.com" } },
  ]);
  res.send(user);
});

app.get("/agri/group", async (req, res) => {
  let user = await userModel.aggregate([
    {
      $group: {
        _id: "email",
        data: {
          $push: "$$ROOT",
        },
      },
    },
  ]);
  res.send(user);
});

app.get("/post", async (req, res) => {
  let post = await postModel.find().populate("user");

  res.send(post);
});

app.get("/user", async (req, res) => {
  let user = await userModel.find().populate("posts");

  res.send(user);
});
app.get("*", (req, res) => {
  res.send("Enter Wrong URl");
});

app.listen(3000);
