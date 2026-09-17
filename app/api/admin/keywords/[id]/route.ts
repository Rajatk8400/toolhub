import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Keyword from "@/lib/models/Keyword";
import { requireEditor, requireAdmin } from "@/lib/auth/guards";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireEditor();
  if (response) return response;

  const { id } = await params;
  await connectDB();
  const keyword = await Keyword.findById(id).lean();
  if (!keyword) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ keyword });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireEditor();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  await connectDB();
  const updated = await Keyword.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ keyword: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await connectDB();
  const deleted = await Keyword.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
