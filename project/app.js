const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.send("Tum galat jagah apr hoo");
});

app.listen(port, (req, res) => {
  console.log("Listing on port " + port);
});
