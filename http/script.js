const http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {
  res.write("welcome to my website ,, Create By Atul Demond");
  res.end();
});

server.listen(port, () => {
  console.log("server is running");
});
