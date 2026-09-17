import type { Metadata } from "next";
import GuidesList from "@/components/GuidesList";

export const metadata: Metadata = {
  title: "Guides - Free How-To Guides for Calculators, Students & More",
  description: "Practical, step-by-step guides covering calculators, student tools, image and PDF tips, and more.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Guides</h1>
      <p className="mt-3 max-w-2xl text-gray-700">Practical, step-by-step guides to go along with the tools.</p>
      <GuidesList />
    </main>
  );
}
