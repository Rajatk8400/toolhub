import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - ToolArena",
  description: "Common questions about using ToolArena's free online tools, calculators, and student utilities.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "Is ToolArena really free to use?",
    answer: "Yes. Every tool across our platform is completely free with no usage limits or hidden subscription tiers.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. All public utilities, calculators, and converters run with zero signup. Accounts are strictly reserved for administrative content updates.",
  },
  {
    question: "Is my data uploaded when I use a tool?",
    answer: "The vast majority of ToolArena tools — including calculators, converters, JSON formatters, PDF and image processors — run entirely in your web browser. Your inputs, documents, and figures never leave your device.",
  },
  {
    question: "How accurate are the calculators?",
    answer: "Each calculator implements the standard, verified industry formula clearly explained on its page. Financial, tax, and health calculations serve as screening estimates — consult licensed professionals for binding decisions.",
  },
  {
    question: "How do I report a bug or incorrect result?",
    answer: "Use our Contact page to send details, including the tool name and inputs that produced the issue. Our developers test and address reported bugs promptly.",
  },
  {
    question: "Can I suggest a new tool for ToolArena?",
    answer: "Absolutely! We actively welcome suggestions from students, developers, webmasters, and professionals for useful tools we can build next.",
  },
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">FAQ</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        Got questions about ToolArena? Find answers below or reach out to our team directly.
      </p>

      <div className="mt-8 divide-y divide-gray-200/80 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        {faqs.map((f, i) => (
          <div key={i} className="py-5 first:pt-0 last:pb-0">
            <h2 className="font-bold text-gray-900 text-base">{f.question}</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
