import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

function request(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("/api/contact", () => {
  it("rejects a submission missing required fields", async () => {
    const res = await POST(request({ name: "Alex" }, "1.1.1.1"));
    expect(res.status).toBe(400);
  });

  it("rejects an invalid email address", async () => {
    const res = await POST(request({ name: "Alex", email: "not-an-email", message: "Hi" }, "1.1.1.2"));
    expect(res.status).toBe(400);
  });

  it("accepts a valid submission", async () => {
    const res = await POST(request({ name: "Alex", email: "alex@example.com", message: "Hi" }, "1.1.1.3"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("rate-limits repeated submissions from the same IP", async () => {
    const ip = "1.1.1.4";
    const payload = { name: "Alex", email: "alex@example.com", message: "Hi" };
    for (let i = 0; i < 5; i++) {
      const res = await POST(request(payload, ip));
      expect(res.status).toBe(200);
    }
    const sixth = await POST(request(payload, ip));
    expect(sixth.status).toBe(429);
  });

  it("tracks rate limits independently per IP", async () => {
    const payload = { name: "Alex", email: "alex@example.com", message: "Hi" };
    const res = await POST(request(payload, "1.1.1.5"));
    expect(res.status).toBe(200);
  });
});
