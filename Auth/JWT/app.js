const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//env
require("dotenv").config();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database
const connectionDb = require("./config/mongoose");
connectionDb();
const userModel = require("./models/user-model");
const postsModel = require("./models/post-model");

//routes
const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

app.use("/auth", authRoutes);

app.get("*", (req, res) => {
  res.send("You are worng page");
});

app.listen(3000, () => {
  console.log("server is running ");
});
