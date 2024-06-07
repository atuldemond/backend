const express = require("express");
const app = express();

const mongooseConnection = require("./config/mongoose");
const userModel = require("./models/user-model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is Home Page");
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
  user.posts.push({ content: content });
  user.save();
  res.send(user.posts);
});

app.post("/:username/:post_id/delete", async (req, res) => {
  let username = req.params.username;
  let post_id = req.params.post_id;
  let user = await userModel.findOne({ username: username });
  user.posts = user.posts.filter((post) => post.id.toString() !== post_id);
  user.save();
  res.send(user.posts);
});

app.post("/:username/:post_id/update/content", async (req, res) => {
  // id is changing everytime when you update a post
  let username = req.params.username;
  let post_id = req.params.post_id;
  let post_content = req.body.content;
  console.log(post_content);
  let user = await userModel.findOne({ username: username });
  const postIndex = user.posts.findIndex(
    (post) => post._id.toString() === post_id
  );
  user.posts[postIndex] = { ...user.posts[postIndex], content: post_content };
  await user.save();
  res.send(user.posts);
});

app.get("*", (req, res) => {
  res.send("Url is not Found");
});

app.listen(3000, (req, res) => {
  console.log("Server is Running smoothly");
});
