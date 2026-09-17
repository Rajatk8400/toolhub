import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Keyword from "@/lib/models/Keyword";
import { requireEditor } from "@/lib/auth/guards";

export async function GET() {
  const { response } = await requireEditor();
  if (response) return response;

  await connectDB();
  const list = await Keyword.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ keywords: list });
}

export async function POST(req: NextRequest) {
  const { response } = await requireEditor();
  if (response) return response;

  const body = await req.json();
  if (!body.keyword?.trim() || !body.cluster?.trim()) {
    return NextResponse.json({ error: "keyword and cluster are required" }, { status: 400 });
  }

  await connectDB();
  const created = await Keyword.create(body);
  return NextResponse.json({ keyword: created }, { status: 201 });
}
