import request from "supertest";
import app from "../app.js";

describe("Backend Health Check API", () => {
  it("should return status 200 and healthy status message", async () => {
    const res = await request(app).get("/api/health");

    // INTENTIONAL FAILURE FOR PRACTICAL DEMONSTRATION:
    // The route returns 200, but we test for 500 so GitHub Actions fails with a red cross (X)
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Backend API is healthy");
  });
});
