// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockGetAiCompletion = vi.fn();
vi.mock("@/lib/ai/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/client")>("@/lib/ai/client");
  return {
    ...actual,
    getAiCompletion: (...args: unknown[]) => mockGetAiCompletion(...args),
  };
});

const { POST } = await import("@/app/api/ai/generate/route");
const { AiNotConfiguredError } = await import("@/lib/ai/client");

function request(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/ai/generate", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("/api/ai/generate", () => {
  beforeEach(() => {
    mockGetAiCompletion.mockReset();
  });

  it("rejects an unknown tool key", async () => {
    const res = await POST(request({ tool: "not-a-real-tool", input: "hello" }, "3.3.3.1"));
    expect(res.status).toBe(400);
  });

  it("rejects empty input", async () => {
    const res = await POST(request({ tool: "summarizer", input: "  " }, "3.3.3.2"));
    expect(res.status).toBe(400);
  });

  it("rejects input over the length limit", async () => {
    const res = await POST(request({ tool: "summarizer", input: "x".repeat(8001) }, "3.3.3.3"));
    expect(res.status).toBe(400);
  });

  it("returns a clean 503 with notConfigured when no AI key is set", async () => {
    mockGetAiCompletion.mockRejectedValue(new AiNotConfiguredError());
    const res = await POST(request({ tool: "summarizer", input: "hello world" }, "3.3.3.4"));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.notConfigured).toBe(true);
  });

  it("returns the AI output on success", async () => {
    mockGetAiCompletion.mockResolvedValue("A concise summary.");
    const res = await POST(request({ tool: "summarizer", input: "hello world" }, "3.3.3.5"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.output).toBe("A concise summary.");
  });

  it("returns 502 (not a raw crash) when the provider call throws an unexpected error", async () => {
    mockGetAiCompletion.mockRejectedValue(new Error("upstream 500"));
    const res = await POST(request({ tool: "summarizer", input: "hello world" }, "3.3.3.6"));
    expect(res.status).toBe(502);
  });

  it("rate-limits repeated requests from the same IP", async () => {
    mockGetAiCompletion.mockResolvedValue("ok");
    const ip = "3.3.3.7";
    for (let i = 0; i < 15; i++) {
      const res = await POST(request({ tool: "summarizer", input: "hello" }, ip));
      expect(res.status).toBe(200);
    }
    const sixteenth = await POST(request({ tool: "summarizer", input: "hello" }, ip));
    expect(sixteenth.status).toBe(429);
  });
});
