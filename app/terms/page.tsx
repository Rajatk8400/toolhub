import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - ToolHub",
  description: "The terms governing use of ToolHub's free online tools and content.",
  alternates: { canonical: "/terms" },
  robots: "noindex, follow",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: [DATE]</p>

      <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This is a starting template, not finished legal copy. Have a lawyer review it — including
        jurisdiction, liability limits, and any regulatory requirements that apply to your users — before
        publishing it as your real terms.
      </div>

      <div className="mt-6 space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Acceptance of terms</h2>
          <p className="mt-2">
            By using this site, you agree to these terms. If you don't agree, please don't use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Use of the tools</h2>
          <p className="mt-2">
            Tools on this site are provided free of charge for personal and professional use. You agree not
            to use automated systems to scrape, overload, or abuse the site's infrastructure beyond normal
            browsing and tool use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">No warranty on results</h2>
          <p className="mt-2">
            Calculators, converters, and other tools are provided "as is." While we aim for accuracy, we
            don't guarantee that any result is error-free or fit for a particular purpose — see our{" "}
            <a href="/disclaimer" className="text-blue-700 hover:underline">Disclaimer</a> for specifics, especially
            around financial, health, and legal calculations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Intellectual property</h2>
          <p className="mt-2">
            The site's design, original written content, and code are owned by ToolHub or its licensors.
            You may use the tools themselves freely, but may not copy or republish the site's content or
            code without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Accounts</h2>
          <p className="mt-2">
            If you're granted an admin or editor account, you're responsible for keeping your credentials
            confidential and for activity under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Limitation of liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, ToolHub isn't liable for any damages arising from your
            use of, or inability to use, this site or its tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Changes to these terms</h2>
          <p className="mt-2">
            We may update these terms from time to time. Continued use of the site after changes means you
            accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p className="mt-2">
            Questions about these terms? Reach out via our <a href="/contact" className="text-blue-700 hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
