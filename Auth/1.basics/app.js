const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is Home page");
});

app.post("/encrypt", async (req, res) => {
  let salt = await bcrypt.genSalt(10);
  let ecnrypt_value = await bcrypt.hash("Sumit$12345", salt);
  res.send(ecnrypt_value);
});
app.post("/checkpassword", async (req, res) => {
  let value = await bcrypt.compare(
    "Sumit$12345",
    "$2b$10$f4EUEbq3PE4yRhHRCAbRL.dsgvOkb0vAEj9AQJLM8N4sxgNAa4IRO"
  );
  res.send(value);
});
app.get("/createtoken", async function (req, res) {
  let token = jwt.sign(
    { name: "atuldemond", email: "atuldemond@gmail.com" },
    "123"
  );
  res.send(token);
});

app.get("/datafetch", async function (req, res) {
  let data = jwt.decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXR1bGRlbW9uZCIsImVtYWlsIjoiYXR1bGRlbW9uZEBnbWFpbC5jb20iLCJpYXQiOjE3MTgwOTI4NDl9.vun3SIMVpwbCKG7oLASMFITCYgpsbTt7xeaGhjvEqTE",
    "123"
  );
  res.send(data);
});









app.get("*", (req, res) => {
  res.send("Your Are On Wrong Page");
});
app.listen(3000, () => {
  console.log("server is running smoothly");
});
