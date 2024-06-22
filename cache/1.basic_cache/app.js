const express = require("express");
const app = express();
const redis = require("redis");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./config/mongoose");

const userModel = require("./models/user-model");

const client = redis.createClient({
  password: "o2zTiBem5QXLcXTRJNQWKpoTMF3ZwM4N",
  socket: {
    host: "redis-13677.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 13677,
  },
});
client.on("connect", () => {
  console.log("Redis is connected");
});
client.connect();

app.get("/", (req, res) => {
  res.send("YOU ARE ON HOME PAGE");
});
app.post("/create", async (req, res) => {
  const { name, email, id } = req.body;
  const user = await userModel.create({
    name,
    email,
    id,
  });

  res.send(user);
});
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  let data = await client.get(`user:profile:${id}`); //IF DATA IS Available in redis then send it thorugh redis
  //   await client.del(`user:profile:${id}`); //for deleting data from edius
  if (data) {
    console.log("Sending data through cache");
    return res.send(JSON.parse(data));
  } else {
    console.log("Sending though database");

    const user = await userModel.findOne({ id: id });

    await client.setEx(
      //SET DATA WITH TIME IN CACHING ON REDIS
      `user:profile:${req.params.id}`,
      5,
      JSON.stringify(user)
    );

    // await client.set(`user:profile:${user.id}`, JSON.stringify(user));
    res.send(user);
  }
});

app.get("*", (req, res) => {
  res.send("nagada you are not doing good");
});

app.listen(3000, () => {
  console.log("Server is running successfully");
});
