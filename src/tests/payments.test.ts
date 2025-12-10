import request from "supertest";
import app from "../app";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-id"),
}));

describe("Payment API", () => {
  it("should create a payment", async () => {
    const res = await request(app).post("/api/payments").send({
      amount: 10,
      currency: "USD",
      description: "Test payment",
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("test-id");
    expect(res.body.amount).toBe(10);

    // Accept either "pending" or "processing" depending on async simulator
    expect(["pending", "processing"]).toContain(res.body.status);
  });

  it("should get a payment by id", async () => {
    const res = await request(app).get("/api/payments/test-id");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe("test-id");
    expect(res.body.amount).toBe(10);

    // Status can be "pending" or "processing"
    expect(["pending", "processing"]).toContain(res.body.status);
  });

  it("should update payment status", async () => {
    const res = await request(app)
      .patch("/api/payments/test-id")
      .send({ status: "succeeded" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "succeeded");
  });

  it("should return 404 for non-existent payment", async () => {
    const res = await request(app).get("/api/payments/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Payment not found");
  });
});
