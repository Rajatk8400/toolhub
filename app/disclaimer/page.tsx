import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - ToolHub",
  description: "Important limitations on ToolHub's calculators, converters, and informational content.",
  alternates: { canonical: "/disclaimer" },
  robots: "noindex, follow",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: [DATE]</p>

      <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This is a starting template. Review it against the specific tools you publish — the categories
        below (financial, health, legal/tax, student/exam information) should be adjusted if you add or
        remove tools in those areas.
      </div>

      <div className="mt-6 space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">General</h2>
          <p className="mt-2">
            The calculators, converters, and other tools on this site are provided for informational and
            convenience purposes only. They are not a substitute for professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Financial calculators</h2>
          <p className="mt-2">
            Tools like the EMI, SIP, compound interest, and investment return calculators provide estimates
            based on the numbers you enter and standard formulas. They don't account for fees, taxes,
            changing rates, or your individual financial situation, and results shouldn't be treated as
            financial advice or a guarantee of actual returns. Consult a licensed financial advisor before
            making investment or borrowing decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Health-related calculators</h2>
          <p className="mt-2">
            The BMI calculator and similar tools provide general screening estimates only. They don't
            account for individual health factors like muscle mass, medical history, or age, and are not a
            diagnosis. Talk to a healthcare provider for guidance specific to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Salary and tax-related tools</h2>
          <p className="mt-2">
            The salary calculator uses deduction rates and figures you provide — it does not include
            built-in tax brackets for any country, since tax rules vary by jurisdiction and change over
            time. Results depend entirely on the accuracy of the rates you enter and should not be treated
            as tax advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Student and exam information</h2>
          <p className="mt-2">
            Exam dates, scholarship deadlines, admission cycles, and job postings in our student information
            hub are sourced from official channels and dated with a "last verified" timestamp, but official
            sources can change after we publish. Always confirm time-sensitive details directly with the
            official source linked on each listing before acting on them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">No professional relationship</h2>
          <p className="mt-2">
            Using this site does not create any advisory, professional, or fiduciary relationship between
            you and ToolHub.
          </p>
        </section>
      </div>
    </main>
  );
}
