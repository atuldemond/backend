const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routes/index");

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", function (socket) {
  console.log("New user connected");
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

server.listen(3000, (req, res) => {
  console.log("We are working on 3000");
});
