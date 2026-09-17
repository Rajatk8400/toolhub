# ToolHub — Phase 1 scaffold

This is a **starter foundation**, not the full 100+ tool platform — see "Scope & what's next"
below for why, and how to keep building it out.

## What's included and working

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Authentication + role-based admin panel**: email/password auth with bcrypt-hashed
  passwords and signed JWT session cookies (`lib/auth/`), `admin`/`editor`/`user` roles, edge
  `proxy.ts` protecting every `/admin/*` route, and admin CRUD screens
  (`/admin/tools`, `/admin/tools/new`, `/admin/tools/[slug]/edit`) backed by
  `/api/admin/tools*` routes that read/write the MongoDB `Tool` model directly. Create the
  first admin with `npx tsx scripts/create-admin.ts <email> "<name>" <password>` (requires
  `MONGODB_URI` and `NEXTAUTH_SECRET` set).
- **Google OAuth login** (new): "Sign in with Google" on `/admin/login`, implemented directly
  against Google's OAuth2 endpoints (`lib/auth/google.ts`, `/api/auth/google`,
  `/api/auth/google/callback`) — no extra dependency, same session-cookie mechanism as the
  credentials flow. New Google sign-ins default to the `user` role; an existing admin
  promotes them to `editor`/`admin` the same way the first admin account is created. Needs
  `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (from Google Cloud Console) in `.env.local` — the
  button shows a clear "not configured" error on `/admin/login` until then, rather than
  failing silently.
- A single reusable **SEO tool-page template** (`components/ToolPageTemplate.tsx`) that
  renders H1, intro, how-to-use, formula, features, use cases, FAQ (with FAQPage JSON-LD),
  breadcrumbs (with BreadcrumbList JSON-LD), related tools, and last-updated/author/source —
  driven entirely by data, per-tool components are only the interactive widget.
- A typed content model (`types/tool.ts`) that both the static seed file and the Mongoose
  `Tool` model conform to, so tools can move from hardcoded seed data to admin-managed DB
  content later without changing any page.
- Dynamic routes: `/[category]` (category landing page) and `/[category]/[slug]` (tool page),
  statically generated at build time (`generateStaticParams`) for speed and SEO.
- 104 **fully working, real** tools (not placeholders):
  - Percentage, Age, Discount, BMI, EMI, GST, Simple Interest, Compound Interest, SIP, Profit
    Margin, Ratio, Average, Fraction, Date Difference, Time, Break-Even, Fuel Cost, Pace, Unit
    Price, Markup, Random Number, Investment Return, Salary, Electricity Bill, Tip, Speed
    calculators (`calculators`)
  - CGPA to Percentage, Percentage to CGPA, Attendance Calculator, Required Attendance
    Calculator, GPA Calculator, Exam Countdown, Study Time Calculator, Exam Score Calculator
    (`students`)
  - Word Counter, Case Converter, Remove Duplicate Lines, Number to Words, Text Reverser, Find
    and Replace Tool, Text Sorter, Text Extractor (`text`)
  - JSON Formatter, Base64 Encoder/Decoder, UUID Generator, URL Encoder/Decoder, Regex Tester,
    Unix Timestamp Converter, HEX↔RGB Color Converter, Password Generator, Hash Generator, CSV
    to JSON, JWT Decoder, HTML Entity Encoder/Decoder, Lorem Ipsum Generator, Random String
    Generator, Markdown Previewer, HTML Formatter, CSS Formatter, SQL Formatter (`developer`)
  - Celsius↔Fahrenheit, Length, Weight, Speed, Data Storage, Area, Volume, Pressure,
    Frequency, Energy Converters (`converters`)
  - Image Compressor, Image Resizer, Image Format Converter, Favicon Generator, Image
    Dimension & File Size Checker, Social Media Image Resizer — real client-side processing
    via the Canvas API (`image`)
  - JPG/PNG to PDF, Merge PDF, Split PDF, Rotate PDF, PDF Watermark Tool, PDF Metadata Viewer,
    PDF Page Organizer, Compress PDF — real client-side PDF processing via
    jsPDF/pdf-lib/pdfjs-dist (`pdf`)
  - Meta Tag Generator, SERP Snippet Preview, UTM Builder, URL Slug Generator, Robots.txt
    Generator, FAQ Schema Generator, Keyword Density Checker, Breadcrumb Schema Generator,
    Open Graph Generator, Canonical URL Generator, Hreflang Generator, .htaccess Redirect
    Generator, Twitter Card Generator, Organization Schema Generator, Local Business Schema
    Generator, Heading Analyzer (`seo`)
  - AI Text Summarizer, AI Email Generator, AI Text Rewriter, AI Bullet Point Generator — see
    the AI Tools section below for how these work with no key configured (`ai`)
- **Guides subsystem**: a second content type alongside tools — `types/guide.ts` +
  `lib/models/Guide.ts` (DB-ready, same pattern as `Tool`) + `data/guides.ts` (10 real,
  written guides covering calculators, students, image, PDF, and developer topics — the spec
  names ~16 example guide topics in §17 and only 3 existed until this pass) + `/guides` index
  and `/guides/[slug]` pages with Article JSON-LD and related-tool links, included in the
  sitemap.
- **Student Info Hub** (new): the content-management architecture for exams, scholarships,
  admissions, and government jobs — `types/student-info.ts` + `lib/models/StudentInfo.ts` +
  full admin CRUD at `/admin/student-info` + public listing pages at
  `/students/hub/[exam|scholarship|admission|job]`. Deliberately shipped with **zero seed
  data**: every item requires an `officialSourceUrl` and a `lastVerified` date before it can
  be marked "published" (the model enforces the source URL as required), so nothing publishes
  without a citable, editor-checked source. An empty section shows a clear "nothing published
  yet" state rather than fabricated placeholder content — see the original spec's own
  instruction never to publish unverified exam/scholarship/job information.
- **Analytics** (new): GA4 loads conditionally via `components/analytics/GoogleAnalytics.tsx`
  (only if `NEXT_PUBLIC_GA_ID` is set) and `lib/analytics/track.ts` exposes the exact event
  set the spec calls for (`tool_used`, `tool_completed`, `download_clicked`, `copy_clicked`,
  `search_performed`, `category_clicked`, `guide_clicked`) as typed, no-op-safe helpers.
  Wired into the search box, category grid, guides list, every tool page (`tool_used` on
  view), and as a reference pattern into the JSON Formatter (`copy_clicked`) and Image
  Compressor (`download_clicked`) — copy the same one-line pattern into any other tool's
  copy/download button.
- **Tests**: Vitest + React Testing Library, `npm test` to run. 293 tests across 21
  files covering: tool/guide data integrity (no duplicate slugs, no dead `relatedTools`
  links, every `component` registered, SEO field length limits — this caught and fixed two
  real dead links during development), calculator math against known reference values
  (percentage, BMI, EMI, CGPA, attendance edge cases), JSON Formatter error handling, sitemap
  correctness (indexable filtering, no duplicates, noindex legal pages excluded), analytics
  no-op safety, ad-slot conditional rendering, rate limiter behavior, a per-tool
  accessibility check (100 tests, count-based — every field labeled, not just "some labeling
  present somewhere in the file") and a per-tool analytics-coverage check (100 tests), the
  SEO draft generator, and mocked API integration tests for the admin tools, login, and
  contact routes.
- **AdSense-ready ad slots** (new): `components/ads/AdSlot.tsx` renders **nothing** in
  production until `NEXT_PUBLIC_ADSENSE_CLIENT` + a matching per-position slot ID are set —
  no placeholder clutter ships to real users by default, matching the spec's own instruction
  not to launch as an "ad farm." Slots are placed only where the spec's own placement rules
  (§24) allow: below a tool's result (never overlapping its controls), between content
  sections, and within guide content — never over controls, never styled to look like a
  download button. Set `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true` locally to see labeled
  placeholder boxes at every slot while reviewing layout.
- Auto-generated `/sitemap.xml` and `/robots.txt` (Next.js conventions, `app/sitemap.ts` /
  `app/robots.ts`) — only `indexable: true` tools are included in the sitemap.
- Per-page metadata (title, description, canonical, OG, Twitter card, robots directive)
  generated from each tool record.
- A homepage with hero, live client-side search, category grid, and tool grid.
- `/api/search` route for server-side search.
- Mongoose models (`lib/models/Tool.ts`, `lib/models/User.ts`) and a cached DB connection
  helper (`lib/db/connect.ts`), matching the same shape as the seed data — ready to wire up
  once you connect MongoDB Atlas.

- **Security & reliability**: HTTP security headers (`X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) set globally via
  `next.config.ts`; a dependency-free in-memory rate limiter (`lib/rate-limit.ts`, documented
  single-instance limitation and the Redis upgrade path for multi-instance production)
  applied to `/api/auth/login` (5 attempts / 15 min, keyed by IP+email) and `/api/search` (60
  req/min by IP); a custom `/app/not-found.tsx` 404 page with search and category nav (spec
  §33 explicitly requires one); and a global `/app/error.tsx` boundary so an unexpected error
  never surfaces a raw stack trace to a visitor (spec §30). Also fixed a real bug found during
  this pass: credentials login for a Google-only account (no `passwordHash`) would have thrown
  instead of returning a normal "invalid email or password."
- **Performance** (new): fixed a real bug where the site's font-family fell back to plain
  Arial for every visitor — `globals.css` referenced `--font-geist-sans`/`--font-geist-mono`
  CSS variables that nothing defined, left over from the original `create-next-app` scaffold
  after the layout was rewritten early in this project, silently dead the whole time. Replaced
  with an explicit system-font stack (`-apple-system`, Segoe UI, Roboto, etc.) — zero network
  requests, zero layout shift, matches each visitor's OS natively, and is faster than even a
  self-hosted Google Font for a utility-first site like this. Also removed a
  `prefers-color-scheme: dark` override that flipped only the `<body>` background/text to
  dark colors while every component's Tailwind classes stayed hardcoded light — contradicted
  the spec's own "light theme" requirement (§14) and would have rendered as a broken
  half-dark page for any visitor with a dark OS preference, not an intentional dark mode.
  Confirmed the dynamic-import code-splitting in `components/tools/registry.ts` is working
  as intended (each tool's JS is its own chunk, not bundled into every page's initial load),
  and added `decoding="async"` to the two raw `<img>` previews to avoid blocking the main
  thread on image decode.
- **Trust/legal pages** (new): fixed a real gap — the spec explicitly requires About, Contact,
  Privacy Policy, Terms & Conditions, Disclaimer, Cookie Policy, and FAQ pages (§2, and again
  as E-E-A-T signals in §19), and none of them existed until this pass. All seven are now
  built and linked from the footer: `/about`, `/contact` (with a working form — POSTs to
  `/api/contact`, rate-limited, currently logs server-side since no email service is wired up
  yet, documented in the route), `/faq` (with FAQPage JSON-LD), and `/privacy-policy`,
  `/terms`, `/disclaimer`, `/cookie-policy` as genuine, complete template content — each
  flagged with an honest "have a lawyer review this" notice rather than presented as
  ready-to-ship legal copy. The Cookie Policy specifically documents the cookies this codebase
  actually sets (`toolhub_session`, `toolhub_oauth_state`, conditional GA/AdSense), not generic
  boilerplate. The four legal template pages are marked `noindex` (unmodified legal templates
  are boilerplate/duplicate-content-prone) and correctly excluded from the sitemap per the
  spec's own "no noindex URLs in the sitemap" rule; About/Contact/FAQ are indexable and
  included.
- **Compress PDF** (new, `pdf` category): the one genuinely harder PDF tool — `pdf-lib` alone
  can't re-encode embedded images, so real compression needs page rasterization. Uses
  `pdfjs-dist` to render each page to a canvas, recompresses it as JPEG at a quality level
  you choose, and reassembles the result with `jsPDF`. Works especially well on scanned or
  image-heavy PDFs. Honestly discloses the real tradeoff on the tool page itself: output text
  is part of the rasterized image, not selectable/searchable text like the original — this
  isn't the right tool for a text-heavy document you need to keep searchable.
- **100 tools reached**: 9 more tools added this pass across calculators (Electricity Bill,
  Tip, Speed) and students (Percentage to CGPA, Required Attendance, Exam Countdown, Study
  Time, Exam Score) plus Compress PDF above — crossing the spec's original 100+ tool target,
  verified by an exact count (`grep -c "slug:"` on `data/tools.ts`), not an approximation.
- **Accessibility audit deepened**: the original accessibility regression test only checked
  "does this file have *any* labeling source anywhere" — which let files through where *some*
  fields were labeled and others weren't. Re-auditing with a proper per-file field-count vs
  label-count comparison found **8 more tools with partial labeling gaps**
  (`ColorConverter`, `PaceCalculator`, `RobotsTxtGenerator`, `FindReplaceTool`,
  `HtaccessRedirectGenerator`, `LocalBusinessSchemaGenerator`, `RemoveDuplicateLines`,
  `UtmBuilder`) — every field in every one is now labeled, and the regression test itself was
  strengthened to catch this class of gap (count comparison, not presence check) so it can't
  recur silently.
- **AI Tools section built** (new, closes the last gap): rather than wait indefinitely for a
  provider decision, this uses a sensible default — a provider-agnostic client
  (`lib/ai/client.ts`) supporting both OpenAI-compatible chat completions (covers OpenAI,
  Groq, Together, OpenRouter, and most others sharing that request format) and Anthropic's
  native Messages API, selected via `AI_PROVIDER` and configured with `AI_API_KEY`,
  `AI_MODEL`, `AI_API_BASE_URL`. A single rate-limited route (`/api/ai/generate`, 15 req/hour
  — AI calls cost money per request, unlike the other rate limits in this project) dispatches
  by a `tool` key to per-tool system prompts. Four real tools: AI Text Summarizer, AI Email
  Generator, AI Text Rewriter, AI Bullet Point Generator — all built on a shared
  `AiToolBase` component (input, submit, copy-to-clipboard, analytics) so adding another AI
  tool is a 10-line wrapper, same pattern as everything else in this project. With no
  `AI_API_KEY` set, every AI tool shows a clean "not configured" message (same pattern as the
  AdSense/Google OAuth "not configured" states elsewhere) instead of failing — nothing here
  makes a network call, spends money, or breaks until you add a key. Covered by tests
  (`tests/api/ai-generate.test.ts`, `tests/lib/ai-client.test.ts`) that mock the provider
  call, so they verify routing, validation, rate limiting, and the not-configured path
  without ever hitting a real AI API.
- **DMCA/Content Policy page & HTML sitemap** (new): `/dmca` fills the last named page from
  §2's list (noindex, same template-content pattern as the other legal pages). `/sitemap`
  adds a human-readable HTML page listing every category, tool, and guide — distinct from the
  machine-readable `/sitemap.xml`, which the spec's nav also lists as a separate item.
- **Analytics coverage completed** (new): the `analytics.copyClicked`/`downloadClicked`
  pattern from the Analytics section above was previously wired into only 2 of 96 tools as a
  reference example. It's now applied to **all 33 tools** that have a copy-to-clipboard or
  file-download action — every "Copy" button and every downloadable result now fires the
  right event. A new regression test (`tests/data/analytics-coverage.test.ts`, 91 sub-tests)
  asserts every tool component with a copy/download action calls `analytics.*`, so newly
  added tools can't silently skip tracking.
- **Keyword-cluster management** (new): a `Keyword` model + full admin CRUD at
  `/admin/keywords` (spec §26) — tracks keyword, cluster, category, search intent, priority,
  country/language, status (research/planned/published/needs-update/no-longer-relevant),
  target page, notes, and optional search volume/competition/CPC fields populated later from
  external keyword research tools (never fabricated). The admin list groups entries by
  cluster.
- **SEO auto-draft on tool creation** (new): spec §39 calls for auto-generating a draft
  (slug, meta title/description, H1, keyword) when an admin adds a new tool, with mandatory
  review before publishing. `lib/seo-draft.ts` implements this as a small deterministic,
  template-based function — not an AI call — wired into a "Generate SEO draft" button on the
  admin tool-creation form. Deterministic on purpose: an editor can audit exactly why each
  field has its value, unlike an opaque model output, and every new tool still defaults to
  "draft" status regardless, so nothing publishes without a human clicking publish.
- **API/integration tests** (new): a live MongoDB isn't reachable from this sandboxed build
  environment, so these mock the DB/model layer and exercise the actual route handlers —
  `tests/api/admin-tools.test.ts` (auth guards return 401/403 correctly, validation, duplicate
  handling, admin-only delete), `tests/api/login.test.ts` (validation, generic error for both
  unknown accounts and Google-only accounts so login never reveals which case applies, wrong
  password, session cookie set on success, rate limiting), and `tests/api/contact.test.ts`
  (validation, rate limiting) — all against the real route code and the real in-memory rate
  limiter, not simulated behavior.
- **Accessibility**: fixed a real, widespread gap — **28 of 96 tools had their primary
  form field(s) with no accessible name at all** (relying on placeholder text only, which
  isn't a substitute for a label). Every tool's inputs, selects, and textareas now have a
  `<label>` or `aria-label`; icon-only buttons (↑/↓ reorder, × remove) now have descriptive
  `aria-label`s; the search box got a proper `role="search"`, an associated label, a
  `role="listbox"`/`role="option"` results pattern, and an `aria-live` region announcing
  result counts to screen readers; a skip-to-content link and `<nav aria-label>` landmarks
  were added to the root layout; low-contrast `text-gray-400` (fails WCAG AA) was bumped to
  `text-gray-500` (passes) sitewide; and a global `:focus-visible` outline was added as a
  safety net for keyboard users on inputs styled with `focus:outline-none`. A regression test
  (`tests/data/accessibility.test.ts`) now asserts every tool component's form fields stay
  labeled, so this class of bug can't silently reappear as new tools are added.

## Scope & what's next

The original spec asks for ~100+ tools, full auth + role-based admin panel, an AI-generation
pipeline for SEO drafts, PDF/image server processing, exam/scholarship/job content management,
and more. That's realistically weeks of work, and generating it all at once — without you
reviewing each piece — would produce exactly the kind of thin, unreviewed content the spec
itself warns against (see its own §37, "Search Engine Quality Protection").

This scaffold gives you the real architecture so the rest is **additive, not architectural**:

1. **Add more tools** — each one is: a data record in `data/tools.ts` (written content, not
   filler) + a small client component in `components/tools/` + one line in
   `components/tools/registry.ts`. No routing or SEO code needed per tool. (Auth + admin CRUD
   is done — see above.)
2. **Add more guides** — a data record in `data/guides.ts` following `types/guide.ts`. Routing,
   metadata, and sitemap entries are automatic, same pattern as tools.
3. **Move tools/guides from seed to DB** — the admin panel already reads/writes MongoDB `Tool`
   records. To fully switch over: migrate `data/tools.ts`/`data/guides.ts` into MongoDB (a
   one-off script using `Tool.insertMany(tools)` / `Guide.insertMany(guides)`) and swap the
   lookup functions in `data/tools.ts`/`data/guides.ts` for DB queries.
4. **AI tools section** — built, see above. To activate: set `AI_API_KEY` (and optionally
   `AI_PROVIDER`, `AI_MODEL`, `AI_API_BASE_URL`) in `.env.local`. Add another AI tool by
   adding a system prompt to `SYSTEM_PROMPTS` in `app/api/ai/generate/route.ts` and a
   `<AiToolBase toolKey="..." .../>` wrapper component, same pattern as the four already
   there.
5. **Populate the Student Info Hub** — the architecture is done (see above); an editor with
   `admin` or `editor` role logs into `/admin/student-info` and adds real, sourced entries.
   This is intentionally a content task, not a code task.
6. **Extend analytics/test coverage** — the patterns are established (see above); apply the
   same `analytics.copyClicked`/`downloadClicked` one-liner to remaining tools' copy/download
   buttons, and add tests for new tools/guides as they're added.
7. **Turn on real AdSense ads** — the placement architecture is done (see below); apply for
   AdSense once the site has enough original content and organic traffic (per the spec's own
   §24 guidance not to launch as an "ad farm"), then set the env vars to activate the slots
   already placed in the layout.

## Adding a new tool

1. Add a record to `tools` in `data/tools.ts` following the `ToolRecord` shape in
   `types/tool.ts`. Write real intro/FAQ content — don't duplicate another tool's text with
   keywords swapped.
2. Build the interactive part as a small client component in `components/tools/YourTool.tsx`.
3. Register it: add `YourTool: dynamic(() => import("./YourTool"))` to
   `components/tools/registry.ts`.
4. That's it — the page, metadata, sitemap entry, JSON-LD, and related-tools links are all
   generated automatically from the record.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in MONGODB_URI and NEXTAUTH_SECRET
npm run dev
```

## Admin panel

1. Set `MONGODB_URI` (a MongoDB Atlas connection string) and `NEXTAUTH_SECRET` (any long
   random string) in `.env.local`.
2. Create the first admin user:
   ```bash
   npx tsx scripts/create-admin.ts you@example.com "Your Name" "a-strong-password"
   ```
3. Visit `/admin/login` and sign in. `/admin/tools` lists tools stored in MongoDB (empty until
   you add some, or migrate the seed data — see "Scope & what's next" above), `/admin/tools/new`
   creates one, and each row's Edit link opens `/admin/tools/[slug]/edit`.
4. Roles: `admin` can create/edit/delete; `editor` can create/edit but not delete; `user` has
   no admin access. `proxy.ts` enforces this on every `/admin/*` route.
5. Optional — Google sign-in: create OAuth credentials in
   [Google Cloud Console](https://console.cloud.google.com/apis/credentials), set the
   authorized redirect URI to `<NEXT_PUBLIC_SITE_URL>/api/auth/google/callback`, and put the
   client ID/secret in `.env.local`. New Google sign-ins default to the `user` role — promote
   them to `editor`/`admin` directly in MongoDB (`db.users.updateOne(...)`) until an admin UI
   for user management exists.

## Production build

```bash
npm run build
npm start
```

## Tests

```bash
npm test          # run once
npm run test:watch # watch mode
```

## Environment variables

See `.env.example`. Only `NEXT_PUBLIC_SITE_URL` is used by the current code (for metadata and
sitemap URLs); the rest are placeholders for the auth/DB/AI/currency work described above.
