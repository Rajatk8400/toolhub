import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA / Content Policy - ToolHub",
  description: "How to report copyright infringement or other content concerns on ToolHub.",
  alternates: { canonical: "/dmca" },
  robots: "noindex, follow",
};

export default function DmcaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">DMCA / Content Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: [DATE]</p>

      <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This is a starting template. Have a lawyer confirm the designated-agent details and process
        against current DMCA requirements (or your local equivalent, if you're not US-based) before
        publishing it as your real policy.
      </div>

      <div className="mt-6 space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Our content standards</h2>
          <p className="mt-2">
            All written content, tool descriptions, and guides on this site are created by our editorial
            team. We don't knowingly publish copied text, images, or code owned by someone else without
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Reporting a copyright concern</h2>
          <p className="mt-2">
            If you believe content on this site infringes your copyright, send a notice via our{" "}
            <a href="/contact" className="text-blue-700 hover:underline">contact page</a> including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>The specific page URL(s) containing the material you believe infringes your rights</li>
            <li>A description of the copyrighted work you believe is being infringed</li>
            <li>Your contact information</li>
            <li>A statement that you have a good-faith belief the use is unauthorized</li>
            <li>A statement, made under penalty of perjury, that the information is accurate and you're authorized to act on the copyright owner's behalf</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Our response</h2>
          <p className="mt-2">
            We review valid notices promptly and remove or disable access to the material in question
            where appropriate, consistent with applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Counter-notices</h2>
          <p className="mt-2">
            If you believe content was removed in error, you may submit a counter-notice via the same
            contact channel, identifying the removed material and explaining why it doesn't infringe.
          </p>
        </section>
      </div>
    </main>
  );
}
