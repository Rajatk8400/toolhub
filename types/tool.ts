// Core data model for every indexable tool/page on the platform.
// This is the single shape that both the DB (Mongoose "Tool" model)
// and the static seed registry conform to, so pages, sitemap,
// metadata, and internal linking all read from one source of truth.

export type ToolCategory =
  | "tools"
  | "calculators"
  | "students"
  | "pdf"
  | "image"
  | "developer"
  | "seo"
  | "text"
  | "converters"
  | "ai";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolRecord {
  slug: string; // e.g. "percentage-calculator"
  category: ToolCategory;
  toolName: string; // display name, e.g. "Percentage Calculator"
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string; // 2-4 paragraphs, plain text/markdown-lite
  howToUse?: string[]; // ordered steps
  features?: string[];
  useCases?: string[];
  formula?: string; // only when relevant
  faq: FaqItem[];
  relatedTools: string[]; // slugs, resolved at render time
  relatedGuides?: string[]; // guide slugs
  indexable: boolean;
  lastUpdated: string; // ISO date
  author?: string;
  reviewer?: string;
  source?: string;
  officialSourceUrl?: string;
  // Which client component renders the actual interactive tool.
  // Keeps the SEO template fully decoupled from tool logic.
  component: string;
}

export interface CategoryMeta {
  slug: ToolCategory;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}
