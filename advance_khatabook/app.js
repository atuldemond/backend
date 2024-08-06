const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const ejs = require("ejs");

//data base configartion

const mongooseConnection = require("./config/mongoose");
const userModel = require("./models/userModel");

//configure public and ejs or urlencoded

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes for page
app.get("/", (req, res) => {
  res.render("index");
});
//login profile page ----

app.get("/newhisab/:username", async (req, res) => {
  let username = req.params.username;
  let user = await userModel.findOne({ username: username });
  // console.log(user.name);
  // console.log(username);
  res.render("newhisab", { user });
});
app.post("/add/:username", async (req, res) => {
  let username = req.params.username;
  let { textarea, title } = req.body;

  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();
  const date = `${day}-${month}-${year}`;
  const user = await userModel.findOne({ username: username });

  const users = await userModel.findOne({ username: username });
  if (users) {
    users.posts.push({ title: ` ${title}-${date}`, content: textarea });
    users.save();
    res.redirect(`/profile/${username}`, 200, { user });
  } else {
    res.status(404).send("User not found");
  }
});

app.get("/profile/:username", async (req, res) => {
  let username = req.params.username;
  let user = await userModel.findOne({ username: username });
  res.render("profile", { user });
});
// edit user post ----------
app.get("/edit/:username/:id/:content", async (req, res) => {
  let { username, id, content } = req.params;
  let user = await userModel.findOne({ username: username });

  const post_title = user.posts.id(id);
  // console.log(post_title.title);

  res.render("edit", { user, content, id, post_title });
});

app.post("/update/:username/:id", async (req, res) => {
  let { username, id } = req.params;
  let { textarea } = req.body;
  let user = await userModel.findOne({ username: username });

  const post = user.posts.id(id);
  post.content = textarea;

  await post.save({ suppressWarning: true });
  await user.save({ suppressWarning: true });

  res.redirect(`/profile/${username}`, 200, { user });
});
//deleting Posts ----------------------------
app.get("/delete/:username/:id", async (req, res) => {
  let { username, id } = req.params;

  try {
    const filter = { username: username };
    const update = { $pull: { posts: { _id: id } } };
    let user = await userModel.findOne({ username: username });
    const result = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    await user.save({ suppressWarning: true });
    if (!result) {
      return res.status(404).send("Post not found");
    }

    res.redirect(`/profile/${username}`, 200, { user });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Internal Server Error");
  }
});

//viewing users
app.get("/view/:username/:id/:content/:title", async (req, res) => {
  let { username, id, content, title } = req.params;

  let user = await userModel.findOne({ username: username });
  const post = user.posts.id(id);
  post.content = content;
  res.render("view", { content, user, username, post, id, title });
  // res.redirect(`/profile/${username}`, 200, { user });
});

//login and register Functionality
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/createuser", async (req, res) => {
  let { name, username, email, password } = req.body;
  let data = await userModel.create({
    name,
    username,
    email,
    password,
  });
  console.log(data);
  res.render("loginpage");
});
app.get("/loginpage", (req, res) => {
  res.render("loginpage");
});
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let user = await userModel.findOne({
    $and: [{ username: username }, { password: password }],
  });

  if (
    user &&
    user.username === username &&
    user &&
    user.password === password
  ) {
    res.render("profile", { user });
  } else {
    res.render("pagenotfound");
  }
});
//uviversal Route
app.all("*", (req, res) => {
  res.render("page not found");
});

//Server configuration
app.listen(port, (req, res) => {
  console.log("Sever is listing on port 3000");
});
