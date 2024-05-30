const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("THis is HOME PAGE ");
  } else if (req.url === "/profile") {
    res.end(" this is Profile");
  } else {
    res.end("PAGE NOT FOUND");
  }
});

server.listen(port, () => {
  console.log("Server is listing on port ");
});
