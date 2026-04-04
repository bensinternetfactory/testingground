Build the Zero-Down Tow Truck Financing Page (Blog Layout with Sticky Sidebar)
                                     
 Context

 The route /zero-down-tow-truck-financing is currently a stub rendering only a title via MinimalNavPage. We have a finished SEO content brief
 at plans/zero-down/seo-content.md (~200 lines of long-form copy, a dual-path qualification scheme, a comparison table, a calculator promo, 7
 FAQs, a final CTA, and internal links).

 Goal: Expand the stub into a content-heavy SEO page that reads like a blog post but uses a sticky sidebar (TOC + persistent CTA card) on
 desktop and 2 full-bleed CTA bands that break up the article body. Reuse existing shared components for
 nav/hero/FAQ/closing-CTA/related-links/footer, and add page-local article components for the prose, qualification paths, comparison table,
 etc.

 Approach: This is a program page (not an equipment page), so we don't use EquipmentFinancingPageShell (its slug union forbids this slug and
 its sections don't match zero-down content). Instead, compose directly (homepage-style) using a new BlogLayout wrapper that provides the 2-col
  article + sticky sidebar structure.

 ---
 Desktop Layout Architecture (≥ lg)

 ┌─────── STICKY NAV ────────┐
 │     (full width)          │
 ├───────────────────────────┤
 │      HERO (full width)    │
 ├───────────────────────────┤
 │  BlogLayout wrapper       │
 │   ┌─────────┐ ┌─────────┐ │
 │   │ ARTICLE │ │ STICKY  │ │
 │   │ (680px) │ │ SIDEBAR │ │
 │   │         │ │ (300px) │ │
 │   │ intro   │ │         │ │
 │   │ section │ │  TOC    │ │
 │   │─band1───│ │         │ │
 │   │ section │ │  CTA    │ │
 │   │ section │ │  card   │ │
 │   │─band2───│ │         │ │
 │   │ section │ │         │ │
 │   └─────────┘ └─────────┘ │
 ├───────────────────────────┤
 │  FAQ (full width)         │
 │  CLOSING CTA              │
 │  RELATED LINKS            │
 │  FOOTER                   │
 └───────────────────────────┘

 - Article column: max-w-[680px] (optimal reading width)
 - Sidebar column: lg:w-[300px], sticky top-[calc(var(--nav-height)+24px)]
 - Grid container: max-w-[1080px] mx-auto px-6 (article + gap + sidebar = ~1060px)
 - CTA bands break out of the article column to span viewport width via col-span-full + negative-margin escape

 Mobile (< lg)

 - Sidebar collapses to a single collapsible MobileTocCard rendered at the top of the article (below hero).
 - No persistent sticky CTA card on mobile (the 2 full-bleed CTA bands and final closing-CTA cover mobile conversion).
 - Article flows single-column max-w-full within px-6.

 ---
 Files to Create / Modify

 Modify

 - app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx — replace MinimalNavPage stub with direct composition (skip link →
 StickyNav → Hero → BlogLayout{Article + Sidebar, with 2 inline CTA bands} → FAQ → Closing → RelatedLinks → JSON-LD → Footer).

 Create

 Page files:
 - config.ts — metadata, TOC items, hero config, 7 FAQ items, CTA band configs, closing-CTA config, related-links config, 3 JSON-LD schemas
 (FAQ, Service, Breadcrumb).

 Layout + sidebar primitives (_components/):
 - BlogLayout.tsx — 2-col grid wrapper (lg:grid-cols-[1fr_300px]), renders article + sidebar children with proper spacing and the
 max-w-[1080px] container.
 - ArticleSidebar.tsx — sticky wrapper containing <TableOfContents /> + <SidebarCta />.
 - TableOfContents.tsx — list of anchor links (#business-case, #how-to-qualify, etc.) with muted-style typography. Server component.
 - SidebarCta.tsx — compact CTA card: "Ready to move?" headline + "Pre-approval in 30s / No credit impact" subtext + RippleCtaLink →
 DRAWER_HASH.
 - MobileTocCard.tsx — collapsible details/summary element showing TOC on mobile only (lg:hidden). Server component using native <details> so
 no client JS.
 - InlineCtaBand.tsx — full-bleed dark band (bg-[#101820]) with eyebrow/headline on the left and a filled RippleCtaLink on the right. Uses
 col-span-full -mx-6 lg:-mx-[calc((100vw-1080px)/2+1.5rem)] escape technique. Takes config { message, ctaLabel, ctaHref }.

 Article section components (_components/):
 - ArticleIntro.tsx — opening prose (the 4 intro paragraphs before the first H2). Lead paragraph styled larger (text-xl leading-relaxed).
 - BusinessCaseSection.tsx — H2 "Why Zero Down Is a Business Decision" + prose + <PullQuote> with the math stat + 4-item bulleted list.
 id="business-case" for TOC anchor.
 - QualificationPathsSection.tsx — H2 "How to Qualify for $0 Down" + 2 stacked cards (Path A, Path B), each with label chip + 3-item numbered
 list + explanation prose + closing "Don't fit either? Apply anyway." note. id="how-to-qualify".
 - TruckFlexibilitySection.tsx — H2 "Any Truck. Any Age. Any Seller." + intro prose + 4-up grid (Truck type / Age / Mileage / Seller) with icon
  + title + descriptor. Grid is grid-cols-2 mobile, grid-cols-4 on md+. id="any-truck".
 - PaymentComparisonSection.tsx — H2 "What $0 Down Looks Like in Practice" + example context + responsive comparison table (5 rows × 3 cols on
 desktop; stacks into labeled row pairs on mobile) + follow-up prose + <PullQuote> "The math isn't close." id="the-math".
 - CalculatorPromoSection.tsx — H2 "Run the Numbers on Your Truck" + prose + 4-bullet value list (cash flow, breakeven, payback, profit/tow) +
 RippleCtaLink → /tow-truck-calculator. Slightly accented background. id="calculator".
 - RelatedProgramsSection.tsx — H2 "Pair It With What Works for You" + 3-card grid (Deferred, Fleet, Private-party). Each card: title + short
 body + inline link.

 Article utilities (_components/):
 - PullQuote.tsx — reusable pull-quote / stat callout. Thick left border accent, slightly larger text. Used in BusinessCaseSection and
 PaymentComparisonSection.
 - SectionDivider.tsx — thin horizontal rule between major H2 sections (border-t border-[#E9E9E9] my-12).

 ---
 Reused Components (no changes)

 - StickyNav — components/sections/nav/sticky-nav-rm
 - HeroLeadGen — components/sections/heroes/hero-lead-gen (headline, subhead, CTA, trust badges, image)
 - FaqSection + buildFaqSchema — components/sections/page/faq
 - EquipmentClosingCta — components/sections/page/equipment-closing-cta
 - RelatedLinksStrip — components/sections/page/related-links-strip
 - Footer + FOOTER_CONFIG — components/sections/page/footer
 - JsonLd — components/shared/JsonLd
 - RippleCtaLink — components/ui/ripple-cta-link (used in InlineCtaBand, SidebarCta, CalculatorPromoSection)
 - DRAWER_HASH — components/ui/pre-approval-drawer
 - cn() — lib/utils.ts

 ---
 Page Composition (page.tsx outline)

 <div className="min-h-screen bg-white font-sans">
   <SkipLink />
   <StickyNav />
   <main id="main-content">
     <HeroLeadGen config={zeroDownPageConfig.hero} />

     <BlogLayout>
       {/* ARTICLE COLUMN */}
       <article>
         <MobileTocCard items={zeroDownPageConfig.toc} />
         <ArticleIntro />
         <BusinessCaseSection />
         <InlineCtaBand config={zeroDownPageConfig.ctaBand1} />
         <QualificationPathsSection />
         <SectionDivider />
         <TruckFlexibilitySection />
         <SectionDivider />
         <PaymentComparisonSection />
         <InlineCtaBand config={zeroDownPageConfig.ctaBand2} />
         <CalculatorPromoSection />
         <RelatedProgramsSection />
       </article>

       {/* STICKY SIDEBAR (lg+ only) */}
       <ArticleSidebar toc={zeroDownPageConfig.toc} cta={zeroDownPageConfig.sidebarCta} />
     </BlogLayout>

     <FaqSection config={zeroDownPageConfig.faqSection} />
     <EquipmentClosingCta config={zeroDownPageConfig.closingCta} />
     <RelatedLinksStrip config={zeroDownPageConfig.relatedLinks} />
     <JsonLd data={zeroDownPageConfig.faqSchema} />
     <JsonLd data={zeroDownPageConfig.serviceSchema} />
     <JsonLd data={zeroDownPageConfig.breadcrumbSchema} />
   </main>
   <Footer config={FOOTER_CONFIG} />
 </div>

 ---
 CTA Placement (5 total conversion points)

 ┌─────┬─────────────────────────────────────────────┬────────────────────────────────────┬───────────────────────┐
 │  #  │                  Location                   │             Component              │      Destination      │
 ├─────┼─────────────────────────────────────────────┼────────────────────────────────────┼───────────────────────┤
 │ 1   │ Hero                                        │ HeroLeadGen built-in button        │ DRAWER_HASH           │
 ├─────┼─────────────────────────────────────────────┼────────────────────────────────────┼───────────────────────┤
 │ 2   │ Sticky sidebar (lg+)                        │ SidebarCta                         │ DRAWER_HASH           │
 ├─────┼─────────────────────────────────────────────┼────────────────────────────────────┼───────────────────────┤
 │ 3   │ Between BusinessCase & QualificationPaths   │ InlineCtaBand #1 (full-bleed dark) │ DRAWER_HASH           │
 ├─────┼─────────────────────────────────────────────┼────────────────────────────────────┼───────────────────────┤
 │ 4   │ Between PaymentComparison & CalculatorPromo │ InlineCtaBand #2 (full-bleed dark) │ DRAWER_HASH           │
 ├─────┼─────────────────────────────────────────────┼────────────────────────────────────┼───────────────────────┤
 │ 5   │ Calculator promo                            │ inline RippleCtaLink               │ /tow-truck-calculator │
 ├─────┼─────────────────────────────────────────────┼────────────────────────────────────┼───────────────────────┤
 │ 6   │ Closing CTA                                 │ EquipmentClosingCta built-in       │ DRAWER_HASH           │
 └─────┴─────────────────────────────────────────────┴────────────────────────────────────┴───────────────────────┘

 The 2 "sprinkled" CTAs referenced by the user = bands #3 and #4 (full-bleed interrupt-the-read bands). The sidebar CTA is a bonus persistent
 conversion point on desktop.

 ---
 Table of Contents (TOC anchors)

 • The business case       → #business-case
 • How to qualify          → #how-to-qualify
 • Any truck, any age      → #any-truck
 • The math                → #the-math
 • Run the numbers         → #calculator
 • FAQ                     → #faq

 All anchors use scroll-mt-[calc(var(--nav-height)+24px)] so the sticky nav doesn't cover them on jump.

 ---
 Visual / Styling

 All page conventions preserved:

 - 2xl containment: the outer BlogLayout <section> uses the standard 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200
 2xl:overflow-hidden. Inside it, the max-w-[1080px] article-grid container is centered.
 - Color tokens (from app/globals.css):
   - Dark text #111111, muted #545454
   - Light gray bg #F5F5F5, border #E9E9E9
   - Green accents #22C55E / #15803D (checkmarks, badges)
   - Dark band #101820 (matches TertiaryActionsStrip / EquipmentClosingCta)
 - Cards: rounded-3xl bg-white p-6 md:p-8 shadow-[inset_0_0_0_1px_#E9E9E9]
 - Prose typography:
   - H2: text-3xl md:text-4xl font-semibold tracking-tight text-[#111]
   - Body: text-base md:text-lg leading-relaxed text-[#222]
   - Lead paragraph: text-xl leading-relaxed
   - Bullets: ps-5 list-disc marker:text-[#22C55E]
 - Pull quote: border-l-4 border-[#22C55E] ps-5 py-2 text-lg md:text-xl italic text-[#333]
 - Comparison table: semantic <table> with <thead> / <tbody>. Mobile fallback uses CSS role="table" grid with labeled rows or a simple
 overflow-x-auto wrap.
 - Sidebar CTA card: rounded-2xl bg-[#101820] p-6 text-white with green RippleCtaLink.
 - Inline CTA band: bg-[#101820] text-white py-8 md:py-10, flex layout, white RippleCtaLink with variant="filled" (or custom green styling
 consistent with closing CTA).

 All new components are server components — no "use client" boundary (RippleCtaLink handles its own client interaction). MobileTocCard uses
 native <details><summary> so no JS required.

 ---
 Metadata & Structured Data (in config.ts)

 - title: "Zero Down Tow Truck Financing — Any Truck, Any Age | TowLoans"
 - description: from SEO brief meta description
 - openGraph: title, description, type: "website"

 JSON-LD:
 1. FAQPage — buildFaqSchema(zeroDownFaqs) from components/sections/page/faq/config.ts
 2. Service — name: "Zero Down Tow Truck Financing", provider: TowLoans, areaServed: US, serviceType: "Equipment Financing"
 3. BreadcrumbList — Home → Zero Down Tow Truck Financing

 ---
 Key Existing Utilities to Reuse

 - buildFaqSchema(faqs) — components/sections/page/faq/config.ts:27
 - DRAWER_HASH — components/ui/pre-approval-drawer
 - FOOTER_CONFIG — components/sections/page/footer
 - cn() — lib/utils.ts

 ---
 Verification Plan

 1. TypeScript compile — npm run build passes, no TS errors.
 2. Lint — npm run lint passes.
 3. Dev server on port 3005 — PORT=3005 npm run dev (per CLAUDE.md rule).
 4. Browser validation via agent-browser against http://localhost:3005/zero-down-tow-truck-financing:
   - Page loads with no console errors.
   - Hero renders with headline "Keep Your Cash. Add a Truck. Let It Earn." + CTA + 3 trust badges.
   - On desktop (≥1024px): 2-col blog layout is visible, sidebar has TOC + CTA card, sidebar stays sticky on scroll.
   - On mobile (<1024px): sidebar is hidden, <MobileTocCard> is visible at top of article, clicking <summary> expands TOC.
   - Both InlineCtaBands render full-bleed with dark #101820 background and visible CTA button.
   - Clicking TOC anchors scrolls to correct section with nav offset (scroll-mt).
   - Comparison table is readable on mobile (either scrollable or stacked).
   - FAQ accordion opens/closes on click.
   - Calculator promo CTA routes to /tow-truck-calculator.
   - Closing CTA button opens the pre-approval drawer (or navigates to DRAWER_HASH).
   - Related links strip shows all 8 links.
 5. Responsive check — 375px, 768px, 1024px, 1280px, 1920px. Confirm 2xl:border-x appears at 1536px+.
 6. JSON-LD — 3 <script type="application/ld+json"> tags present (FAQ, Service, Breadcrumb).
 7. Accessibility smoke test — skip link on Tab focus, single <h1> (in hero), TOC anchors resolve, FAQ has aria-expanded, MobileTocCard uses
 native details/summary.

 ---
 Out of Scope

 - No changes to EquipmentFinancingPageShell or its types.
 - No edits to shared-config.ts — zero-down FAQs are page-specific.
 - No new components added to components/sections/page/ — all new section/layout primitives are page-local under _components/.
 - No TOC scroll-spy (active-section highlighting). Anchor jump-to only. Can be added later as a small client component if desired.
 - No changes to other program-page stubs (deferred-payment, fleet, private-party).