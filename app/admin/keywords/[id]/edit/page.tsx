import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/connect";
import Keyword from "@/lib/models/Keyword";
import KeywordForm from "@/components/admin/KeywordForm";

export default async function EditKeywordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const keyword = await Keyword.findById(id).lean<any>();
  if (!keyword) notFound();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Edit keyword</h1>
      <KeywordForm
        mode="edit"
        id={id}
        initial={{
          keyword: keyword.keyword,
          cluster: keyword.cluster,
          primaryCategory: keyword.primaryCategory || "calculators",
          searchIntent: keyword.searchIntent,
          priority: keyword.priority,
          country: keyword.country,
          language: keyword.language,
          status: keyword.status,
          targetPage: keyword.targetPage || "",
          notes: keyword.notes || "",
          searchVolume: keyword.searchVolume ? String(keyword.searchVolume) : "",
          competition: keyword.competition || "",
          cpc: keyword.cpc ? String(keyword.cpc) : "",
        }}
      />
    </div>
  );
}
