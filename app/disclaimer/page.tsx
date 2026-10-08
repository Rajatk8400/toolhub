import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer - ToolArena",
  description: "Important limitations on ToolArena's calculators, converters, and informational content.",
  alternates: { canonical: "/disclaimer" },
  robots: "noindex, follow",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Disclaimer</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">Disclaimer</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">General Information</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            All calculators, unit converters, and digital tools published on ToolArena are provided for general educational, convenience, and exploratory purposes only. They do not constitute formal professional advice.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Financial &amp; Business Calculations</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Calculators including EMI, GST, compound interest, SIP, and investment returns provide estimates based on standard financial algorithms and user inputs. Real-world loans and investments involve bank fees, variable interest rates, compounding frequency shifts, and local tax rules. Consult a certified financial advisor or accountant prior to making binding borrowing or investment choices.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Health &amp; Wellness Estimates</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            The BMI calculator and related wellness tools provide general reference numbers based on international formulas. They do not account for muscle mass, bone density, or clinical history, and cannot replace a medical evaluation by a licensed healthcare provider.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">Academic &amp; Student Data</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            While our CGPA and attendance calculators utilize widely accepted university formulas (such as the standard CBSE 9.5 multiplier), individual institutions may maintain distinct grading regulations. Always check your university&apos;s official grading handbook for final academic records.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
          <h2 className="text-xl font-bold text-gray-900">No Advisory Relationship</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Using ToolArena does not create any advisory, fiduciary, or professional relationship between you and ToolArena.
          </p>
        </section>
      </div>
    </main>
  );
}
