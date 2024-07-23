const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const router = require("../routes/indexRouter");

const app = express();
app.use(express.json());
app.use("/api", router);

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/api-development", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("User API", () => {
  it("should create a user", async () => {
    const response = await request(app)
      .post("/api/create")
      .send({ name: "John Doe", age: 30 });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/api/data");

    const user = await userModel.findOne({ name: "John Doe" });
    expect(user).toBeTruthy();
    expect(user.name).toBe("John Doe");
    expect(user.age).toBe(30);
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/data");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("should update a user", async () => {
    const user = new userModel({ name: "Jane Doe", age: 25 });
    await user.save();

    const response = await request(app)
      .patch(`/api/update/${user._id}`)
      .send({ name: "Jane Smith" });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.name).toBe("Jane Smith");

    const updatedUser = await userModel.findById(user._id);
    expect(updatedUser.name).toBe("Jane Smith");
  });

  it("should delete a user", async () => {
    const user = new userModel({ name: "Jane Doe", age: 25 });
    await user.save();

    const response = await request(app).delete(`/api/delete/${user._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("User deleted");

    const deletedUser = await userModel.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
