export interface ToolCollection {
  slug: string;
  name: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  description: string;
  intro: string;
  iconName: string;
  accentColor: string;
  toolSlugs: string[];
  features: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedCollectionSlugs: string[];
}
