const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const indexRouter = require("./routes/index");

const server = http.createServer(app);
const io = socketIo(server);

let waitingUsers = []; // Users waiting to be matched
let rooms = {}; // Room info for users

io.on("connection", function (socket) {
  socket.on("joinroom", function () {
    if (waitingUsers.length > 0) {
      let partner = waitingUsers.shift();
      const roomname = `${socket.id}-${partner.id}`;
      socket.join(roomname); // Corrected line
      partner.join(roomname);
      io.to(roomname).emit("joined", roomname);
    } else {
      waitingUsers.push(socket);
    }
  });

  socket.on("signalingMessage", function (data) {
    // Emit the signaling message to the specified room, excluding the sender
    socket.broadcast.to(data.room).emit("signalingMessage", data.room);
  });

  socket.on("startVideoCall", function ({ room }) {
    socket.broadcast.to(room).emit("incomingCall");
  });
  socket.on("rejectCall", function ({ room }) {
    socket.broadcast.to(room).emit("callRejected");
  });

  socket.on("acceptCall", function ({ room }) {
    socket.broadcast.to(room).emit("callAccepted");
  });
  socket.on("message", function (data) {
    socket.broadcast.to(data.room).emit("message", data.message);
  });
  socket.on("disconnect", function () {
    let index = waitingUsers.findIndex(
      (waitingUsers) => waitingUsers.id === socket.id
    );
    waitingUsers.splice(index, 1);
  });
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});