import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ToolHub",
  description: "Who builds ToolHub, what it's for, and how we approach accuracy and editorial standards.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">About ToolHub</h1>

      <div className="mt-6 space-y-6 text-gray-700">
        <p>
          ToolHub is a free collection of online calculators, converters, and utilities for students,
          developers, and everyday tasks. Every tool is built to run entirely in your browser wherever
          possible — no signup, and for most tools, nothing you enter ever leaves your device.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">What we build</h2>
          <p className="mt-2">
            Each tool is written and maintained with a working interface and genuine explanatory content —
            not a keyword-stuffed page wrapped around a broken widget. We'd rather ship fewer tools that
            actually work than a long list of placeholders.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Editorial standards</h2>
          <p className="mt-2">
            Content is written by the ToolHub editorial team and reviewed before publishing. For
            time-sensitive information — exam dates, scholarship deadlines, admission cycles — we require a
            verifiable official source and a recorded "last verified" date before anything is published; see
            our <Link href="/students/hub/exam" className="text-blue-700 hover:underline">student information hub</Link> for
            an example of how that's presented.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Corrections</h2>
          <p className="mt-2">
            If you spot an error — a wrong formula, outdated information, or a broken tool — please{" "}
            <Link href="/contact" className="text-blue-700 hover:underline">let us know</Link>. We'd rather fix it
            than leave it.
          </p>
        </section>
      </div>
    </main>
  );
}
