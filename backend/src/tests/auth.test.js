const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");

dotenv.config();

describe("Admin Authentication API", () => {
  test("should fail when email and password are missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Email and password are required.");
  });

  test("should fail with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@artecx.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid admin credentials.");
  });

  test("should login successfully with valid admin credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });
});