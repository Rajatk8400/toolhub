import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/connect";
import Tool from "@/lib/models/Tool";
import ToolForm from "@/components/admin/ToolForm";

export default async function EditToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const tool = await Tool.findOne({ slug }).lean<any>();
  if (!tool) notFound();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Edit {tool.toolName}</h1>
      <ToolForm
        mode="edit"
        initial={{
          slug: tool.slug,
          category: tool.category,
          toolName: tool.toolName,
          primaryKeyword: tool.primaryKeyword,
          metaTitle: tool.metaTitle,
          metaDescription: tool.metaDescription,
          h1: tool.h1,
          intro: tool.intro,
          component: tool.component,
          indexable: tool.indexable,
          status: tool.status,
        }}
      />
    </div>
  );
}
