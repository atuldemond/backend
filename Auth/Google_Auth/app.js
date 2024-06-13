const express = require("express");
const app = express();
const db = require("./configs/mongoose");
const authRouter = require("./routes/auth");
const passport = require("passport");
const expressSession = require("express-session");

require("dotenv").config();
db();

require("./configs/googleStrategy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passpot
app.use(
  expressSession({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Weblcome to Home Page");
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.use("/auth", authRouter);
app.listen(3000);
