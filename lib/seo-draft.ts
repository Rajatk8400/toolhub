import { ToolCategory } from "@/types/tool";

export interface SeoDraft {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  intro: string;
}

const CATEGORY_LABELS: Record<ToolCategory, string> = {
  tools: "tool",
  calculators: "calculator",
  students: "student tool",
  pdf: "PDF tool",
  image: "image tool",
  developer: "developer tool",
  seo: "SEO tool",
  text: "text tool",
  converters: "converter",
  ai: "AI tool",
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generates a starting-point SEO draft from just a tool name and category — no AI call,
 * fully deterministic and reviewable. This is intentionally template-based rather than
 * AI-generated: the spec (§39) requires admin review before publishing either way, and a
 * deterministic draft is easier for an editor to audit than an opaque model output. The
 * created tool always defaults to "draft" status regardless of how these fields were filled
 * in, so nothing from here publishes without a human clicking publish.
 */
export function generateSeoDraft(toolName: string, category: ToolCategory): SeoDraft {
  const trimmedName = toolName.trim();
  const slug = slugify(trimmedName);
  const primaryKeyword = trimmedName.toLowerCase();
  const categoryLabel = CATEGORY_LABELS[category] || "tool";

  const metaTitle = `${trimmedName} - Free Online ${categoryLabel[0].toUpperCase()}${categoryLabel.slice(1)}`;
  const metaDescription = `Free online ${primaryKeyword}. Fast, accurate, and easy to use — no signup required.`;
  const h1 = trimmedName;
  const intro = `${trimmedName} is a free online ${categoryLabel} that helps you get a quick, accurate result without any signup. [DRAFT — replace this intro with 2-4 real paragraphs explaining the problem this tool solves and how to use it before publishing.]`;

  return { slug, metaTitle, metaDescription, h1, primaryKeyword, intro };
}
