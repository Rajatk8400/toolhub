import Link from "next/link";
import { tools } from "@/data/tools";
import SearchBox from "@/components/SearchBox";
import CategoryGrid from "@/components/CategoryGrid";
import ToolCard from "@/components/ToolCard";
import ToolCollectionsGrid from "@/components/ToolCollectionsGrid";
import RecentToolsSection from "@/components/RecentToolsSection";
import FavoriteToolsSection from "@/components/FavoriteToolsSection";
import AdSlot from "@/components/ads/AdSlot";
import { guides } from "@/data/guides";

// High-demand popular tools requested in spec
const POPULAR_SLUGS = [
  "percentage-calculator",
  "emi-calculator",
  "gst-calculator",
  "cgpa-to-percentage",
  "image-compressor",
  "compress-pdf",
  "json-formatter",
  "meta-tag-generator",
  "word-counter",
  "age-calculator",
  "discount-calculator",
  "attendance-calculator",
];

const WHY_FEATURES = [
  {
    icon: "⚡",
    title: "Fast & Browser-Based",
    desc: "Most tools execute in milliseconds directly on your device with zero server latency.",
  },
  {
    icon: "🔒",
    title: "Privacy-Conscious",
    desc: "Your data stays on your machine. Text, numbers, and documents are not uploaded to servers.",
  },
  {
    icon: "🚫",
    title: "No Signup Required",
    desc: "Zero paywalls, accounts, or email captures. Every utility is immediately accessible.",
  },
  {
    icon: "🎯",
    title: "All-in-One Arena",
    desc: "Calculators, converters, developers tools, SEO utilities, and PDF editors in one ecosystem.",
  },
  {
    icon: "📱",
    title: "Mobile-Friendly",
    desc: "Carefully designed responsive interfaces that work flawlessly across phones, tablets, and laptops.",
  },
  {
    icon: "🚀",
    title: "Continuous Expansion",
    desc: "Regularly updated with new tools, accurate formulas, and modern web standards.",
  },
];

const HOMEPAGE_FAQS = [
  {
    q: "Is ToolArena completely free to use?",
    a: "Yes. Every calculator, converter, and utility on ToolArena is 100% free with unlimited daily usage and no mandatory registration.",
  },
  {
    q: "Do my files or calculations get uploaded to your servers?",
    a: "No. The vast majority of our tools — including image compressors, PDF modifiers, JSON formatters, and math calculators — run locally inside your web browser using client-side Web APIs.",
  },
  {
    q: "Can I save my favorite tools for quick access?",
    a: "Yes! Simply click the star icon on any tool card or tool page. Your favorite tools and recently used tools are stored privately in your browser storage.",
  },
  {
    q: "How accurate are the calculators and converters?",
    a: "All calculators implement standard, verified formulas (such as reducing-balance EMI algorithms, CBSE-compliant CGPA conversion, and SI unit standards). Each tool page documents its exact methodology.",
  },
];

export default function Home() {
  const popularTools = POPULAR_SLUGS.map((slug) =>
    tools.find((t) => t.slug === slug)
  ).filter((t): t is (typeof tools)[0] => Boolean(t));

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-200/80 bg-gradient-to-b from-white via-blue-50/20 to-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Over 100+ Free Online Tools &amp; Calculators</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl md:text-6xl">
            Free Online Tools, Calculators &amp; Utilities
          </h1>

          {/* Supporting Text */}
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
            ToolArena brings useful calculators, converters, SEO tools, developer utilities, PDF tools, image tools, text tools and everyday online utilities together in one fast and easy-to-use platform.
          </p>

          {/* Prominent Hero Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBox placeholder="Search calculators, PDF tools, SEO tools, developer tools..." />
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition"
            >
              Explore All Tools
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-gray-900 transition"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </section>

      {/* 2. RECENTLY USED TOOLS (conditionally rendered via local storage) */}
      <RecentToolsSection />

      {/* 3. FAVORITE TOOLS (conditionally rendered via local storage) */}
      <FavoriteToolsSection />

      {/* 4. POPULAR TOOLS SECTION */}
      <section id="popular" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Popular Tools
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              The most frequently used calculators, converters, and digital utilities.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            View all {tools.length} tools →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {popularTools.map((t) => (
            <ToolCard
              key={t.slug}
              slug={t.slug}
              toolName={t.toolName}
              category={t.category}
              description={t.metaDescription}
            />
          ))}
        </div>
      </section>

      {/* 5. TOOL CATEGORIES */}
      <section className="border-t border-gray-200/80 bg-gray-50/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Browse Tools by Category
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Find exactly what you need with our organized digital utility suites.
            </p>
          </div>

          <CategoryGrid />
        </div>
      </section>

      {/* 6. TOOL COLLECTIONS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200/80 pb-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 mb-2">
              <span>Curated Toolkits</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Tool Collections
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Specially selected sets of tools designed for students, businesses, developers, and webmasters.
            </p>
          </div>
          <Link
            href="/collections"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            All Collections →
          </Link>
        </div>

        <ToolCollectionsGrid />
      </section>

      {/* 7. WHY TOOLARENA SECTION */}
      <section className="border-t border-gray-200/80 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Why ToolArena?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Built from the ground up for speed, accuracy, and everyday utility without unnecessary friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl border border-gray-200/80 bg-gray-50/40 p-6 shadow-2xs hover:bg-white hover:shadow-sm transition"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-200/60 text-2xl shadow-2xs">
                  {feat.icon}
                </span>
                <h3 className="mt-4 font-bold text-gray-900">{feat.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURED GUIDES */}
      {guides.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Helpful Guides &amp; Tutorials
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Step-by-step instructions and formulas behind everyday calculations.
              </p>
            </div>
            <Link
              href="/guides"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Browse all guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs hover:border-blue-300 hover:shadow-md transition"
              >
                <div>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    Guide
                  </span>
                  <h3 className="mt-3 text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {g.metaDescription}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-blue-600">Read guide →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 9. HOMEPAGE FAQS */}
      <section className="border-t border-gray-200/80 bg-gray-50/50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Everything you need to know about ToolArena and our online utilities.
            </p>
          </div>

          <div className="space-y-4">
            {HOMEPAGE_FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs"
              >
                <h3 className="text-base font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTROLLED AD SLOT (AdSense-ready, below primary content) */}
      <div className="mx-auto max-w-4xl px-4 py-4">
        <AdSlot position="homepage-bottom" />
      </div>
    </main>
  );
}
