import Link from "next/link";
import Logo from "@/components/Logo";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200/90 bg-white pt-16 pb-12 text-sm text-gray-500">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Branding & Column Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Logo size="lg" showTagline />
            <p className="mt-3.5 max-w-sm text-sm text-gray-600 leading-relaxed">
              ToolArena is an all-in-one digital tools platform bringing together free calculators, converters, developer utilities, PDF &amp; image processors, and SEO tools — built to work fast, securely, and privately in your browser.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>100% Free · No Signup Required · Browser-Accelerated</span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/tools" className="transition hover:text-blue-600">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/#popular" className="transition hover:text-blue-600">
                  Popular Tools
                </Link>
              </li>
              <li>
                <Link href="/collections" className="inline-flex items-center gap-1.5 transition hover:text-blue-600">
                  <span>Tool Collections</span>
                  <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold text-blue-700">New</span>
                </Link>
              </li>
              <li>
                <Link href="/guides" className="transition hover:text-blue-600">
                  Guides &amp; Tutorials
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="transition hover:text-amber-600">
                  My Favorite Tools
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="transition hover:text-blue-600">
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tool Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories
                .filter((c) => c.slug !== "tools")
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="transition hover:text-blue-600">
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 3: Company & Trust */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="transition hover:text-blue-600">
                  About ToolArena
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-blue-600">
                  Contact &amp; Feedback
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-blue-600">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="transition hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-blue-600">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="transition hover:text-blue-600">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="transition hover:text-blue-600">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="transition hover:text-blue-600">
                  DMCA / Content Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright Bar */}
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ToolArena. All rights reserved.</p>

          <p className="font-medium text-gray-700">
            Designed &amp; Developed by Rajat Kashyap
          </p>

          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-blue-600 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-blue-600 transition">
              XML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
