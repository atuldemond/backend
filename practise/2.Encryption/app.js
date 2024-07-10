const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");

const db = require("./configs/mongoose");
const userModel = require("./models/useModel");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/register", async (req, res) => {
  const { name, age, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    age,
    email,
    password: hashedPassword,
  });
  res.send("Registration successful");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send("Login failed: User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      res.send("Login failed: Incorrect password");
    }
  } catch (error) {
    res.status(500).send("An error occurred during login");
  }
});

app.use((req, res) => {
  res.status(404).send("You are on the wrong path");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
