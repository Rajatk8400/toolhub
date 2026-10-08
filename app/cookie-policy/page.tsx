import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - ToolArena",
  description: "Which cookies ToolArena sets, what they're for, and how to control them.",
  alternates: { canonical: "/cookie-policy" },
  robots: "noindex, follow",
};

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Cookie Policy</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <p>
          This policy explains how ToolArena uses cookies and browser storage technologies when you visit our website.
        </p>

        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="px-5 py-3">Storage Item</th>
                <th className="px-5 py-3">Purpose</th>
                <th className="px-5 py-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-blue-600 font-semibold">
                  toolarena_session
                </td>
                <td className="px-5 py-3 text-xs leading-relaxed">
                  Maintains authenticated sessions for administrators. Essential for admin panel access.
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">7 days</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-blue-600 font-semibold">
                  toolarena_oauth_state
                </td>
                <td className="px-5 py-3 text-xs leading-relaxed">
                  Short-lived CSRF verification cookie during secure Google sign-in.
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">10 minutes</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-gray-700 font-semibold">
                  toolarena_favorites
                </td>
                <td className="px-5 py-3 text-xs leading-relaxed">
                  Stores your pinned favorite tools locally in browser localStorage for quick access.
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">Persistent (local)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-gray-700 font-semibold">
                  toolarena_recent_tools
                </td>
                <td className="px-5 py-3 text-xs leading-relaxed">
                  Stores your recently accessed tools locally in browser localStorage.
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">Persistent (local)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-gray-600">_ga, _gid</td>
                <td className="px-5 py-3 text-xs leading-relaxed">
                  Google Analytics — only active if analytics is configured. Measures site usage in aggregate.
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">Up to 2 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Controlling Cookies</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            You can clear cookies or local storage at any time through your browser settings or directly via the &quot;Clear History&quot; button in our Recently Used Tools section. Disabling cookies will not affect your ability to run public calculators and utilities.
          </p>
        </section>
      </div>
    </main>
  );
}
