const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.get("*/", (req, res) => {
  res.send("Page NOt Found");
});

app.listen(port);
