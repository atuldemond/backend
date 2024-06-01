const express = require("express");
const app = express();

let port = 3000;

app.use((req, res) => {
  console.log("WE got a  request ");
});

app.listen(port, () => {
  console.log("Server Is Stated");
});
