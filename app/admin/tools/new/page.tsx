import ToolForm from "@/components/admin/ToolForm";

export default function NewToolPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Add tool</h1>
      <ToolForm mode="create" />
    </div>
  );
}
