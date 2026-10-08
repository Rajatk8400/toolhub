import { ToolCollection } from "@/types/collection";

export const toolCollections: ToolCollection[] = [
  {
    slug: "student-toolkit",
    name: "Student Toolkit",
    badge: "Academic Essentials",
    metaTitle: "Student Toolkit - Free CGPA, Attendance, GPA & Exam Calculators | ToolArena",
    metaDescription:
      "All-in-one student toolkit on ToolArena. Convert CGPA to percentage, calculate required attendance, predict exam scores, and schedule study hours with free browser-based tools.",
    h1: "Student Toolkit — Essential Academic Calculators",
    description:
      "A curated suite of online tools for students to track attendance, convert CGPA, plan exam prep, and optimize study routines.",
    intro:
      "Managing academic goals requires accurate calculations — from converting your CGPA for job applications and scholarships to calculating the minimum classes required to maintain 75% attendance. The ToolArena Student Toolkit bundles all essential student calculators in one fast, private workspace.",
    iconName: "GraduationCap",
    accentColor: "from-blue-600 to-indigo-600",
    toolSlugs: [
      "cgpa-to-percentage",
      "percentage-calculator",
      "gpa-calculator",
      "attendance-calculator",
      "exam-score-calculator",
      "study-time-calculator",
    ],
    features: [
      "CBSE & University-compliant CGPA conversion formula (CGPA × 9.5)",
      "Strict target attendance planning with remaining-class projection",
      "Proportional study schedule planner weighted by subject difficulty",
      "100% client-side privacy — your grades and calculations stay on your device",
    ],
    faqs: [
      {
        question: "How do I calculate what percentage my CGPA corresponds to?",
        answer:
          "Use the CGPA to Percentage Calculator in this toolkit. On the standard 10-point scale adopted by CBSE and most universities, multiply your CGPA by 9.5.",
      },
      {
        question: "How does the Attendance Calculator help prevent shortage?",
        answer:
          "It calculates your current attendance percentage and projects exactly how many upcoming classes you must attend to achieve your target threshold (such as 75% or 80%).",
      },
      {
        question: "Can I use these tools on my mobile phone?",
        answer:
          "Yes. All ToolArena utilities are fully responsive and work seamlessly on mobile browsers without downloading any app or signing up.",
      },
    ],
    relatedCollectionSlugs: ["business-toolkit", "developer-toolkit"],
  },
  {
    slug: "business-toolkit",
    name: "Business Toolkit",
    badge: "Finance & Operations",
    metaTitle: "Business Toolkit - GST, EMI, Profit Margin & ROI Calculators | ToolArena",
    metaDescription:
      "Free business and finance toolkit on ToolArena. Calculate GST, loan EMI, profit margins, markup pricing, ROI, and take-home salary instantly.",
    h1: "Business & Finance Toolkit — Calculators for Modern Enterprise",
    description:
      "Essential business calculators for entrepreneurs, freelancers, accountants, and finance managers to calculate taxes, margins, loans, and returns.",
    intro:
      "Whether you are pricing products, calculating GST on invoices, forecasting loan EMIs, or analyzing return on investment, accurate figures prevent costly mistakes. The ToolArena Business Toolkit gathers key commercial calculators into one convenient, instant platform.",
    iconName: "Briefcase",
    accentColor: "from-emerald-600 to-teal-600",
    toolSlugs: [
      "gst-calculator",
      "emi-calculator",
      "profit-margin-calculator",
      "investment-return-calculator",
      "salary-calculator",
      "markup-calculator",
    ],
    features: [
      "Standard GST calculation for inclusive and exclusive tax rates",
      "Accurate reducing-balance loan EMI calculator with monthly breakdown",
      "Dynamic cost-plus markup and gross profit margin conversions",
      "Instant calculations with zero spreadsheets required",
    ],
    faqs: [
      {
        question: "What is the difference between profit margin and markup?",
        answer:
          "Markup is the percentage added to the cost price to determine selling price. Profit margin is the percentage of the selling price that is profit. For example, a 25% markup on a $100 cost gives a $125 price, resulting in a 20% profit margin.",
      },
      {
        question: "Can I calculate both GST-inclusive and exclusive amounts?",
        answer:
          "Yes. The GST Calculator allows toggling between adding GST to a net amount and removing GST from a gross price.",
      },
      {
        question: "Are financial calculations kept private?",
        answer:
          "All formulas run locally in your web browser. ToolArena never stores or sends your revenue, cost, or salary figures to external servers.",
      },
    ],
    relatedCollectionSlugs: ["seo-toolkit", "developer-toolkit"],
  },
  {
    slug: "seo-toolkit",
    name: "SEO Toolkit",
    badge: "Search Optimization",
    metaTitle: "SEO Toolkit - Free Meta Tag, SERP Preview & Schema Generators | ToolArena",
    metaDescription:
      "All-in-one SEO toolkit on ToolArena. Generate meta tags, test Google SERP previews, build FAQ schema, create robots.txt, and analyze keyword density.",
    h1: "SEO Toolkit — Search Engine Optimization Utilities",
    description:
      "A complete suite of webmaster and search optimization tools to generate meta tags, preview Google search snippets, build structured data, and configure crawl rules.",
    intro:
      "Optimizing web pages for search engines requires attention to technical details: meta tags that fit character limits, schema markup that passes validation, and canonical links that prevent duplicate content issues. The ToolArena SEO Toolkit provides fast, accurate utilities to streamline your on-page and technical SEO workflow.",
    iconName: "Search",
    accentColor: "from-indigo-600 to-cyan-600",
    toolSlugs: [
      "meta-tag-generator",
      "serp-snippet-preview",
      "faq-schema-generator",
      "robots-txt-generator",
      "canonical-url-generator",
      "hreflang-generator",
      "keyword-density-checker",
    ],
    features: [
      "Live Google Desktop & Mobile SERP snippet preview with character limit alerts",
      "Valid Schema.org JSON-LD structured data generators for FAQs and Breadcrumbs",
      "Robots.txt generator with standard directives and sitemap support",
      "Clean canonical and hreflang tag builders for international indexing",
    ],
    faqs: [
      {
        question: "Why should I use the SERP Preview tool before publishing?",
        answer:
          "Search engines truncate page titles longer than ~60 characters and meta descriptions longer than ~160 characters. Previewing your snippet prevents awkward cuts in search results.",
      },
      {
        question: "Is the generated JSON-LD schema validated?",
        answer:
          "Yes, the generators adhere directly to Schema.org standards and Google's structured data documentation.",
      },
      {
        question: "Do these SEO tools require API keys or subscriptions?",
        answer:
          "No. All ToolArena SEO utilities are 100% free and open for unlimited daily use without registration.",
      },
    ],
    relatedCollectionSlugs: ["developer-toolkit", "pdf-image-toolkit"],
  },
  {
    slug: "developer-toolkit",
    name: "Developer Toolkit",
    badge: "Coding Utilities",
    metaTitle: "Developer Toolkit - JSON Formatter, Base64, JWT, UUID & Regex Tools | ToolArena",
    metaDescription:
      "Essential developer toolkit on ToolArena. Format and validate JSON, decode JWTs, convert Base64, test regular expressions, and generate UUIDs client-side.",
    h1: "Developer Toolkit — Fast Client-Side Dev Utilities",
    description:
      "Browser-based developer utilities for formatting JSON, decoding JWT tokens, encoding Base64, testing regular expressions, and generating test data.",
    intro:
      "Developers constantly need quick utilities for inspecting payloads, formatting minified configs, decoding authentication tokens, and verifying regex expressions. The ToolArena Developer Toolkit brings these daily utilities together with zero latency and 100% client-side data privacy.",
    iconName: "Code",
    accentColor: "from-violet-600 to-purple-600",
    toolSlugs: [
      "json-formatter",
      "base64-encoder",
      "jwt-decoder",
      "uuid-generator",
      "regex-tester",
      "timestamp-converter",
      "csv-to-json",
    ],
    features: [
      "Instant JSON beautification and minification with precise syntax error markers",
      "Client-side JWT decoding for headers, payloads, and claims without sending tokens online",
      "Cryptographically secure UUID v4 generation in batch sizes",
      "Unix timestamp to human-readable date conversions with timezone support",
    ],
    faqs: [
      {
        question: "Is it safe to paste sensitive JWTs or JSON payloads here?",
        answer:
          "Yes. Unlike many online formatters, ToolArena processes your JSON, Base64 strings, and JWT tokens entirely within your browser using JavaScript. No payload is ever sent to our servers.",
      },
      {
        question: "Can I convert CSV exports to JSON arrays?",
        answer:
          "Yes, the CSV to JSON Converter handles headers, comma-separated values, and quoted fields instantly.",
      },
      {
        question: "Does the regex tester support standard JavaScript regular expressions?",
        answer:
          "Yes, it uses the native browser RegExp engine and highlights matches in real time with support for global, case-insensitive, and multiline flags.",
      },
    ],
    relatedCollectionSlugs: ["seo-toolkit", "pdf-image-toolkit"],
  },
  {
    slug: "pdf-image-toolkit",
    name: "PDF & Image Toolkit",
    badge: "Document & Media",
    metaTitle: "PDF & Image Toolkit - Compress, Merge, Convert PDF & Images | ToolArena",
    metaDescription:
      "Free PDF and image toolkit on ToolArena. Compress PDFs, merge and split documents, convert JPG to PDF, resize pictures, and optimize WebP images in your browser.",
    h1: "PDF & Image Toolkit — Fast Media & Document Utilities",
    description:
      "Fast, privacy-friendly online utilities to compress, merge, split, and convert PDF files and digital images directly on your device.",
    intro:
      "Large PDF files and high-resolution images can clog email inboxes, exceed upload limits, and slow down websites. The ToolArena PDF & Image Toolkit offers powerful browser-accelerated tools to shrink file sizes, reorganize pages, and convert formats without paying for expensive software.",
    iconName: "FileText",
    accentColor: "from-rose-600 to-orange-600",
    toolSlugs: [
      "compress-pdf",
      "merge-pdf",
      "split-pdf",
      "jpg-to-pdf",
      "png-to-jpg",
      "png-to-jpeg",
      "png-to-webp",
      "jpg-to-png",
      "jpg-to-webp",
      "webp-to-png",
      "image-compressor",
      "image-resizer",
      "image-format-converter",
    ],
    features: [
      "Local PDF compression with adjustable quality control slider",
      "Merge multiple PDF documents or split pages into distinct downloads",
      "Convert JPG and PNG images directly to standardized PDF files",
      "Batch image format converter supporting WebP, PNG, and JPEG",
    ],
    faqs: [
      {
        question: "Are my uploaded PDFs or confidential documents stored on your server?",
        answer:
          "No. All PDF manipulations (merging, compressing, page extraction) and image processing happen directly inside your web browser using WebAssembly and client-side libraries. Your files never touch a remote server.",
      },
      {
        question: "How much file size reduction can I expect with the PDF compressor?",
        answer:
          "Documents containing high-resolution scans and photos frequently see 50% to 80% file size reductions, depending on your selected image quality slider.",
      },
      {
        question: "Can I convert photos into a single PDF document?",
        answer:
          "Yes. Use the JPG to PDF tool to combine multiple images into a neatly paginated PDF document ready for printing or emailing.",
      },
    ],
    relatedCollectionSlugs: ["student-toolkit", "business-toolkit"],
  },
];

export function getCollectionBySlug(slug: string): ToolCollection | undefined {
  return toolCollections.find((c) => c.slug === slug);
}

export function getAllCollections(): ToolCollection[] {
  return toolCollections;
}
