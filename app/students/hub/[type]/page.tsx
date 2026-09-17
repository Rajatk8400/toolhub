import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/connect";
import StudentInfo from "@/lib/models/StudentInfo";
import { StudentInfoType } from "@/types/student-info";

const LABELS: Record<StudentInfoType, { title: string; description: string }> = {
  exam: { title: "Exam Information", description: "Upcoming and ongoing exam details, verified against official sources." },
  scholarship: { title: "Scholarships", description: "Scholarship opportunities with eligibility and deadlines, verified against official sources." },
  admission: { title: "College Admissions", description: "Admission cycles and requirements, verified against official sources." },
  job: { title: "Government Jobs", description: "Government job openings for students and graduates, verified against official sources." },
};

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const label = LABELS[type as StudentInfoType];
  if (!label) return {};
  return { title: label.title, description: label.description, alternates: { canonical: `/students/hub/${type}` } };
}

export default async function StudentInfoHubPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const label = LABELS[type as StudentInfoType];
  if (!label) notFound();

  let items: any[] = [];
  try {
    await connectDB();
    items = await StudentInfo.find({ type, publishStatus: "published" }).sort({ applicationDeadline: 1 }).lean();
  } catch {
    // DB not configured — fall through to the empty state below, same as zero published items.
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <Link href="/students" className="hover:text-blue-600">Student Tools</Link> {" / "}
        <span className="text-gray-700">{label.title}</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900">{label.title}</h1>
      <p className="mt-3 max-w-2xl text-gray-700">{label.description}</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          Nothing published in this section yet. Check back soon, or see the{" "}
          <Link href="/students" className="text-blue-700 hover:underline">student calculators</Link> in the meantime.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div key={item.slug} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-gray-900">{item.title}</h2>
                <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{item.status}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{item.summary}</p>
              {item.eligibility && <p className="mt-2 text-sm text-gray-600"><span className="font-medium">Eligibility: </span>{item.eligibility}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                {item.applicationDeadline && <span>Deadline: {new Date(item.applicationDeadline).toLocaleDateString()}</span>}
                <span>Last verified: {new Date(item.lastVerified).toLocaleDateString()}</span>
                <a href={item.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Official source ↗</a>
                {item.applyUrl && <a href={item.applyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Apply ↗</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
