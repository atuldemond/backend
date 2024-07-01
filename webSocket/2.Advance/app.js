const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.on("hello", () => {
    // io.emit("defg"); for mulltiple user
    // socket.emit("defg"); for single user
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000);
