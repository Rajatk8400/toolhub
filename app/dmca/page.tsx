import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMCA / Content Policy - ToolArena",
  description: "How to report copyright infringement or other content concerns on ToolArena.",
  alternates: { canonical: "/dmca" },
  robots: "noindex, follow",
};

export default function DmcaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">DMCA Policy</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">DMCA / Content Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Our Content Standards</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            All written tutorials, tool documentation, formulas, and guide content on ToolArena are original works written by our editorial staff or based on public domain scientific algorithms. We respect the intellectual property of creators globally.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Reporting Copyright Concerns</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            If you believe any content on ToolArena infringes your copyright, please notify our team via our{" "}
            <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
              contact form
            </Link>{" "}
            with the following information:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-600">
            <li>The specific URL(s) containing the material in question</li>
            <li>Identification and description of the copyrighted work claimed to be infringed</li>
            <li>Your contact information (name, address, telephone number, and email address)</li>
            <li>A statement of good-faith belief that the disputed use is unauthorized</li>
            <li>A statement made under penalty of perjury that the information in your notice is accurate</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Action &amp; Removal</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Upon receipt of a valid notice, our administrators promptly review and take appropriate action, including expeditious removal or disabling of access to contested materials.
          </p>
        </section>
      </div>
    </main>
  );
}
