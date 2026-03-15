# Plan: Build `/rollback-financing` Equipment Pillar Page

## Context

Per the SEO sitemap (`major-seo.md`), `/rollback-financing` is a Phase 1 priority — ~220 monthly searches, KD 0, zero real competition. The homepage and calculator are done; this is the first equipment pillar page. Its structure will serve as the template for `/wrecker-financing` and `/rotator-financing`.

## Target Keywords

| Keyword | Volume | KD |
|---------|--------|----|
| rollback financing | 50 | 0 |
| rollback tow truck financing | 50 | 0 |
| lease rollback tow truck | 60 | 0 |
| rollback tow truck for lease | 60 | 0 |
| flatbed tow truck financing | — | — |

## File to Create

**`app/rollback-financing/page.tsx`** — Server component, follows homepage-01 patterns.

## Page Structure (10 sections)

### 1. StickyNav
- **Reuse:** `<StickyNav />` from `components/sections/nav/sticky-nav-rm`
- No changes needed — nav already has `/rollback-financing` link

### 2. Hero — "Rollback & Flatbed Financing"
- **Reuse:** `<HeroLeadGen />` with rollback-specific config
- Headline: "Rollback Financing. Pre-Approved Before You Find the Truck."
- Subheadline: Rollback-specific value prop (most versatile truck, handles cars/SUVs/light trucks)
- CTA: "Get Pre-Approved for a Rollback" → `#pre-approve`
- Phone link, trust badges (30-sec approval, no credit impact, $0 down available)
- Hero image: rollback truck photo from `/public/` (e.g., truck-3.jpg or similar)

### 3. Why Rollbacks — Equipment benefits section (NEW inline section)
- Headline: "The Most Versatile Truck in Your Fleet"
- 3-4 benefit cards in a grid:
  - Handles cars, SUVs, light trucks
  - Most popular first truck for new operators
  - Lower insurance than wreckers/rotators
  - Holds resale value
- Internal link: `/resources/how-much-does-a-tow-truck-cost` → "How much does a rollback cost?"

### 4. Programs — Rollback-specific financing options
- **Reuse:** `<ProgramCards />` with rollback-framed config
- Cards: Zero down rollback, Rollback leasing, Deferred payments, Used rollback
- Internal links woven in: `/zero-down-tow-truck-financing`, `/tow-truck-leasing`, `/deferred-payment-tow-truck-financing`, `/used-tow-truck-financing`

### 5. Brand Marquee
- **Reuse:** `<BrandMarquee />` — no changes

### 6. How It Works
- **Reuse:** `<HowItWorks />` with `HOW_IT_WORKS_CONFIG` — same 3-step process

### 7. Calculator Teaser — Rollback-specific
- Adapted from homepage-01's calculator teaser section
- Headline: "See Your Rollback Payment Before You Apply"
- Link to `/tow-truck-calculator?type=rollback`
- Internal link: `/resources/tow-truck-lease-vs-loan` → "Should you lease or finance your rollback?"

### 8. Other Equipment — Cross-link section (NEW inline section)
- Headline: "Not Sure a Rollback Is Right?"
- 3 cards linking to: `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing`
- Internal link: `/resources/section-179-tow-truck` → "Write off your rollback this year"

### 9. FAQ — Rollback-specific
- Reuse the FAQ accordion component from homepage-01 (`app/homepage-01/FAQ.tsx`)
- 4-6 rollback-specific questions (from PAA data in SEO spec):
  - How long can you finance a tow truck?
  - How much does a rollback tow truck cost?
  - Can you lease a rollback tow truck?
  - What credit score do I need to finance a trailer?
- FAQPage JSON-LD schema
- Answers include internal links where natural

### 10. Final CTA
- Adapted from homepage-01 pattern
- Headline: "Ready to Add a Rollback to Your Fleet?"
- CTA: "Get Pre-Approved — It Takes 30 Seconds" → `#pre-approve`
- Phone number + hours

### 11. Footer
- Copy footer pattern from homepage-01 (same links, same structure)

## SEO Metadata

```ts
export const metadata: Metadata = {
  title: "Rollback & Flatbed Tow Truck Financing | TowLoans",
  description: "Finance a rollback or flatbed tow truck with fast pre-approval, $0 down available, and terms built for towing operators. See your payment in 30 seconds.",
};
```

Plus Article + FAQPage JSON-LD schemas.

## Internal Links Checklist (from SEO spec)

| Destination | Anchor Text | Placement |
|-------------|-------------|-----------|
| `/` | "Tow truck financing" | Nav (automatic) |
| `/wrecker-financing` | "Need a wrecker instead?" | Cross-links section |
| `/rotator-financing` | "Looking at rotators?" | Cross-links section |
| `/tow-truck-leasing` | "Explore rollback leasing options" | Programs section |
| `/used-tow-truck-financing` | "Financing a used rollback" | Programs section |
| `/tow-truck-calculator` | "Calculate your rollback payment" | Calculator teaser |
| `/resources/how-much-does-a-tow-truck-cost` | "How much does a rollback cost?" | Benefits section |
| `/resources/tow-truck-lease-vs-loan` | "Should you lease or finance your rollback?" | Calculator teaser |
| `/resources/section-179-tow-truck` | "Write off your rollback this year" | Cross-links or FAQ |
| `/zero-down-tow-truck-financing` | "Zero down rollback financing" | Programs section |

## Components Reused (no modifications)

| Component | Import Path |
|-----------|-------------|
| `StickyNav` | `@/components/sections/nav/sticky-nav-rm` |
| `HeroLeadGen` | `@/components/sections/heroes/hero-lead-gen` |
| `ProgramCards` | `@/components/sections/page/program-cards` |
| `BrandMarquee` | `@/components/sections/page/brand-marquee` |
| `HowItWorks` | `@/components/sections/page/how-it-works` |
| `MiniROI` | `@/components/sections/page/mini-roi` |
| `FAQ` (accordion) | `@/app/homepage-01/FAQ` (or extract to shared) |
| `JsonLd` | `@/components/shared/JsonLd` |

## New Code (inline in page.tsx)

- Rollback benefits grid (section 3) — ~40 lines of JSX
- Calculator teaser (section 7) — adapted from homepage-01, ~30 lines
- Cross-links section (section 8) — ~30 lines
- FAQ data array + schema — ~40 lines
- Final CTA (section 10) — adapted from homepage-01, ~30 lines
- Footer — copied from homepage-01, ~60 lines

Total: ~1 new file, ~300-400 lines, entirely server component.

## Verification

1. `npm run dev` — visit `/rollback-financing`, confirm all sections render
2. `npm run build` — no compile errors
3. Click every internal link — confirm navigation works (pages that don't exist yet will 404, that's expected)
4. Check mobile responsiveness (375px, 768px, 1280px)
5. View page source — confirm JSON-LD renders correctly
6. Confirm StickyNav highlights correctly on this page


1.