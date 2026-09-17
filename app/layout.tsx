import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AdsenseScript from "@/components/ads/AdsenseScript";
import Logo from "@/components/Logo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "ToolHub - Free Online Tools, Calculators & Student Utilities",
    template: "%s | ToolHub",
  },
  description:
    "Free online tools, calculators, converters, and student utilities. Fast, simple, and useful — no signup required.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <AdsenseScript />
        <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md shadow-xs">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
            <Logo size="md" />
            <nav aria-label="Main" className="hidden flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-gray-600 md:flex">
              {categories.filter((c) => c.slug !== "tools").map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="transition-colors hover:text-blue-600">
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div id="main-content">{children}</div>
        <footer className="mt-20 border-t border-gray-200 bg-white pt-12 pb-8 text-sm text-gray-500">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center text-center">
              <Logo size="lg" showTagline />
              <p className="mt-3 max-w-md text-xs text-gray-500">
                Free, fast, and privacy-conscious web tools and calculators. Built for students, developers, marketers, and everyday workflows.
              </p>
            </div>

            <div className="my-8 border-t border-gray-100 pt-6">
              <nav aria-label="Categories" className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-gray-600">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`} className="transition-colors hover:text-blue-600">
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>

            <nav aria-label="Site" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
              {[
                ["/about", "About"],
                ["/contact", "Contact"],
                ["/faq", "FAQ"],
                ["/guides", "Guides"],
                ["/sitemap", "Sitemap"],
                ["/privacy-policy", "Privacy Policy"],
                ["/terms", "Terms & Conditions"],
                ["/disclaimer", "Disclaimer"],
                ["/cookie-policy", "Cookie Policy"],
                ["/dmca", "DMCA"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="transition-colors hover:text-blue-600">
                  {label}
                </Link>
              ))}
            </nav>
            <p className="mt-6 text-center text-xs text-gray-400">© {new Date().getFullYear()} ToolHub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
