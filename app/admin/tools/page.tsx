import Link from "next/link";
import { connectDB } from "@/lib/db/connect";
import Tool from "@/lib/models/Tool";

export const dynamic = "force-dynamic";

export default async function AdminToolsPage() {
  let tools: any[] = [];
  let dbError: string | null = null;
  try {
    await connectDB();
    tools = await Tool.find().sort({ updatedAt: -1 }).lean();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Could not connect to the database";
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
        <Link href="/admin/tools/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add tool
        </Link>
      </div>

      {dbError && (
        <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Database not connected ({dbError}). Set <code>MONGODB_URI</code> in <code>.env.local</code> to manage
          tools here. Until then, the site serves the static seed data in <code>data/tools.ts</code>.
        </div>
      )}

      {!dbError && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Indexable</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tools.map((t) => (
                <tr key={t.slug}>
                  <td className="px-4 py-2 font-medium text-gray-900">{t.toolName}</td>
                  <td className="px-4 py-2 text-gray-600">{t.category}</td>
                  <td className="px-4 py-2 text-gray-600">{t.status}</td>
                  <td className="px-4 py-2 text-gray-600">{t.indexable ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-right">
                    <Link href={`/admin/tools/${t.slug}/edit`} className="text-blue-700 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {tools.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No tools in the database yet. Add one, or migrate the seed data from{" "}
                    <code>data/tools.ts</code>.
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
