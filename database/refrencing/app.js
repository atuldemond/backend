const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongooseConnection = require("./config/mongoose");
const userModel = require("./models/user-model");
const postModel = require("./models/posts-model");

app.get("/", (req, res) => {
  res.send("This is rout page");
});

app.post("/create/user", async (req, res) => {
  let user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  res.send(user);
});

app.post("/:username/create/post", async (req, res) => {
  let username = req.params.username;
  let content = req.body.content;
  let user = await userModel.findOne({ username: username });

  let post = await postModel.create({
    content: content,
    user: user._id,
  });
  user.posts.push(post._id);
  await user.save();
  res.send({ user, post });
});

app.get("/posts", async (req, res) => {
  let post = await postModel.find().populate("user");
  res.send(post);
});

app.get("/user", async (req, res) => {
  let user = await userModel.find().populate("posts");
  res.send(user);
});

app.get("*", (req, res) => {
  console.log("you are entering wrong url");
});

app.listen(3000, (req, res) => {
  console.log("Sever is Running on so-smothly");
});
