import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ToolArena",
  description:
    "ToolArena is an all-in-one online tools platform designed to make everyday digital tasks easier, faster and more accessible.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">About</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About ToolArena</h1>

      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg text-gray-800">
          ToolArena is an all-in-one online tools platform designed to make everyday digital tasks easier, faster and more accessible.
        </p>

        <p>
          We bring together useful calculators, converters, SEO tools, developer utilities, PDF editors, image processors, text formatters, and everyday online utilities into one cohesive, fast, and easy-to-use digital ecosystem.
        </p>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">What we build</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Every tool in our library is engineered with an active, functional interface and genuine explanatory documentation — not a keyword-stuffed shell around broken widgets. We believe in providing robust tools that execute with speed and precision.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Privacy &amp; Client-Side Speed</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Whenever technically possible, ToolArena utilities process your inputs directly within your web browser using modern WebAssembly and native JavaScript APIs. That means your calculations, JSON payloads, images, and documents never need to travel to third-party servers.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Editorial standards &amp; Verification</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            All educational explanations, math formulas, and informational guides are created and reviewed by the ToolArena editorial team. For time-sensitive information — such as exam schedules, scholarship criteria, and government admissions — we reference verifiable official sources and include a recorded &quot;last verified&quot; timestamp.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Feedback &amp; Corrections</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            If you notice an inaccuracy in a formula, an unexpected calculation output, or would like to request a new tool, please{" "}
            <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
              reach out through our contact page
            </Link>
            . We actively maintain and refine our toolset.
          </p>
        </section>
      </div>
    </main>
  );
}
