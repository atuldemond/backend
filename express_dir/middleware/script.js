const expresss = require("express");
const app = expresss();
const expressSession = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const port = 3000;

//using morgan
app.use(morgan("dev"));

//defining session on ---
app.use(
  expressSession({
    secret: "Atul Demond",
    resave: false,
    saveUninitialized: false,
  })
);
//using flash---
app.use(flash());

// using cors---
app.use(cors()); //UNIVERSAL

//middleware creation ---------
app.use((req, res, next) => {
  console.log("Middle Ware is Running good");
  next();
});
//sesion creation ----------
app.get("/create", (req, res) => {
  req.session.atul = true;
  res.send("Session Created");
});

//flash routes ---------
app.get("/login", (req, res, next) => {
  req.flash("error", "your passwor is not authorized");
  res.redirect("/error");
});

//using cookie parse:--
app.use(cookieParser());

//saving cookies data to browsers
app.get("/banned", (req, res, next) => {
  res.cookie("banned", true);
  res.cookie("name", "harsh");
  res.send("Cookies data is saved and your banned now");
});

app.get("/checking", (req, res, next) => {
  console.log(req.cookies.banned);
  console.log(req.cookies.name);
  res.send("checking");
});

app.get("/error", (req, res, next) => {
  let message = req.flash("error");
  res.send(message);
});

//defined routes -------
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
app.get("/home", (req, res) => {
  res.send("Welcome to Home Page");
});
// universal routes-------
app.get("*", (req, res) => {
  res.send("Page not found");
});

//server is started ---

app.listen(port, (req, res) => {
  console.log("Server is Stared");
});
