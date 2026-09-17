import Link from "next/link";
import { connectDB } from "@/lib/db/connect";
import StudentInfo from "@/lib/models/StudentInfo";

export const dynamic = "force-dynamic";

export default async function AdminStudentInfoPage() {
  let items: any[] = [];
  let dbError: string | null = null;
  try {
    await connectDB();
    items = await StudentInfo.find().sort({ updatedAt: -1 }).lean();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Could not connect to the database";
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Info Hub</h1>
        <Link href="/admin/student-info/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add item
        </Link>
      </div>

      {dbError && (
        <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Database not connected ({dbError}). Set <code>MONGODB_URI</code> in <code>.env.local</code> to manage this
          content.
        </div>
      )}

      {!dbError && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Last verified</th>
                <th className="px-4 py-2">Published</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.slug}>
                  <td className="px-4 py-2 font-medium text-gray-900">{item.title}</td>
                  <td className="px-4 py-2 text-gray-600">{item.type}</td>
                  <td className="px-4 py-2 text-gray-600">{item.status}</td>
                  <td className="px-4 py-2 text-gray-600">{item.lastVerified ? new Date(item.lastVerified).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-2 text-gray-600">{item.publishStatus === "published" ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-right">
                    <Link href={`/admin/student-info/${item.slug}/edit`} className="text-blue-700 hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No items yet. Add exams, scholarships, admissions, or job postings — each requires a verified
                    official source before it can be published.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
