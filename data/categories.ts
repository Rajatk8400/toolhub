import { CategoryMeta } from "@/types/tool";

export const categories: CategoryMeta[] = [
  {
    slug: "calculators",
    name: "Calculators",
    description:
      "Free online calculators for percentages, loans, interest, health, and everyday math — fast, accurate, and easy to use.",
    metaTitle: "Free Online Calculators | Percentage, EMI, BMI & More",
    metaDescription:
      "Use our free online calculators for percentage, EMI, SIP, GST, BMI, interest, and more. Fast, accurate, no signup required.",
  },
  {
    slug: "students",
    name: "Student Tools",
    description:
      "Utilities built for students: CGPA converters, attendance calculators, exam tools, and study planning helpers.",
    metaTitle: "Student Tools & Calculators | CGPA, Attendance, Exams",
    metaDescription:
      "Free student tools including CGPA to percentage conversion, attendance calculators, GPA calculators, and exam utilities.",
  },
  {
    slug: "developer",
    name: "Developer Tools",
    description:
      "Fast, client-side developer utilities: JSON formatting, encoding, hashing, regex testing, and more.",
    metaTitle: "Free Developer Tools | JSON, Base64, Regex & More",
    metaDescription:
      "Free online developer tools: JSON formatter, Base64 encoder/decoder, regex tester, UUID generator, and more. Runs in your browser.",
  },
  {
    slug: "text",
    name: "Text Tools",
    description:
      "Word counters, case converters, and text formatting utilities for writers, students, and professionals.",
    metaTitle: "Free Text Tools | Word Counter, Case Converter & More",
    metaDescription:
      "Free text tools: word counter, character counter, case converter, and more text utilities. Fast and private — all in your browser.",
  },
  {
    slug: "converters",
    name: "Converters",
    description:
      "Unit converters for length, weight, temperature, speed, data storage, and more.",
    metaTitle: "Free Unit Converters | Length, Weight, Temperature & More",
    metaDescription:
      "Convert length, weight, temperature, speed, and data units instantly with our free online converters.",
  },
  {
    slug: "image",
    name: "Image Tools",
    description: "Compress, resize, and convert images directly in your browser.",
    metaTitle: "Free Image Tools | Compress, Resize, Convert",
    metaDescription:
      "Free online image tools to compress, resize, and convert JPG, PNG, and WebP images — processed locally in your browser.",
  },
  {
    slug: "pdf",
    name: "PDF Tools",
    description: "Convert, merge, split, and compress PDF files for free.",
    metaTitle: "Free PDF Tools | Convert, Merge, Compress PDF",
    metaDescription:
      "Free online PDF tools: convert images to PDF, merge, split, and compress PDF files.",
  },
  {
    slug: "seo",
    name: "SEO Tools",
    description: "Meta tag generators, schema builders, and SEO checkers.",
    metaTitle: "Free SEO Tools | Meta Tags, Schema, Sitemap Generators",
    metaDescription:
      "Free SEO tools including meta tag generator, schema markup generator, robots.txt generator, and keyword density checker.",
  },
  {
    slug: "ai",
    name: "AI Tools",
    description: "AI-powered writing and content utilities.",
    metaTitle: "Free AI Tools | Writing, Summarizing & More",
    metaDescription: "Free AI-powered tools for writing, summarizing, and content generation.",
  },
  {
    slug: "tools",
    name: "All Tools",
    description: "Browse the full library of free online tools.",
    metaTitle: "Free Online Tools | All Utilities in One Place",
    metaDescription: "Browse every free online tool on the platform, organized by category.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
