import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import StudentInfo from "@/lib/models/StudentInfo";
import { requireEditor, requireAdmin } from "@/lib/auth/guards";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireEditor();
  if (response) return response;

  const { slug } = await params;
  await connectDB();
  const item = await StudentInfo.findOne({ slug }).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireEditor();
  if (response) return response;

  const { slug } = await params;
  const body = await req.json();
  await connectDB();
  const updated = await StudentInfo.findOneAndUpdate({ slug }, body, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { slug } = await params;
  await connectDB();
  const deleted = await StudentInfo.findOneAndDelete({ slug });
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
