import type { Metadata } from "next";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AdsenseScript from "@/components/ads/AdsenseScript";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toolarena.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ToolArena - Free Online Tools, Calculators & Utilities",
    template: "%s | ToolArena",
  },
  description:
    "ToolArena brings useful calculators, converters, SEO tools, developer utilities, PDF tools, image tools, text tools and everyday online utilities together in one fast and easy-to-use platform.",
  applicationName: "ToolArena",
  keywords: [
    "online tools",
    "free calculators",
    "developer utilities",
    "pdf tools",
    "image compressor",
    "seo tools",
    "student calculators",
    "unit converters",
  ],
  authors: [{ name: "Rajat Kashyap" }],
  creator: "Rajat Kashyap",
  publisher: "ToolArena",
  verification: {
    google: "IsR2K4NMe0JYk4BQ4Hiv2aIDVKUGDR_6HPniQAOqY30",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ToolArena",
    title: "ToolArena - Free Online Tools, Calculators & Utilities",
    description:
      "All your essential online tools in one place. Fast, privacy-friendly calculators, converters, SEO utilities, and developer tools with zero signup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolArena - Free Online Tools, Calculators & Utilities",
    description:
      "All your essential online tools in one place. Fast, browser-based utilities with zero signup.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "ToolArena",
        description:
          "Free online tools, calculators, converters, SEO and developer utilities.",
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "ToolArena",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gray-50/60 text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <AdsenseScript />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
