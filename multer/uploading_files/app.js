const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//databasec
const db = require("./config/mongoose");
const userModel = require("./models/user-Model");
//upload configration
const upload = require("./config/multer-strogae");
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/multerupload", upload.single("image"), async (req, res) => {
  const { username, name } = req.body;
  console.log(req.file);
  let user = await userModel.create({
    username,
    name,
    image: req.file.filename,
  });
  res.send(user);
});
app.get("*", (req, res) => {
  res.send("You are on Wrong Page ---------------------");
});
app.listen(3000, () => {
  console.log("Server IS RUNNING");
});
