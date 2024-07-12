const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = require("./configs/mongoose");
const userModel = require("./models/useModel");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).send("An error occurred while rendering the page");
  }
});

//create register router with bcrypt
app.post("/register", async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      age,
      email,
      password: hashedPassword,
    });
    res.send("Registration successful");
  } catch (error) {
    res.status(500).send("An error occurred during registration");
  }
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
      const token = jwt.sign({ userId: user._id }, "secret", {
        expiresIn: "60s",
      });
      res.cookie("token", token, { maxAge: 600000, httpOnly: true });
      res.send("Login successful");
    } else {
      res.send("Login failed: Incorrect password");
    }
  } catch (error) {
    res.status(500).send("An error occurred during login");
  }
});

//send page with jwt token and checking with data save inside cookie user_id
app.post("/seepage", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, "secret");
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send("An error occurred while verifying the token");
  }
});

app.use((req, res) => {
  try {
    res.status(404).send("You are on the wrong path");
  } catch (error) {
    res.status(500).send("An error occurred while handling the request");
  }
});

try {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} catch (error) {
  console.error("An error occurred while starting the server:", error);
}
