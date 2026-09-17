import KeywordForm from "@/components/admin/KeywordForm";

export default function NewKeywordPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Add keyword</h1>
      <KeywordForm mode="create" />
    </div>
  );
}
