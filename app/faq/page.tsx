import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - ToolHub",
  description: "Common questions about using ToolHub's free online tools, calculators, and student utilities.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "Is ToolHub really free to use?",
    answer: "Yes. Every tool on this site is free, with no signup required for basic use.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No — accounts are only used for the admin panel, which manages site content. Using any of the public tools doesn't require signing in.",
  },
  {
    question: "Is my data uploaded when I use a tool?",
    answer: "Most tools — calculators, converters, formatters, PDF and image tools — run entirely in your browser, and your input never leaves your device. A tool's own page notes if it works differently.",
  },
  {
    question: "How accurate are the calculators?",
    answer: "Each calculator uses the standard formula described on its page. That said, financial, health, and tax-related results are estimates — see our Disclaimer for details on where to seek professional advice instead.",
  },
  {
    question: "How do I report a bug or incorrect result?",
    answer: "Use the Contact page to send us details, including which tool and what inputs produced the issue — that's the fastest way for us to reproduce and fix it.",
  },
  {
    question: "Can I suggest a new tool?",
    answer: "Yes, the Contact page works for that too. We prioritize tools that are genuinely useful and can be built as real, working features rather than placeholders.",
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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
      <div className="mt-6 divide-y divide-gray-200">
        {faqs.map((f, i) => (
          <div key={i} className="py-4">
            <h2 className="font-semibold text-gray-900">{f.question}</h2>
            <p className="mt-1 text-gray-700">{f.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
