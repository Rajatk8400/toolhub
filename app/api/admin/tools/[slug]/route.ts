import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Tool from "@/lib/models/Tool";
import { requireEditor, requireAdmin } from "@/lib/auth/guards";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireEditor();
  if (response) return response;

  const { slug } = await params;
  await connectDB();
  const tool = await Tool.findOne({ slug }).lean();
  if (!tool) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ tool });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireEditor();
  if (response) return response;

  const { slug } = await params;
  const body = await req.json();
  await connectDB();
  const updated = await Tool.findOneAndUpdate(
    { slug },
    { ...body, lastUpdated: new Date() },
    { new: true }
  );
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ tool: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  // Deleting published content is admin-only, not editor.
  const { response } = await requireAdmin();
  if (response) return response;

  const { slug } = await params;
  await connectDB();
  const deleted = await Tool.findOneAndDelete({ slug });
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
