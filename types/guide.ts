export interface GuideRecord {
  slug: string;
  category: string; // matches a ToolCategory, e.g. "calculators"
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  relatedTools: string[]; // tool slugs
  relatedGuides: string[]; // guide slugs
  indexable: boolean;
  lastUpdated: string;
  author?: string;
  reviewer?: string;
}
