import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - ToolArena",
  description: "How ToolArena handles data: what we collect, what we don't, and how tools process your input.",
  alternates: { canonical: "/privacy-policy" },
  robots: "noindex, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">What ToolArena does with your input</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Most tools on ToolArena run entirely in your web browser. Text, numbers, files, and documents you enter into a calculator, converter, image optimizer, or code formatter are processed locally on your client device and are never uploaded to our servers unless a tool explicitly indicates server-side processing.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
            <li>
              <strong>Analytics:</strong> When enabled, aggregate analytics help us understand which utilities and collections are visited most frequently without storing identifying personal records.
            </li>
            <li>
              <strong>Contact form:</strong> If you contact us, we store your submitted name, email, and inquiry to assist in replying to your message.
            </li>
            <li>
              <strong>Local preferences:</strong> Favorite tools and recently used tools are saved exclusively in your browser&apos;s localStorage. This information is private to your device and never sent to our servers.
            </li>
            <li>
              <strong>Advertising:</strong> If Google AdSense is enabled, Google and its advertising partners may use cookies to serve non-intrusive ads based on web visits.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Cookies</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            We use essential session tokens (<code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">toolarena_session</code>) solely for authenticated admin sessions, and standard analytics/advertising cookies if enabled. Review our{" "}
            <Link href="/cookie-policy" className="text-blue-600 font-semibold hover:underline">
              Cookie Policy
            </Link>{" "}
            for complete technical specifications.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Data sharing</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            ToolArena does not sell, rent, or trade your personal information. We only interface with infrastructure providers required to deliver website assets (hosting, CDN) in compliance with standard privacy safeguards.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Contact</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Have questions regarding our privacy practices? Contact us at any time via our{" "}
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
