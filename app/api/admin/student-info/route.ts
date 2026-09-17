import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import StudentInfo from "@/lib/models/StudentInfo";
import { requireEditor } from "@/lib/auth/guards";

export async function GET() {
  const { response } = await requireEditor();
  if (response) return response;

  await connectDB();
  const list = await StudentInfo.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ items: list });
}

export async function POST(req: NextRequest) {
  const { response } = await requireEditor();
  if (response) return response;

  const body = await req.json();
  if (!body.slug || !body.type || !body.title || !body.officialSourceUrl || !body.lastVerified) {
    return NextResponse.json(
      { error: "slug, type, title, officialSourceUrl, and lastVerified are required" },
      { status: 400 }
    );
  }

  await connectDB();
  const existing = await StudentInfo.findOne({ slug: body.slug });
  if (existing) {
    return NextResponse.json({ error: `An item with slug "${body.slug}" already exists` }, { status: 409 });
  }

  const created = await StudentInfo.create({ ...body, publishStatus: body.publishStatus || "draft" });
  return NextResponse.json({ item: created }, { status: 201 });
}
