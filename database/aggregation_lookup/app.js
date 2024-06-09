const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("./config/mongoose");
const userModel = require("./models/user-model");
const postModel = require("./models/post-model");

app.get("/", (req, res) => {
  res.send("Welcome to Home PAGE ");
});

app.post("/createuser", async (req, res) => {
  let { username, password, email } = req.body;
  let user = await userModel.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(user);
});

app.post("/:username/createpost", async (req, res) => {
  let username = req.params.username;
  let { content } = req.body;
  let user = await userModel.findOne({ username: username });
  let posts = await postModel.create({
    user: user._id,
    content: content,
  });
  user.posts.push(posts._id);
  await user.save();
  res.send(posts);
});

app.get("/postsuser", async (req, res) => {
  let post = await postModel.find().populate("users");
  res.send(post);
});
app.get("/userpost", async (req, res) => {
  let user = await userModel.find().populate("posts");
  res.send(user);
});

app.get("/userdatawithid", async (req, res) => {
  let user = await postModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userdata",
      },
    },
  ]);

  res.send(user);
});

app.get("/project", async (req, res) => {
  let user = await userModel.aggregate([
    {
      $project: {
        username: 1,
        email: 1,
      },
    },
  ]);
  res.send(user);
});

app.get("/unwind", async (req, res) => {
  let user = await userModel.aggregate([
    {
      $unwind: "$email",
    },
  ]);
  res.send(user);
});

app.get("/finding_posts_of_particular_user", async (req, res) => {
  let posts = await postModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "data",
      },
    },

    {
      $unwind: "$data",
    },
    {
      $match: {
        "data.username": "atuldemond",
      },
    },
  ]);
  res.send(posts);
});

app.get("/example2", async (req, res) => {
  let posts = await postModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "data",
      },
    },

    {
      $unwind: "$data",
    },
    {
      $project: {
        "data.username": 1,
        "data.email": 1,
      },
    },
  ]);
  res.send(posts);
});
app.get("*", (req, res) => {
  res.send("You are on Wrong Url");
});
app.listen(3000);
