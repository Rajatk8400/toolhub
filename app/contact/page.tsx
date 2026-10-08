import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact ToolArena",
  description: "Get in touch with the ToolArena team — report a bug, suggest a tool, or flag an error.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> {" / "}
        <span className="text-gray-700">Contact</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900">Contact ToolArena</h1>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        Found a bug, spotted an error in a tool&apos;s formula, or have a suggestion for a new calculator or converter? Send our team a message below and we will get back to you.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-2xs">
        <ContactForm />
      </div>
    </main>
  );
}
