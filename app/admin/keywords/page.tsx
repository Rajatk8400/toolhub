import Link from "next/link";
import { connectDB } from "@/lib/db/connect";
import Keyword from "@/lib/models/Keyword";

export const dynamic = "force-dynamic";

export default async function AdminKeywordsPage() {
  let keywords: any[] = [];
  let dbError: string | null = null;
  try {
    await connectDB();
    keywords = await Keyword.find().sort({ cluster: 1, priority: -1 }).lean();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Could not connect to the database";
  }

  const byCluster = keywords.reduce<Record<string, any[]>>((acc, k) => {
    acc[k.cluster] = acc[k.cluster] || [];
    acc[k.cluster].push(k);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Keyword Clusters</h1>
        <Link href="/admin/keywords/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add keyword
        </Link>
      </div>

      {dbError && (
        <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Database not connected ({dbError}). Set <code>MONGODB_URI</code> in <code>.env.local</code> to manage
          keywords here.
        </div>
      )}

      {!dbError && Object.keys(byCluster).length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No keywords tracked yet. Add one to start building out a cluster.
        </div>
      )}

      {!dbError && Object.entries(byCluster).map(([cluster, items]) => (
        <div key={cluster} className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800">
            {cluster} <span className="font-normal text-gray-500">({items.length})</span>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="px-4 py-2">Keyword</th>
                <th className="px-4 py-2">Intent</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Target page</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((k) => (
                <tr key={k._id}>
                  <td className="px-4 py-2 font-medium text-gray-900">{k.keyword}</td>
                  <td className="px-4 py-2 text-gray-600">{k.searchIntent}</td>
                  <td className="px-4 py-2 text-gray-600">{k.priority}</td>
                  <td className="px-4 py-2 text-gray-600">{k.status}</td>
                  <td className="px-4 py-2 text-gray-600">{k.targetPage || "—"}</td>
                  <td className="px-4 py-2 text-right">
                    <Link href={`/admin/keywords/${k._id}/edit`} className="text-blue-700 hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
