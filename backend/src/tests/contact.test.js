const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const dotenv = require("dotenv");
const Contact = require("../models/Contact");

dotenv.config();

let adminToken = "";
let createdMessageId = "";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

  adminToken = loginRes.body.token;
});

afterAll(async () => {
  if (createdMessageId) {
    await Contact.findByIdAndDelete(createdMessageId);
  }

  await mongoose.connection.close();
});

describe("Contact API", () => {
  test("should reject empty contact form submission", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        fullName: "",
        email: "",
        message: "",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should create a contact message with valid data", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        fullName: "Dinith Wickramasinghe",
        email: "dinith.gsw@gmail.com",
        message: "I would like to know more about your services.",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBeDefined();

    createdMessageId = res.body.data._id;
  });

  test("should block access to GET /api/contact without token", async () => {
    const res = await request(app).get("/api/contact");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("should return all messages with valid admin token", async () => {
    const res = await request(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("should update message status to Replied", async () => {
    const res = await request(app)
      .patch(`/api/contact/${createdMessageId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "Replied" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("Replied");
  });

  test("should delete the created message", async () => {
    const res = await request(app)
      .delete(`/api/contact/${createdMessageId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    createdMessageId = "";
  });
});