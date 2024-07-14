const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/api/data", (req, res) => {
  res.json([
    { name: "John", age: 20 },
    { name: "Jane", age: 21 },
  ]);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
