const express = require("express");
const app = express();
const mongooseConnection = require("./config/mongoose");
const userModel = require("./models/user");
const port = 3000;

const dummyData = [
  {
    username: "john_doe",
    name: "John Doe",
    password: "password123",
    age: "28",
    ISMarried: false,
    email: "john_doe@example.com",
  },
  {
    username: "jane_smith",
    name: "Jane Smith",
    password: "securepass456",
    age: "34",
    ISMarried: true,
    email: "jane_smith@example.com",
  },
  {
    username: "alice_wonder",
    name: "Alice Wonder",
    password: "wonderland789",
    age: "25",
    ISMarried: false,
    email: "alice_wonder@example.com",
  },
  {
    username: "bob_builder",
    name: "Bob Builder",
    password: "buildit111",
    age: "40",
    ISMarried: true,
    email: "bob_builder@example.com",
  },
  {
    username: "charlie_brown",
    name: "Charlie Brown",
    password: "charliepw222",
    age: "30",
    ISMarried: false,
    email: "charlie_brown@example.com",
  },
  {
    username: "daisy_duke",
    name: "Daisy Duke",
    password: "dukeofearl333",
    age: "29",
    ISMarried: true,
    email: "daisy_duke@example.com",
  },
  {
    username: "edward_scissorhands",
    name: "Edward Scissorhands",
    password: "scissors444",
    age: "35",
    ISMarried: false,
    email: "edward_scissorhands@example.com",
  },
  {
    username: "frank_castle",
    name: "Frank Castle",
    password: "punisher555",
    age: "38",
    ISMarried: true,
    email: "frank_castle@example.com",
  },
  {
    username: "grace_hopper",
    name: "Grace Hopper",
    password: "computing666",
    age: "32",
    ISMarried: false,
    email: "grace_hopper@example.com",
  },
  {
    username: "harry_potter",
    name: "Harry Potter",
    password: "hogwarts777",
    age: "27",
    ISMarried: true,
    email: "harry_potter@example.com",
  },
  {
    username: "irene_adler",
    name: "Irene Adler",
    password: "sherlock888",
    age: "33",
    ISMarried: false,
    email: "irene_adler@example.com",
  },
  {
    username: "jack_sparrow",
    name: "Jack Sparrow",
    password: "pirates999",
    age: "36",
    ISMarried: false,
    email: "jack_sparrow@example.com",
  },
  {
    username: "katniss_everdeen",
    name: "Katniss Everdeen",
    password: "archer000",
    age: "26",
    ISMarried: false,
    email: "katniss_everdeen@example.com",
  },
  {
    username: "luke_skywalker",
    name: "Luke Skywalker",
    password: "jedihero111",
    age: "31",
    ISMarried: true,
    email: "luke_skywalker@example.com",
  },
  {
    username: "michael_scott",
    name: "Michael Scott",
    password: "bossman222",
    age: "45",
    ISMarried: true,
    email: "michael_scott@example.com",
  },
];

app.get("/", (req, res) => {
  res.send("Working ");
});

app.get("/users", async (req, res) => {
  letdata = await userModel.find({ age: { $eq: 30 } });
  res.send(letdata);
});
app.get("/userne", async (req, res) => {
  letdata = await userModel.find({ age: { $ne: 30 } });
  res.send(letdata);
});

app.get("/userlt", async (req, res) => {
  letdata = await userModel.find({ age: { $lt: 35 } });
  res.send(letdata);
});

app.get("/userlte", async (req, res) => {
  letdata = await userModel.find({ age: { $lte: 35 } });
  res.send(letdata);
});

app.get("/usergt", async (req, res) => {
  letdata = await userModel.find({ age: { $gt: 35 } });
  res.send(letdata);
});

app.get("/usergte", async (req, res) => {
  letdata = await userModel.find({ age: { $gte: 35 } });
  res.send(letdata);
});
app.get("/userin", async (req, res) => {
  letdata = await userModel.find({ age: { $in: [20, 30, 35] } });
  res.send(letdata);
});

app.get("/userin", async (req, res) => {
  letdata = await userModel.find({ age: { $nin: [20, 30, 35] } });
  res.send(letdata);
});

app.get("/userexists", async (req, res) => {
  letdata = await userModel.find({ age: { $exists: ture } });
  res.send(letdata);
});

app.get("/userand", async (req, res) => {
  letdata = await userModel.find({
    $and: [{ ISMarried: true }, { age: { $gt: 30 } }],
  });
  res.send(letdata);
});

app.get("/useror", async (req, res) => {
  letdata = await userModel.find({
    $or: [{ ISMarried: true }, { age: { $gt: 30 } }],
  });
  res.send(letdata);
});

app.get("/userregex", async (req, res) => {
  letdata = await userModel.find({ name: { $regex: /^.*h$/i } });
  res.send(letdata);
});

app.get("/createmany", async (req, res) => {
  let data = await userModel.insertMany(dummyData);
  res.send(data);
});

app.listen(port, (re1, res) => {
  console.log("Server is listening on port " + port);
});
