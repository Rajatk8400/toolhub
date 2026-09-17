import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact ToolHub",
  description: "Get in touch with the ToolHub team — report a bug, suggest a tool, or flag an error.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Contact us</h1>
      <p className="mt-3 text-gray-700">
        Found a bug, spotted an error in a tool's content, or have a suggestion for a new tool? Send us a
        message below.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}
