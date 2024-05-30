const express = require("express");
const app = express();

port = 3000;

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

app.get("/about", (req, res) => {
  res.send("welcome to About Page");
});

app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND");
});

app.listen(port, (req, res) => {
  console.log("Sevrer is running good");
});
