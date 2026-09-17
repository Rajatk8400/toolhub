import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/data/tools";
import ToolPageTemplate from "@/components/ToolPageTemplate";

export function generateStaticParams() {
  return tools.map((t) => ({ category: t.category, slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || tool.category !== category) return {};

  const url = `/${tool.category}/${tool.slug}`;
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: url },
    robots: tool.indexable ? "index, follow" : "noindex, nofollow",
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || tool.category !== category) notFound();
  return <ToolPageTemplate tool={tool} />;
}
