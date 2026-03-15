SEO Audit Report — TowLoans

  Site type: Tow truck financing lead-gen site (Next.js 16, App Router)
  Pages audited: Homepage, /rollback-financing, /tow-truck-calculator, /brand

  ---
  Executive Summary

  The site has solid on-page SEO on the newer pages (rollback-financing, calculator) but is missing fundamental crawlability
  infrastructure and has critical issues in the root layout and homepage that would prevent effective indexation.

  Top 5 priorities:
  1. Missing robots.txt and XML sitemap
  2. Root layout has boilerplate metadata ("Create Next App")
  3. No metadataBase / no canonical URLs
  4. Homepage FAQ schema outputs question text instead of answers for JSX entries
  5. No Open Graph tags on homepage

  ---
  1. Crawlability & Indexation

  ┌───────────────────────┬──────────┬────────────────────────────────────────────────────────────────────────────────────┐
  │         Issue         │  Impact  │                                        Fix                                         │
  ├───────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ No robots.txt         │ Critical │ Create app/robots.ts exporting default rules + sitemap URL                         │
  ├───────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ No XML sitemap        │ Critical │ Create app/sitemap.ts listing all indexable pages                                  │
  ├───────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ No metadataBase in    │ High     │ Add metadataBase: new URL('https://towloans.com') to root layout metadata —        │
  │ root layout           │          │ required for canonical URLs and OG images to resolve correctly                     │
  ├───────────────────────┼──────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ No canonical tags     │ High     │ Setting metadataBase + alternates: { canonical: './' } per page will auto-generate │
  │ anywhere              │          │  these                                                                             │
  └───────────────────────┴──────────┴────────────────────────────────────────────────────────────────────────────────────┘

  2. Technical Foundations

  ┌───────────────────────────────────┬──────────┬─────────────────────────────────────────────────────────────────────────┐
  │               Issue               │  Impact  │                                   Fix                                   │
  ├───────────────────────────────────┼──────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Root layout title/description is  │          │ Change to branded defaults: title: { default: "TowLoans | Tow Truck     │
  │ boilerplate (layout.tsx:15-18)    │ Critical │ Financing", template: "%s | TowLoans" } with a real description. This   │
  │                                   │          │ is the fallback for any page without its own metadata                   │
  ├───────────────────────────────────┼──────────┼─────────────────────────────────────────────────────────────────────────┤
  │ No favicon detected in /public or │ Medium   │ Add app/icon.svg or app/favicon.ico                                     │
  │  app directory                    │          │                                                                         │
  ├───────────────────────────────────┼──────────┼─────────────────────────────────────────────────────────────────────────┤
  │ No custom 404 page                │ Low      │ Create one with internal links to keep users/crawlers on-site           │
  │ (app/not-found.tsx)               │          │                                                                         │
  ├───────────────────────────────────┼──────────┼─────────────────────────────────────────────────────────────────────────┤
  │ No error.tsx boundary             │ Low      │ Add for graceful error handling                                         │
  └───────────────────────────────────┴──────────┴─────────────────────────────────────────────────────────────────────────┘

  3. On-Page SEO

  ┌──────────────────────────────────────┬────────┬───────────────────────────────────────────────────────────────────────┐
  │                Issue                 │ Impact │                                  Fix                                  │
  ├──────────────────────────────────────┼────────┼───────────────────────────────────────────────────────────────────────┤
  │ Homepage missing Open Graph tags     │ High   │ Add openGraph: { title, description, type: 'website' } — the rollback │
  │ (app/page.tsx:139-143)               │        │  page already does this correctly                                     │
  ├──────────────────────────────────────┼────────┼───────────────────────────────────────────────────────────────────────┤
  │ Homepage FAQ schema is broken        │        │ text: typeof faq.answer === "string" ? faq.answer : faq.question      │
  │ (app/page.tsx:242-243)               │ High   │ outputs the question as the answer for all JSX FAQ entries (5 of 6).  │
  │                                      │        │ Follow the rollback page's schemaAnswer pattern instead               │
  ├──────────────────────────────────────┼────────┼───────────────────────────────────────────────────────────────────────┤
  │ Homepage footer uses <a> for         │        │ Convert to <Link> (the rollback page footer already does this         │
  │ internal routes                      │ Medium │ correctly). Affects prefetching and client-side nav                   │
  │ (app/page.tsx:378-471)               │        │                                                                       │
  ├──────────────────────────────────────┼────────┼───────────────────────────────────────────────────────────────────────┤
  │ Privacy/Terms links are href="#"     │ Medium │ These are dead links. Create real pages or remove them                │
  │ (app/page.tsx:519)                   │        │                                                                       │
  └──────────────────────────────────────┴────────┴───────────────────────────────────────────────────────────────────────┘

  4. Content & Schema

  ┌───────────────────────────────────────────────────────────────────────┬────────┬──────────────────────────────────────┐
  │                                 Issue                                 │ Impact │                 Fix                  │
  ├───────────────────────────────────────────────────────────────────────┼────────┼──────────────────────────────────────┤
  │ No Organization schema on homepage                                    │ Medium │ Add JSON-LD with business name,      │
  │                                                                       │        │ logo, contact info, sameAs links     │
  ├───────────────────────────────────────────────────────────────────────┼────────┼──────────────────────────────────────┤
  │                                                                       │        │ This is a product/service page, not  │
  │ Rollback page uses Article schema                                     │ Low    │ an article. Consider                 │
  │ (rollback-financing/page.tsx:198-216)                                 │        │ FinancialProduct or WebPage schema   │
  │                                                                       │        │ instead                              │
  ├───────────────────────────────────────────────────────────────────────┼────────┼──────────────────────────────────────┤
  │ Multiple FAQ links point to pages that don't exist (e.g.,             │        │ These will 404. Either build the     │
  │ /resources/tow-truck-roi, /zero-down-tow-truck-financing,             │ Medium │ pages or remove the links            │
  │ /resources/how-to-start-a-towing-business)                            │        │                                      │
  └───────────────────────────────────────────────────────────────────────┴────────┴──────────────────────────────────────┘

  5. What's Working Well

  - Rollback page has proper OG tags, dual JSON-LD (FAQ + Article), and schemaAnswer pattern
  - Calculator page has strong title tag with keyword + value prop
  - Brand page correctly uses robots: { index: false, follow: false }
  - Good heading hierarchy across all pages
  - Images use next/image with alt text throughout
  - Skip-to-content links for accessibility
  - lang="en" on <html> tag

  ---
  Prioritized Action Plan

  Phase 1 — Critical (blocks indexation):
  1. Add metadataBase to root layout
  2. Fix root layout title/description
  3. Create app/robots.ts
  4. Create app/sitemap.ts

  Phase 2 — High impact:
  5. Add OG tags to homepage
  6. Fix homepage FAQ schema (add schemaAnswer field to each FAQ item)
  7. Add Organization JSON-LD to homepage
  8. Add canonical URLs

  Phase 3 — Quick wins:
  9. Convert homepage footer <a> to <Link>
  10. Add favicon
  11. Create not-found.tsx
  12. Fix or remove Privacy/Terms placeholder links

  Phase 4 — Content gaps:
  13. Build out linked-but-missing pages (or remove the links)
  14. Consider switching rollback page from Article to more appropriate schema type