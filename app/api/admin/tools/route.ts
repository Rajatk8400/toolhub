import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Tool from "@/lib/models/Tool";
import { requireEditor } from "@/lib/auth/guards";

export async function GET() {
  const { response } = await requireEditor();
  if (response) return response;

  await connectDB();
  const list = await Tool.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ tools: list });
}

export async function POST(req: NextRequest) {
  const { response } = await requireEditor();
  if (response) return response;

  const body = await req.json();
  if (!body.slug || !body.toolName || !body.category || !body.component) {
    return NextResponse.json({ error: "slug, toolName, category, and component are required" }, { status: 400 });
  }

  await connectDB();
  const existing = await Tool.findOne({ slug: body.slug });
  if (existing) {
    return NextResponse.json({ error: `A tool with slug "${body.slug}" already exists` }, { status: 409 });
  }

  const created = await Tool.create({ ...body, status: body.status || "draft" });
  return NextResponse.json({ tool: created }, { status: 201 });
}
