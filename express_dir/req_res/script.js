const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3000;
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcom to Home page");
});

app.get("/author/:username", (req, res) => {
  res.send(`Your username is ${req.params.username}`);
});
app.get("/profile/:id/:password", (req, res) => {
  res.send(` Your id ${req.params.id} and password ${req.params.password}`);
});

app.listen(port);
