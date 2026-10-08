import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - ToolArena",
  description: "The terms governing use of ToolArena's free online tools and content.",
  alternates: { canonical: "/terms" },
  robots: "noindex, follow",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Terms &amp; Conditions</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Acceptance of terms</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            By visiting or utilizing ToolArena, you agree to these terms and conditions. If you do not accept these terms, you should discontinue using the platform.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Use of ToolArena utilities</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            All online calculators, converters, and developer tools are offered free of charge for personal, academic, and business purposes. You agree not to abuse or overwhelm the platform via malicious automated requests or denial-of-service attempts.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">No warranty on calculation results</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            ToolArena provides tools and informational data on an &quot;as is&quot; basis. While calculations follow recognized industry algorithms, ToolArena provides no guarantee that outputs are error-free. Please see our{" "}
            <Link href="/disclaimer" className="text-blue-600 font-semibold hover:underline">
              Disclaimer
            </Link>{" "}
            for details regarding financial, medical, and legal limitations.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Intellectual property</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            The ToolArena brand, original visual designs, logos, software algorithms, and editorial guides are the property of ToolArena. You may utilize the tools freely for your own tasks, but may not duplicate or scrape the platform for unauthorized republishing.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Limitation of liability</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            To the maximum extent permitted by applicable law, ToolArena shall not be held liable for any damages or losses arising from reliance on calculations or information on this site.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Contact</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Questions regarding our terms? Feel free to contact us via our{" "}
            <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
