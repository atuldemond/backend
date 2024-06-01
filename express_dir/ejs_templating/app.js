const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/error", (req, res, next) => {
  try {
    res.send("hey");
  } catch (error) {
    next(error);
  }
});

app.get("/check ", (req, res) => {
  console.log(req.query.name);
  console.log(req.query.password);

  res.send("form Submited");
});

app.post("/check", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.password);

  res.send("form Submited");
});
app.patch("/check", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.password);

  res.send("form Submited");
});
app.put("/check", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.password);

  res.send("form Submited");
});
app.delete("/check", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.password);

  res.send("form Submited");
});

app.get("*", (req, res) => {
  res.send("Page NOt Found");
});
app.use((err, req, res, next) => {
  res.status(500).send("inetrnal server error" + err.message);
});

app.listen(port);
