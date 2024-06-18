const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//databasec
const db = require("./configs/mongoose");

const userModel = require("./models/user-Model");
//upload configration
const upload = require("./configs/multer-strogae");
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/multerupload", upload.single("image"), async (req, res) => {
  const { username, name } = req.body;

  let newbuffer = req.file.buffer;

  if (!req.file) return res.send("File NOT  Uploaded");

  if (req.file.size > 1 * 1024 * 1024) {
    newbuffer = await sharp(req.file.buffer).resize({ width: 1920 }).toBuffer();

    console.log(`purana size ${req.file.size}`);
    console.log(`new size${Buffer.byteLength(newbuffer)}`);

    let user = await userModel.create({
      name,
      username,
      image: newbuffer,
    });
  }

  res.send("file uploaded sucessfully");
});

app.get("/show", async (req, res) => {
  let users = await userModel.find();
  res.render("show", { users });
});
app.get("*", (req, res) => {
  res.send("You are on Wrong Page ---------------------");
});
app.listen(3000, () => {
  console.log("Server IS RUNNING");
});
