import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ToolHub",
  description: "How ToolHub handles data: what we collect, what we don't, and how tools process your input.",
  alternates: { canonical: "/privacy-policy" },
  robots: "noindex, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: [DATE]</p>

      <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This is a starting template, not finished legal copy. Have a lawyer review and adapt it — in
        particular the data-collection details — to match exactly what this deployment actually does
        (analytics provider, ad network, any account/DB data) and the privacy laws that apply to your
        users (e.g. GDPR, CCPA) before publishing it as your real policy.
      </div>

      <div className="mt-6 space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">What this site does with your input</h2>
          <p className="mt-2">
            Most tools on this site run entirely in your browser. Text, numbers, and files you enter into a
            calculator, converter, or formatter are processed locally on your device and are never uploaded
            to our servers unless a tool's own description explicitly says otherwise (for example, tools
            that read/write a database, like the admin panel).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Information we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Analytics:</strong> if enabled, we use Google Analytics to understand which pages and
              tools are used, in aggregate. This may include your approximate location, device type, and
              browsing behavior on this site, subject to Google's own privacy practices.
            </li>
            <li>
              <strong>Contact form:</strong> if you submit the contact form, we store your name, email, and
              message to respond to you.
            </li>
            <li>
              <strong>Admin accounts:</strong> if you create an account (email/password or Google sign-in) to
              access the admin panel, we store your name, email, and (for password accounts) a securely
              hashed password — never the password itself.
            </li>
            <li>
              <strong>Advertising:</strong> if Google AdSense is enabled on this deployment, Google and its
              partners may use cookies to serve ads based on your visits to this and other sites.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
          <p className="mt-2">
            We use a session cookie to keep admin users signed in, and — if enabled — analytics and
            advertising cookies from Google. See our <a href="/cookie-policy" className="text-blue-700 hover:underline">Cookie Policy</a> for
            details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Data sharing</h2>
          <p className="mt-2">
            We don't sell your personal information. We share data only with the service providers
            necessary to run the site (e.g. our hosting provider, database provider, and — if enabled —
            Google Analytics/AdSense), each governed by their own privacy terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Your choices</h2>
          <p className="mt-2">
            You can use most tools on this site without providing any personal information at all. Where we
            do hold your data (a contact message, an admin account), contact us to request access, correction,
            or deletion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p className="mt-2">
            Questions about this policy? Reach out via our <a href="/contact" className="text-blue-700 hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
