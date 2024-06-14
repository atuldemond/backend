const express = require("express");
const app = express();
const path = require("path");

//routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/profile", profileRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is Running");
});
