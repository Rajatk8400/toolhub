import { GuideRecord } from "@/types/guide";

export const guides: GuideRecord[] = [
  {
    slug: "how-to-calculate-percentage",
    category: "calculators",
    title: "How to Calculate Percentage",
    metaTitle: "How to Calculate Percentage - Step-by-Step Guide",
    metaDescription:
      "Learn how to calculate a percentage step by step, with worked examples for finding a percentage of a number, percentage change, and percentage of a total.",
    h1: "How to Calculate Percentage",
    intro:
      "Percentages show up everywhere — discounts, exam scores, tips, statistics — and the underlying math is the same three-step process every time. This guide walks through the core formula and the most common variations with worked examples.",
    sections: [
      {
        heading: "The basic formula",
        content:
          "To find what percentage a 'part' is of a 'whole', divide the part by the whole and multiply by 100: Percentage = (Part / Whole) × 100. For example, if you scored 45 out of 60 on a test, that's (45 / 60) × 100 = 75%.",
      },
      {
        heading: "Finding a percentage of a number",
        content:
          "To find, say, 20% of 150, convert the percentage to a decimal (20% = 0.20) and multiply: 0.20 × 150 = 30. This is the calculation used for discounts, tips, and tax.",
      },
      {
        heading: "Percentage increase or decrease",
        content:
          "To find the percentage change between an old and new value, subtract the old value from the new value, divide by the old value, then multiply by 100: ((New − Old) / Old) × 100. A positive result is an increase; a negative result is a decrease.",
      },
    ],
    faq: [
      {
        question: "How do I calculate percentage without a calculator?",
        answer:
          "For round numbers, break the percentage into easy parts — e.g. 10% of a number is just moving the decimal point one place left, and you can build other percentages from that (20% = 10% × 2, 5% = 10% ÷ 2, and so on).",
      },
      {
        question: "What's the difference between percentage points and percent?",
        answer:
          "Percentage points measure the raw difference between two percentages (e.g. going from 20% to 25% is a 5 percentage point increase), while 'percent increase' measures relative change (a 25% increase in this case).",
      },
    ],
    relatedTools: ["percentage-calculator", "discount-calculator"],
    relatedGuides: ["how-to-calculate-cgpa-to-percentage"],
    indexable: true,
    lastUpdated: "2026-09-03",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-calculate-cgpa-to-percentage",
    category: "students",
    title: "How to Convert CGPA to Percentage",
    metaTitle: "How to Convert CGPA to Percentage - Formula & Examples",
    metaDescription:
      "Learn how to convert CGPA to percentage using the standard 10-point scale formula, with worked examples and notes on university-specific variations.",
    h1: "How to Convert CGPA to Percentage",
    intro:
      "Indian universities on a 10-point CGPA scale often need students to report an equivalent percentage for job applications or further studies abroad. Here's the standard formula and how to apply it correctly.",
    sections: [
      {
        heading: "The CBSE conversion formula",
        content:
          "The formula published by CBSE, and widely adopted by many universities, is: Percentage = CGPA × 9.5. For example, a CGPA of 8.4 converts to 8.4 × 9.5 = 79.8%.",
      },
      {
        heading: "Why 9.5 and not 10?",
        content:
          "The 9.5 multiplier accounts for the fact that grade boundaries on the 10-point scale don't map linearly onto a 0–100 percentage scale — it's an empirically derived conversion factor, not a simple unit conversion.",
      },
      {
        heading: "When this formula doesn't apply",
        content:
          "Some universities publish their own conversion table or use a different multiplier. If you need the conversion for an official purpose — a job application, visa, or further study — check your institution's official conversion policy rather than relying solely on the general formula.",
      },
    ],
    faq: [
      {
        question: "Can I convert percentage back to CGPA?",
        answer: "Yes — divide the percentage by 9.5. For example, 75% ÷ 9.5 ≈ 7.89 CGPA.",
      },
      {
        question: "Does this formula apply to a 4-point GPA scale?",
        answer: "No, this formula is specific to the 10-point CGPA scale. A 4-point GPA scale uses a different conversion, typically GPA/4 × 100.",
      },
    ],
    relatedTools: ["cgpa-to-percentage", "gpa-calculator"],
    relatedGuides: ["how-to-calculate-percentage"],
    indexable: true,
    lastUpdated: "2026-09-03",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-compress-an-image-without-losing-quality",
    category: "image",
    title: "How to Compress an Image Without Losing Quality",
    metaTitle: "How to Compress an Image Without Losing Quality",
    metaDescription:
      "Learn practical techniques to reduce image file size while keeping visible quality high, including format choice, quality settings, and resizing.",
    h1: "How to Compress an Image Without Losing Quality",
    intro:
      "Large images slow down websites and fill up storage, but compressing too aggressively introduces visible artifacts. Here's how to shrink file size while keeping images looking sharp.",
    sections: [
      {
        heading: "Choose the right format first",
        content:
          "JPG suits photos with lots of color variation; PNG suits graphics, logos, and images needing transparency; WebP often compresses better than both for web use, when the target platform supports it. Using the wrong format is often the biggest source of unnecessary file size.",
      },
      {
        heading: "Adjust quality, not just resolution",
        content:
          "Most compressors let you set a quality level (roughly 0–100). For photos, quality around 70–85% is usually visually indistinguishable from the original while cutting file size significantly — the drop-off in perceptible quality only becomes obvious below about 50%.",
      },
      {
        heading: "Resize before compressing",
        content:
          "If an image is displayed at 800px wide but the original is 4000px wide, resizing it down first (before applying quality compression) usually reduces file size far more than compression alone, with no visible quality loss since the extra pixels weren't being used anyway.",
      },
    ],
    faq: [
      {
        question: "Is WebP always better than JPG?",
        answer:
          "WebP generally compresses better at equivalent visual quality, but check that your target platform or email client supports it — some older tools still expect JPG or PNG.",
      },
      {
        question: "Why does my PNG stay large even after compression?",
        answer:
          "PNG uses lossless compression, so there's a limit to how much it can shrink without changing the image data. For photos, converting to JPG or WebP first usually helps more than trying to compress a PNG further.",
      },
    ],
    relatedTools: ["image-compressor", "image-resizer", "image-format-converter"],
    relatedGuides: [],
    indexable: true,
    lastUpdated: "2026-09-03",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-calculate-attendance-percentage",
    category: "students",
    title: "How to Calculate Attendance Percentage",
    metaTitle: "How to Calculate Attendance Percentage - Formula & Examples",
    metaDescription:
      "Learn how to calculate attendance percentage, figure out how many classes you can miss, and work out how many you need to attend to hit a target.",
    h1: "How to Calculate Attendance Percentage",
    intro:
      "Most colleges and schools set a minimum attendance requirement — often 75% — that you need to meet to sit for exams. Here's the math behind it, and how to work out where you stand.",
    sections: [
      {
        heading: "The basic formula",
        content:
          "Attendance percentage = (Classes attended / Classes held) × 100. If you've attended 45 out of 60 classes held so far, that's (45 / 60) × 100 = 75%.",
      },
      {
        heading: "How many classes can you afford to miss?",
        content:
          "If you're above the requirement, you can work out a safety margin: solve for how many additional classes (x) can be added to the total while attended stays fixed, such that attended / (held + x) still meets the target. Concretely, x = (attended × 100 / target%) − held, rounded down.",
      },
      {
        heading: "How many more do you need to attend?",
        content:
          "If you're below the requirement, and you know how many classes remain in the term, you can solve for the minimum number you need to attend from here: needed = ceiling((target% × (held + remaining) − attended × 100) / 100).",
      },
    ],
    faq: [
      {
        question: "Does a cancelled class count as 'held'?",
        answer: "Typically no — most institutions only count classes that actually took place. Check your institution's specific policy, since this can vary.",
      },
      {
        question: "What if I can't reach the requirement no matter how many remaining classes I attend?",
        answer: "If even attending every remaining class wouldn't get you to the target, that's worth raising with your institution directly — some have provisions for medical or other documented exceptions.",
      },
    ],
    relatedTools: ["attendance-calculator", "required-attendance-calculator"],
    relatedGuides: ["how-to-calculate-percentage"],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-convert-jpg-to-png",
    category: "image",
    title: "How to Convert JPG to PNG",
    metaTitle: "How to Convert JPG to PNG - Free & Fast",
    metaDescription:
      "Learn when and how to convert a JPG image to PNG format, and what changes (and doesn't) in the process.",
    h1: "How to Convert JPG to PNG",
    intro:
      "JPG and PNG solve different problems — JPG suits photos, PNG suits graphics and anything needing transparency. Converting from JPG to PNG is simple, but it's worth understanding what you gain and don't gain from it.",
    sections: [
      {
        heading: "What changes when you convert",
        content:
          "PNG uses lossless compression, so a converted image won't lose any additional quality at the moment of conversion. However, if the JPG was already compressed (introducing artifacts), converting to PNG preserves those artifacts — it doesn't undo prior JPG compression loss.",
      },
      {
        heading: "What you don't gain",
        content:
          "A JPG has no transparency information, so converting it to PNG doesn't add a transparent background — the image will still have whatever solid background it had as a JPG. To get transparency, you'd need to manually remove the background using an image editor.",
      },
      {
        heading: "When PNG makes sense",
        content:
          "Convert to PNG when you need lossless quality for further editing, when the image contains text or sharp edges (PNG compresses these better than JPG), or when your workflow specifically requires PNG format.",
      },
    ],
    faq: [
      {
        question: "Will converting to PNG make my file smaller?",
        answer: "Usually the opposite — PNG files are typically larger than JPGs for photographic content, since JPG's lossy compression is more aggressive. PNG is better suited to graphics, not photos.",
      },
      {
        question: "Can I convert back from PNG to JPG without further quality loss?",
        answer: "No — JPG conversion is lossy, so converting PNG to JPG and back will introduce compression artifacts that weren't in the original PNG.",
      },
    ],
    relatedTools: ["image-format-converter", "image-compressor"],
    relatedGuides: ["how-to-compress-an-image-without-losing-quality"],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-merge-pdf-files",
    category: "pdf",
    title: "How to Merge PDF Files",
    metaTitle: "How to Merge PDF Files - Free & Fast",
    metaDescription:
      "Learn how to combine multiple PDF files into one document, in the right order, without installing software.",
    h1: "How to Merge PDF Files",
    intro:
      "Combining several PDFs into one document is a common task — assembling a report from separate sections, combining scanned pages, or bundling attachments for a single submission. Here's how to do it correctly.",
    sections: [
      {
        heading: "Get your files in order first",
        content:
          "Before merging, know the order you want the final document in. Most merge tools combine files in the order you upload them, and let you reorder afterward — check this before generating the final file rather than after.",
      },
      {
        heading: "Watch out for page orientation and size mismatches",
        content:
          "If your source PDFs have different page sizes or orientations (some portrait, some landscape), the merged document will preserve each page's original layout — this isn't usually a problem, but it's worth reviewing the merged file before sending it anywhere formal.",
      },
      {
        heading: "Password-protected PDFs",
        content:
          "Most browser-based merge tools, including client-side ones, can't merge encrypted or password-protected PDFs. Remove the password first using a PDF editor, then merge.",
      },
    ],
    faq: [
      {
        question: "Does merging PDFs reduce their combined file size?",
        answer: "Not directly — merging just combines the files structurally. If file size matters, compress each PDF (or the merged result) separately.",
      },
      {
        question: "Can I merge PDFs with different page sizes into one uniform document?",
        answer: "A basic merge preserves each page's original size — normalizing all pages to one uniform size requires additional processing beyond a simple merge.",
      },
    ],
    relatedTools: ["merge-pdf", "compress-pdf"],
    relatedGuides: [],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-format-json",
    category: "developer",
    title: "How to Format JSON",
    metaTitle: "How to Format JSON - Beautify, Validate & Minify",
    metaDescription:
      "Learn how to format, validate, and minify JSON, and how to fix the most common JSON syntax errors.",
    h1: "How to Format JSON",
    intro:
      "Minified or poorly formatted JSON is hard to read and debug. Formatting it — adding consistent indentation and line breaks — makes structure immediately visible, which is often the fastest way to spot a bug.",
    sections: [
      {
        heading: "Beautifying vs. minifying",
        content:
          "Beautifying adds indentation and line breaks for readability, typically used while developing or debugging. Minifying strips all unnecessary whitespace to reduce size, typically used for production API responses or storage where every byte counts.",
      },
      {
        heading: "Common JSON syntax errors",
        content:
          "The most frequent mistakes: trailing commas after the last item in an object or array (JSON doesn't allow them, unlike JavaScript object literals), using single quotes instead of double quotes around strings and keys, and forgetting to escape special characters like quotes inside string values.",
      },
      {
        heading: "Validating before you format",
        content:
          "A formatter will refuse to beautify invalid JSON and should tell you roughly where the problem is. Fix the reported error first — usually near the position mentioned, even if the actual syntax mistake is a character or two before it.",
      },
    ],
    faq: [
      {
        question: "Why does my JSON fail to parse even though it looks correct?",
        answer: "Check for trailing commas, smart/curly quotes accidentally pasted in from a word processor, or a stray comment (JSON doesn't support comments, unlike JavaScript or JSON5).",
      },
      {
        question: "Is minified JSON functionally different from formatted JSON?",
        answer: "No — whitespace outside of string values is purely cosmetic in JSON. Minified and beautified versions of the same data parse to identical objects.",
      },
    ],
    relatedTools: ["json-formatter", "csv-to-json"],
    relatedGuides: [],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-calculate-emi",
    category: "calculators",
    title: "How to Calculate EMI",
    metaTitle: "How to Calculate EMI - Formula & Worked Example",
    metaDescription:
      "Learn the EMI formula step by step, with a worked example, and understand what changes your monthly payment.",
    h1: "How to Calculate EMI",
    intro:
      "An EMI (Equated Monthly Installment) is the fixed monthly payment on a loan, covering both principal and interest, calculated so the loan is fully paid off by the end of its term. Here's the formula and how each part affects your payment.",
    sections: [
      {
        heading: "The EMI formula",
        content:
          "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1), where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly installments.",
      },
      {
        heading: "Worked example",
        content:
          "For a loan of 500,000 at 9% annual interest over 5 years (60 months): r = 9/12/100 = 0.0075, n = 60. Plugging into the formula gives an EMI of approximately 10,378 per month, with total interest paid over the loan term of roughly 122,700.",
      },
      {
        heading: "What increases or decreases your EMI",
        content:
          "A longer tenure lowers the monthly EMI but increases total interest paid over the life of the loan, since you're paying interest for longer. A shorter tenure raises the EMI but reduces total interest. A lower interest rate reduces EMI directly, all else equal.",
      },
    ],
    faq: [
      {
        question: "Does EMI stay the same for the entire loan term?",
        answer: "For a fixed-rate loan, yes — the EMI amount stays constant, though the split between principal and interest within each payment shifts over time (more interest early on, more principal later).",
      },
      {
        question: "What if my loan has a floating interest rate?",
        answer: "With a floating rate, the EMI (or the tenure, depending on the lender's policy) can change when the rate changes — the formula above applies at each rate period using the then-current rate.",
      },
    ],
    relatedTools: ["emi-calculator", "compound-interest-calculator"],
    relatedGuides: [],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-calculate-bmi",
    category: "calculators",
    title: "How to Calculate BMI",
    metaTitle: "How to Calculate BMI - Formula & What It Means",
    metaDescription:
      "Learn the BMI formula, work through an example, and understand what BMI does and doesn't tell you about health.",
    h1: "How to Calculate BMI",
    intro:
      "Body Mass Index (BMI) is a simple screening measure relating weight to height. It's quick to calculate and widely used, but it's worth understanding both the formula and its limitations.",
    sections: [
      {
        heading: "The formula",
        content:
          "BMI = weight in kilograms / (height in meters)². For example, someone weighing 70 kg at 1.75 m tall has a BMI of 70 / (1.75 × 1.75) = 70 / 3.0625 ≈ 22.9.",
      },
      {
        heading: "The standard categories",
        content:
          "Using WHO classifications for most adults: under 18.5 is considered underweight, 18.5–24.9 is normal weight, 25–29.9 is overweight, and 30 or above is considered obese.",
      },
      {
        heading: "What BMI doesn't account for",
        content:
          "BMI doesn't distinguish muscle mass from fat, so a muscular athlete can register as 'overweight' despite low body fat. It also doesn't account for age, sex, or where fat is distributed on the body — it's a population-level screening tool, not an individual diagnosis.",
      },
    ],
    faq: [
      {
        question: "Is BMI accurate for children?",
        answer: "No — children and teens need age- and sex-specific BMI percentile charts rather than the standard adult categories, since body composition changes significantly during growth.",
      },
      {
        question: "Should I make health decisions based on BMI alone?",
        answer: "BMI is a useful starting screening tool, but a healthcare provider can give a fuller picture using additional measures relevant to your individual health.",
      },
    ],
    relatedTools: ["bmi-calculator", "age-calculator"],
    relatedGuides: [],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
  {
    slug: "how-to-calculate-gst",
    category: "calculators",
    title: "How to Calculate GST",
    metaTitle: "How to Calculate GST - Add or Remove GST, With Examples",
    metaDescription:
      "Learn how to add GST to a price or extract the GST-exclusive base price from a GST-inclusive amount, with worked examples.",
    h1: "How to Calculate GST",
    intro:
      "Goods and Services Tax (GST) calculations come up in two directions: adding GST to a base price to get the final price, or working backward from a GST-inclusive price to find the base amount and tax. Here's both, with examples.",
    sections: [
      {
        heading: "Adding GST to a price",
        content:
          "GST amount = Base price × (GST rate / 100). Final price = Base price + GST amount. For a base price of 1,000 at 18% GST: GST amount = 1,000 × 0.18 = 180, so the final price is 1,180.",
      },
      {
        heading: "Removing GST from an inclusive price",
        content:
          "This is the more error-prone direction — you can't just subtract the GST percentage from the total. Base price = Inclusive price / (1 + GST rate / 100). For an inclusive price of 1,180 at 18% GST: base = 1,180 / 1.18 = 1,000, and the GST portion is 1,180 − 1,000 = 180.",
      },
      {
        heading: "The common mistake to avoid",
        content:
          "A frequent error is calculating 18% of the inclusive price directly to 'remove' GST (1,180 × 0.18 = 212.40) instead of dividing by (1 + rate/100) first — this overstates the GST amount and understates the base price. Always divide first when working backward from an inclusive price.",
      },
    ],
    faq: [
      {
        question: "Why can't I just subtract the GST percentage from the inclusive price?",
        answer: "Because the GST percentage was calculated on the base price, not the inclusive price — subtracting a percentage of the larger (inclusive) number overstates the tax. Dividing by (1 + rate/100) correctly reverses the original calculation.",
      },
      {
        question: "Do all goods and services have the same GST rate?",
        answer: "No — rates vary by category and jurisdiction, and some items may be exempt. Confirm the applicable rate for your specific case with current official guidance.",
      },
    ],
    relatedTools: ["gst-calculator", "discount-calculator"],
    relatedGuides: [],
    indexable: true,
    lastUpdated: "2026-09-14",
    author: "ToolHub Editorial",
    reviewer: "ToolHub Editorial",
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuideTools(guide: GuideRecord) {
  return guide.relatedTools;
}
