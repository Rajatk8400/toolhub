// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/db/connect", () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

const mockFindOne = vi.fn();
vi.mock("@/lib/models/User", () => ({
  default: {
    findOne: (...args: unknown[]) => mockFindOne(...args),
  },
}));

vi.mock("@/lib/auth/password", () => ({
  verifyPassword: vi.fn(async (plain: string, hash: string) => plain === "correct-password" && hash === "hashed"),
}));

const { POST } = await import("@/app/api/auth/login/route");

function request(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("/api/auth/login", () => {
  beforeEach(() => {
    mockFindOne.mockReset();
  });

  it("rejects a request missing email or password", async () => {
    const res = await POST(request({ email: "a@b.com" }, "2.2.2.1"));
    expect(res.status).toBe(400);
  });

  it("returns a generic error for an unknown email (doesn't reveal which case failed)", async () => {
    mockFindOne.mockResolvedValue(null);
    const res = await POST(request({ email: "nobody@example.com", password: "x" }, "2.2.2.2"));
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Invalid email or password");
  });

  it("returns the same generic error for a Google-only account (no passwordHash)", async () => {
    mockFindOne.mockResolvedValue({ email: "google@example.com", passwordHash: undefined, role: "user" });
    const res = await POST(request({ email: "google@example.com", password: "x" }, "2.2.2.3"));
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Invalid email or password");
  });

  it("returns 401 for a wrong password", async () => {
    mockFindOne.mockResolvedValue({ email: "a@b.com", passwordHash: "hashed", role: "user" });
    const res = await POST(request({ email: "a@b.com", password: "wrong-password" }, "2.2.2.4"));
    expect(res.status).toBe(401);
  });

  it("sets a session cookie on successful login", async () => {
    process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test-secret-value-for-jwt-signing";
    mockFindOne.mockResolvedValue({
      _id: "abc123",
      email: "a@b.com",
      name: "A",
      passwordHash: "hashed",
      role: "admin",
    });
    const res = await POST(request({ email: "a@b.com", password: "correct-password" }, "2.2.2.5"));
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toContain("toolhub_session=");
  });

  it("rate-limits repeated failed attempts for the same IP+email", async () => {
    mockFindOne.mockResolvedValue(null);
    const ip = "2.2.2.6";
    const payload = { email: "brute-forced@example.com", password: "guess" };
    for (let i = 0; i < 5; i++) {
      const res = await POST(request(payload, ip));
      expect(res.status).toBe(401);
    }
    const sixth = await POST(request(payload, ip));
    expect(sixth.status).toBe(429);
  });
});
