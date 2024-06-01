const express = require("express");
const app = express();
const port = 3000;

//get form value
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting view engine

app.set("view engine", "ejs");

//Data
let data = [1, 2, 3, 4];

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/data", (req, res) => {
  res.send(data);
});

app.post("/data/:id", (req, res) => {
  data.push(parseInt(req.params.id));
  res.send(data);
});

//universal ports :--------------
app.get("*", (req, res) => {
  res.send("Page Not Found");
});

app.listen(port, () => {
  console.log("server is starting");
});
