const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Environment variables
require("dotenv").config();

// Database connection function
const connectionDb = require("./config/mongoose");

try {
  // Middlewares
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Database connection
  connectionDb();
  const userModel = require("./models/user-model");
  const postsModel = require("./models/post-model");

  // Routes
  const authRoutes = require("./routes/authRoutes");

  app.get("/", (req, res) => {
    res.send("This is Home Page");
  });

  app.use("/auth", authRoutes);

  // Catch-all route for undefined routes
  app.get("*", (req, res) => {
    res.send("You are on the wrong page");
  });

  // Start the server
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} catch (error) {
  console.error("An error occurred during server setup:", error.message);
  // Optionally, handle the error further or exit the process
  process.exit(1); // Exit the process if a critical error occurs
}
