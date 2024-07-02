const express = require("express");
const app = express();
const http = require("http");
const { disconnect } = require("process");
const socket = require("socket.io");

const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  try {
    socket.on("disconnect", () => {
      console.log("socket is closed");
    });
  } catch (error) {
    console.error("Error handling socket connection:", error);
  }
});

app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Error rendering index page:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("*", (req, res) => {
  try {
    res.status(404).render("404");
  } catch (error) {
    console.error("Error rendering 404 page:", error);
    res.status(500).send("Internal Server Error");
  }
});
try {
  server.listen(3000);
} catch (error) {
  console.error("Error starting server:", error);
}
