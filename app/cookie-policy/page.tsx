import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - ToolHub",
  description: "Which cookies ToolHub sets, what they're for, and how to control them.",
  alternates: { canonical: "/cookie-policy" },
  robots: "noindex, follow",
};

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: [DATE]</p>

      <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This table reflects the cookies this codebase actually sets. If you enable or remove Google
        Analytics/AdSense (via the <code>NEXT_PUBLIC_GA_ID</code> / <code>NEXT_PUBLIC_ADSENSE_CLIENT</code> env
        vars), update this page to match, and have a lawyer confirm consent requirements for your users'
        jurisdictions.
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2">Cookie</th>
              <th className="px-4 py-2">Purpose</th>
              <th className="px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            <tr>
              <td className="px-4 py-2 font-mono text-xs">toolhub_session</td>
              <td className="px-4 py-2">Keeps admin/editor users signed in. Essential — required for the admin panel to function.</td>
              <td className="px-4 py-2">7 days</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs">toolhub_oauth_state</td>
              <td className="px-4 py-2">Short-lived CSRF protection during Google sign-in. Essential.</td>
              <td className="px-4 py-2">10 minutes</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs">_ga, _gid, etc.</td>
              <td className="px-4 py-2">Google Analytics — only set if analytics is enabled on this deployment. Tracks aggregate site usage.</td>
              <td className="px-4 py-2">Up to 2 years (Google's default)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs">Various (Google)</td>
              <td className="px-4 py-2">Google AdSense — only set if ads are enabled on this deployment. Used for ad delivery and measurement.</td>
              <td className="px-4 py-2">Varies by cookie (Google's policies)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          The essential cookies above are required for the site to function and aren't part of any
          optional consent choice. Analytics and advertising cookies only load if this deployment has
          Google Analytics or AdSense configured — see our{" "}
          <a href="/privacy-policy" className="text-blue-700 hover:underline">Privacy Policy</a> for how that data is used.
        </p>
        <p>
          You can block or delete cookies through your browser settings at any time. Blocking the session
          cookie will prevent you from staying signed in to the admin panel.
        </p>
      </div>
    </main>
  );
}
