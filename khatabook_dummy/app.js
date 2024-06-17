const express = require("express");
const app = express();
const path = require("path");

//routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const profileRoutes = require("./routes/profileRoutes");

//ejs configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//database//
const connectionDb = require("./configs/mongoose");
connectionDb();
const userModel = require("./models/user-model");
const postModel = require("./models/post-model");

//routes

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/profile", profileRoutes);

app.use("*", (req, res) => {
  res.render("pagenotfound");
});
//server is running
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is Running");
});
