import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// In-memory fake "Tool" collection standing in for MongoDB, so these tests exercise the real
// route handlers (auth guards, validation, status codes) without needing a live database —
// not reachable from this sandboxed build/test environment.
let fakeDocs: any[] = [];

vi.mock("@/lib/db/connect", () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/models/Tool", () => ({
  default: {
    find: () => ({
      sort: () => ({
        lean: async () => fakeDocs,
      }),
    }),
    findOne: async (query: { slug: string }) => fakeDocs.find((d) => d.slug === query.slug) || null,
    create: async (doc: any) => {
      const created = { ...doc, _id: String(fakeDocs.length + 1) };
      fakeDocs.push(created);
      return created;
    },
    findOneAndDelete: async (query: { slug: string }) => {
      const idx = fakeDocs.findIndex((d) => d.slug === query.slug);
      if (idx === -1) return null;
      return fakeDocs.splice(idx, 1)[0];
    },
  },
}));

const mockGetCurrentUser = vi.fn();
vi.mock("@/lib/auth/current-user", () => ({
  getCurrentUser: () => mockGetCurrentUser(),
}));

// Imported after the mocks above so the routes pick up the mocked modules.
const { GET, POST } = await import("@/app/api/admin/tools/route");
const { DELETE } = await import("@/app/api/admin/tools/[slug]/route");

function jsonRequest(body?: unknown) {
  return new NextRequest("http://localhost/api/admin/tools", {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("/api/admin/tools", () => {
  beforeEach(() => {
    fakeDocs = [];
    mockGetCurrentUser.mockReset();
  });

  it("GET rejects an unauthenticated request with 401", async () => {
    mockGetCurrentUser.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("GET rejects a signed-in 'user' role (not admin/editor) with 401", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "user", email: "a@b.com", name: "A", userId: "1" });
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("GET returns the list for an editor", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "editor", email: "e@b.com", name: "E", userId: "1" });
    fakeDocs.push({ slug: "test-tool", toolName: "Test Tool" });
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.tools).toHaveLength(1);
  });

  it("POST rejects missing required fields with 400", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "admin", email: "a@b.com", name: "A", userId: "1" });
    const res = await POST(jsonRequest({ slug: "x" }));
    expect(res.status).toBe(400);
  });

  it("POST creates a tool for an editor and defaults to draft status", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "editor", email: "e@b.com", name: "E", userId: "1" });
    const res = await POST(
      jsonRequest({ slug: "new-tool", toolName: "New Tool", category: "calculators", component: "NewTool" })
    );
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.tool.status).toBe("draft");
  });

  it("POST rejects a duplicate slug with 409", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "editor", email: "e@b.com", name: "E", userId: "1" });
    fakeDocs.push({ slug: "dup", toolName: "Dup" });
    const res = await POST(
      jsonRequest({ slug: "dup", toolName: "Dup 2", category: "calculators", component: "Dup" })
    );
    expect(res.status).toBe(409);
  });

  it("DELETE requires admin role, not just editor", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "editor", email: "e@b.com", name: "E", userId: "1" });
    fakeDocs.push({ slug: "to-delete", toolName: "To Delete" });
    const res = await DELETE(jsonRequest(), { params: Promise.resolve({ slug: "to-delete" }) });
    expect(res.status).toBe(403);
    expect(fakeDocs).toHaveLength(1); // not actually deleted
  });

  it("DELETE succeeds for an admin", async () => {
    mockGetCurrentUser.mockResolvedValue({ role: "admin", email: "a@b.com", name: "A", userId: "1" });
    fakeDocs.push({ slug: "to-delete", toolName: "To Delete" });
    const res = await DELETE(jsonRequest(), { params: Promise.resolve({ slug: "to-delete" }) });
    expect(res.status).toBe(200);
    expect(fakeDocs).toHaveLength(0);
  });
});
