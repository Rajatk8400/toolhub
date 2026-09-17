import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/connect";
import StudentInfo from "@/lib/models/StudentInfo";
import StudentInfoForm from "@/components/admin/StudentInfoForm";

export default async function EditStudentInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const item = await StudentInfo.findOne({ slug }).lean<any>();
  if (!item) notFound();

  const toDateInput = (d: any) => (d ? new Date(d).toISOString().slice(0, 10) : "");

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Edit {item.title}</h1>
      <StudentInfoForm
        mode="edit"
        initial={{
          slug: item.slug,
          type: item.type,
          title: item.title,
          summary: item.summary,
          eligibility: item.eligibility || "",
          applicationDeadline: toDateInput(item.applicationDeadline),
          applyUrl: item.applyUrl || "",
          officialSourceUrl: item.officialSourceUrl,
          status: item.status,
          lastVerified: toDateInput(item.lastVerified),
          state: item.state || "",
          educationLevel: item.educationLevel || "",
          publishStatus: item.publishStatus,
        }}
      />
    </div>
  );
}
