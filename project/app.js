const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

//Routes ----
const indexRouter = require("./routes/index-router");
const universalRouter = require("./routes/universal-router");

//
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("*", universalRouter);

app.listen(process.env.PORT || 3000);
