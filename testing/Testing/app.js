const express = require("express");
const app = express();
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const dataRouter = require("./routes/dataRouter");
const db = require("./configs/mongoose");
const userModel = require("./models/userModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api", indexRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
