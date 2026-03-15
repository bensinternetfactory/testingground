# Rollback Financing Page Rebuild

## Context

The current `/rollback-financing` page is a solid first version but uses a phone-based CTA, generic "Why Operators Use Us" cards, and a content-heavy layout that dilutes conversion focus. The goal is to rebuild it as a lean, 5-section conversion page with a productized pre-approval entry point (bottom sheet drawer with financing slider), a comparison table that makes TowLoans' differentiators undeniable, and production copy written to the brand voice. This page is the first of three equipment financing pages (rollback, wrecker, rotator) and will serve as the template.

---

## Page Structure (Top to Bottom)

1. Hero (HeroConvert with new config)
2. Proof Block (NEW — comparison table)
3. BrandMarquee (existing component)
4. Trust Bridge (NEW — text-only step list)
5. FAQ (existing component, expanded to 8-10 items)
6. Closing CTA (dark background, inline section)
7. Related Links (existing pattern)
8. Footer (existing pattern)

---

## Files to Create

```
components/ui/pre-approval-drawer/
  DrawerContext.tsx          # "use client" — context + provider + hash listener
  PreApprovalDrawer.tsx      # "use client" — drawer shell (sheet on mobile, modal on desktop)
  AmountSlider.tsx           # "use client" — range slider
  config.ts                 # Server-safe constants (min/max/step/default)
  index.ts                  # Barrel exports
  CLAUDE.md                 # Component docs

components/sections/page/proof-block/
  ProofBlock.tsx             # Server component — comparison table
  config.ts                 # Differentiator rows
  index.ts
  CLAUDE.md

components/sections/page/trust-bridge/
  TrustBridge.tsx            # Server component — step list
  config.ts                 # Step data
  index.ts
  CLAUDE.md
```

## Files to Modify

- `app/rollback-financing/page.tsx` — full rewrite with new sections, configs, copy, metadata, schemas, and DrawerProvider wiring

## Existing Components Reused (No Changes)

- `HeroConvert` — `components/sections/heroes/hero-convert-geico/HeroConvert.tsx` (new config only)
- `TileSelector` — same dir (hash CTA pattern works as-is)
- `RippleCtaLink` — `components/ui/ripple-cta-link/RippleCtaLink.tsx`
- `FAQ` — `components/sections/page/faq/`
- `BrandMarquee` — `components/sections/page/brand-marquee/BrandMarquee.tsx`
- `StickyNav` — `components/sections/nav/sticky-nav-rm/StickyNav.tsx`
- `JsonLd` — `components/shared/JsonLd.tsx`

---

## Architecture: Drawer Wiring

**Problem:** Multiple CTAs (some in server components like ClosingCta) must open a single shared drawer.

**Solution:** React Context + URL hash convention.

```
DrawerContext.tsx ("use client")
├── DrawerProvider — wraps children, renders PreApprovalDrawer + DrawerHashListener
├── useDrawer() hook — { isOpen, open, close }
└── DrawerHashListener — on hashchange, if hash === "#get-pre-approved", calls open() and clears hash
```

**Page-level wiring:**
```tsx
// page.tsx (server component)
<DrawerProvider>
  <main>
    <HeroConvert config={heroConfig} />   ← cta.href="#get-pre-approved"
    <ProofBlock />
    <BrandMarquee />
    <TrustBridge />
    <FAQ />
    <ClosingCTA section />                ← RippleCtaLink href="#get-pre-approved"
    <Related Links />
  </main>
</DrawerProvider>
```

**Why this works without modifying any existing component:**
- `TileSelector` already uses `<Link href={cta.href}>`. When `cta.href="#get-pre-approved"`, `buildSelectedHref()` produces `?equipment=light-duty#get-pre-approved` — the hash triggers `DrawerHashListener`.
- `RippleCtaLink` with hash href renders as `<MotionLink href="#get-pre-approved">` which triggers native `hashchange`.
- Server component children pass through `DrawerProvider` via `children` prop (standard RSC pattern).

---

## New Component Specs

### 1. PreApprovalDrawer

**Mobile (<md):** iOS-style bottom sheet
- React portal to `document.body`
- Backdrop overlay (black, opacity 0→0.5)
- Sheet slides up from bottom with spring physics (`damping: 30, stiffness: 300`)
- Drag handle (40px gray pill)
- `drag="y"`, `dragConstraints={{ top: 0 }}`, `dragElastic={{ top: 0, bottom: 0.3 }}`
- Drag-to-dismiss: if velocity > threshold OR drag > 50% height, close with spring; else snap back
- Body scroll lock (`document.body.style.overflow = "hidden"`)
- Escape key closes

**Desktop (md+):** Centered modal
- Backdrop overlay (same)
- Modal card with `scale: 0.95, opacity: 0 → scale: 1, opacity: 1`
- Max width ~480px, centered
- Close button (X) top-right
- Click backdrop to close, Escape to close
- Focus trap within modal

**Shared content (both viewports):**
- Heading: "How much financing do you need?"
- `<AmountSlider />`
- Display formatted value prominently (e.g. `$85,000`)
- "Continue" button → `router.push("/pre-approval")` (no params yet — **NOTE for future:** add query params for subtype + amount when pre-approval page is built)
- `role="dialog"`, `aria-modal="true"`, `aria-label="Pre-approval amount"`

**Reduced motion:** Skip spring/drag animations, instant transitions. Follows `useReducedMotion()` pattern from `HowItWorksAccordion.tsx`.

### 2. AmountSlider

- Native `<input type="range">` for accessibility
- `min={20000}`, `max={500000}`, `step={5000}`
- Default value: `100000`
- Display: `$20,000` to `$500,000+` (when value === 500000, show plus sign)
- Custom track/thumb styling via Tailwind + CSS
- Thumb: 44px minimum hit area
- `aria-label="Financing amount"`, `aria-valuetext="$85,000"`
- Green accent track fill (`bg-[#22C55E]`)

### 3. ProofBlock (Comparison Table)

Server component. Config-driven.

```ts
interface ProofBlockConfig {
  headline: string;
  columns: [string, string]; // ["TowLoans", "Most Lenders"]
  rows: Array<{ feature: string; towloans: boolean; competitors: boolean }>;
}
```

- White background section
- Rounded card with `shadow-[inset_0_0_0_1px_#E9E9E9]`
- Two-column table layout
- Checkmarks: green `text-[#22C55E]` with SVG check icon
- X marks: muted `text-[#D1D5DB]` with SVG X icon
- 2xl containment classes

### 4. TrustBridge (Text-Only Step List)

Server component. Config-driven.

```ts
interface TrustBridgeConfig {
  headline: string;
  steps: Array<{ number: string; title: string }>;
}
```

- Light gray background (`bg-[#F5F5F5]`)
- Horizontal layout on desktop (4 columns), stacked on mobile
- Green number badges (`bg-[#15803D]` white text, same pattern as HowItWorks)
- Clean, minimal — no descriptions, no CTA

---

## SEO & Schema

### Metadata
```ts
export const metadata: Metadata = {
  title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Finance any rollback tow truck — used, private seller, or auction. Pre-approved in 30 seconds with no credit check. Deferred payments up to 180 days. $0 down available.",
  openGraph: {
    title: "Rollback Financing — Pre-Approved in 30 Seconds | TowLoans",
    description:
      "Used trucks, private sellers, auction units. Pre-approved in 30 seconds with no credit check.",
    type: "website",
  },
};
```

### JSON-LD Schemas (3 blocks via `<JsonLd />`)

**1. FAQPage** — generated from faqItems array (existing pattern)

**2. FinancialProduct** (new):
```ts
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "Rollback Tow Truck Financing",
  description: "Equipment financing for rollback and flatbed tow trucks. Used, private seller, and auction deals. Pre-approval with no credit check.",
  provider: {
    "@type": "Organization",
    name: "TowLoans",
    url: "https://towloans.com"
  },
  feesAndCommissionsSpecification: "Subject to credit review and approval. Terms vary by deal."
}
```

**3. BreadcrumbList** (new):
```ts
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://towloans.com" },
    { "@type": "ListItem", position: 2, name: "Rollback Financing", item: "https://towloans.com/rollback-financing" }
  ]
}
```

**Drop** the current `Article` schema — it was a placeholder.

---

## Production Copy

### Hero

**H1:** `Rollback Tow Truck Financing`

**Body copy:** `Used trucks, private sellers, auction units. We finance the deal as it actually exists — not how a bank wishes it looked. No credit check to get pre-approved. Defer your first payment up to 180 days.`

**Tiles:**
- Tile 1: `Light Duty` (id: `light-duty`, icon: `/brand-assets/truck-icons/rollback/rollback-light-green.svg`)
- Tile 2: `Medium / Heavy Duty` (id: `medium-heavy`, icon: `/brand-assets/truck-icons/rollback/rollback-green.svg`)

**CTA:** `Get Pre-Approved` → `href="#get-pre-approved"` (opens drawer)

**Tertiary links:**
- `See Your Rollback Payment` → `/tow-truck-calculator?type=rollback`
- `Explore rollback leasing` → `/tow-truck-leasing`

**viewAllLink:** `Tow truck financing` → `/`

**Microcopy:** `No credit check for pre-approval. Approvals use a soft Experian inquiry — your score stays untouched.`

**Disclaimer:** `All financing is subject to credit review and approval. Terms vary by truck, seller, and business profile.`

**Hero image:** Keep `truck-3.jpg` (or replace with rollback-specific photo if available)

### Proof Block

**Kicker:** `THE DIFFERENCE`

**Headline:** `Why operators finance rollbacks through us`

**Comparison table rows:**

| Feature | TowLoans | Most Lenders |
|---------|----------|-------------|
| Used truck financing | ✓ | ✓ |
| Private seller deals | ✓ | ✗ |
| Auction & marketplace deals | ✓ | ✗ |
| No credit check pre-approval | ✓ | ✗ |
| See payment range before full application | ✓ | ✗ |
| $0 down available | ✓ | ✗ |
| No dealer required | ✓ | ✗ |
| Deferred payments up to 180 days | ✓ | ✗ |

### BrandMarquee

Use existing `BrandMarquee` with default config. No copy changes.

### Trust Bridge

**Kicker:** `HOW IT WORKS`

**Headline:** `Four steps. One straight answer.`

**Steps:**
1. `Select your rollback type`
2. `Set your financing amount`
3. `Answer a few questions`
4. `See your payment range`

### FAQ

**Section kicker:** `FAQ`

**Headline:** `Rollback financing questions, straight answers.`

**8-10 items (objection FAQs first, SEO FAQs after):**

**1. "What credit score do I need for rollback financing?"**
Answer: `Pre-approval doesn't check your credit at all. When you move to full approval, we pull Experian as a soft inquiry — it won't affect your score. We work with a range of credit profiles, including operators who've been turned down elsewhere.`
Schema: `Pre-approval requires no credit check. Full approval uses a soft Experian inquiry. TowLoans works with a range of credit profiles.`

**2. "Can I finance a rollback from a private seller or auction?"**
Answer: `Yes. Private-party and auction rollback deals are common for us. Get the truck details and seller info in front of us early and you'll get a straight answer fast.`
Schema: `Yes. TowLoans finances private-party and auction rollback deals when the truck details and transaction structure fit.`

**3. "How fast can I get pre-approved for a rollback?"**
Answer: `The pre-approval takes about 30 seconds. You'll see a payment range before you fill out a full application. No hard credit pull, no waiting for a callback.`
Schema: `Pre-approval takes approximately 30 seconds and returns a payment range with no hard credit pull.`

**4. "How much down payment do I need for a rollback?"**
Answer: `It depends on the truck, deal structure, and your business profile. Some operators qualify for` [zero-down tow truck financing](/zero-down-tow-truck-financing)`. Others may need money down to make the payment work.`
Schema: `Down payment depends on the truck, deal structure, and business profile. Some qualified operators can finance with zero down.`

**5. "Can I defer my first payment on a rollback?"**
Answer: `Qualified buyers can defer their first payment up to 180 days. That gives you time to get the truck on the road and generating revenue before payments start.`
Schema: `Qualified buyers can defer their first rollback payment up to 180 days.`

**6. "Do you finance used rollback tow trucks?"**
Answer: `Yes. Used rollback deals are a big part of what we do. If you're buying smart instead of buying new, check our` [used tow truck financing](/used-tow-truck-financing) `page or start with pre-approval.`
Schema: `Yes. TowLoans regularly finances used rollback trucks, including older inventory.`

**7. "How much does a rollback tow truck cost?"**
Answer: `Light-duty rollbacks (Ford, Ram chassis) typically run $40,000–$85,000 used, $70,000–$120,000 new. Medium and heavy-duty (Hino, Kenworth, Peterbilt) range $65,000–$180,000+ depending on age, bed, and configuration. Use our` [tow truck calculator](/tow-truck-calculator?type=rollback) `to see what the payment looks like.`
Schema: `Light-duty rollbacks typically cost $40,000–$120,000 and medium/heavy-duty rollbacks range $65,000–$180,000+, depending on condition, chassis, and configuration.`

**8. "Should I lease or buy a rollback?"**
Answer: `Depends on how you run your business. Leasing keeps payments lower and can work better for taxes. Buying builds equity. Compare both paths in our` [tow truck lease vs. loan guide](/resources/tow-truck-lease-vs-loan) `or go straight to` [tow truck leasing](/tow-truck-leasing)`.`
Schema: `Leasing offers lower payments and potential tax advantages. Buying builds equity. The right choice depends on business structure and goals.`

**9. "What is the difference between a rollback and a flatbed?"**
Answer: `Same truck, different name. "Rollback" and "flatbed" both refer to a tow truck with a tilting flat bed that rolls back to load vehicles. The industry uses both terms. We finance them all.`
Schema: `Rollback and flatbed are interchangeable terms for a tow truck with a tilting flat carrier bed. TowLoans finances all variants.`

**10. "Can I write off my rollback truck with Section 179?"**
Answer: `In many cases, yes. Section 179 lets you deduct the full purchase price of qualifying equipment in the year you buy it. Read our` [Section 179 tow truck guide](/resources/section-179-tow-truck) `for details. Talk to your accountant for your specific situation.`
Schema: `Section 179 may allow full deduction of a rollback purchase price in the year of acquisition. Consult a tax professional for specific eligibility.`

### Closing CTA (Inline Dark Section)

**Kicker:** `READY WHEN YOU ARE`

**Headline:** `Ready to lock in your rollback?`

**Body:** `You don't need corporate runaround. You need to know whether the deal works and what the payment looks like.`

**Primary CTA:** `Get Pre-Approved` → `href="#get-pre-approved"` (opens drawer, uses RippleCtaLink with green variant)

**Secondary:** `Prefer to talk?` [phone link] `(888) 555-0199` + `Mon-Fri 8am-6pm CT`

**Background:** `bg-[#101820]` (dark) — matches current closing CTA section styling

### Related Links (Existing Pattern)

Same structure as current page lines 454-477:
- `Need a wrecker instead?` → `/wrecker-financing`
- `Looking at rotators?` → `/rotator-financing`
- `Tow truck financing` → `/`

### Footer

Keep existing footer structure. No changes.

---

## Build Sequence

### Phase 1: Drawer Foundation ✅
1. `DrawerContext.tsx` — provider, useDrawer hook, DrawerHashListener
2. `AmountSlider.tsx` — range slider with config
3. `PreApprovalDrawer.tsx` — sheet (mobile) + modal (desktop)
4. `config.ts`, `index.ts`, `CLAUDE.md`

### Phase 2: New Sections (parallel) ✅
5. `ProofBlock` — comparison table
6. `TrustBridge` — step list

### Phase 3: Page Assembly ✅
7. Rewrite `app/rollback-financing/page.tsx`:
   - Updated metadata + 3 JSON-LD schemas
   - Hero config with new copy, tiles, and drawer-triggering CTA
   - ProofBlock config with 8 differentiator rows
   - BrandMarquee drop-in
   - TrustBridge config with 4 steps
   - Expanded FAQ (10 items with schemaAnswer fields)
   - Inline dark closing CTA section
   - DrawerProvider wrapping `<main>`
   - Related links + footer (carry forward)

### Phase 4: Polish
8. Cross-viewport testing (mobile sheet, desktop modal)
9. Keyboard nav (Escape, focus trap, tab order)
10. Reduced motion testing
11. Schema validation (Google Rich Results Test)

---

## Key Technical Notes

- **TileSelector hash behavior:** When `cta.href="#get-pre-approved"`, `buildSelectedHref()` produces `?equipment=light-duty#get-pre-approved`. The hash triggers `DrawerHashListener`. Equipment param preserved in URL for future use.

- **RippleCtaLink hash behavior:** Hash-only href is not external, so renders as `MotionLink` (Next.js Link). Client-side nav adds hash to URL, triggering native `hashchange` event.

- **Back button:** Hash is cleared via `history.replaceState` (not pushState). Pressing back goes to previous page, not back to drawer-open state.

- **Direct URL access:** `DrawerHashListener` checks `window.location.hash` on mount via useEffect. URL like `/rollback-financing#get-pre-approved` opens the drawer on page load.

- **Body scroll lock:** Set `document.body.style.overflow = "hidden"` when drawer opens, restore on close. Check for conflicts with StickyNav mobile overlay (different hash, won't conflict).

- **Server/client boundary:** Only `DrawerProvider` is the new client boundary at page level. All section components (ProofBlock, TrustBridge, ClosingCTA) remain server components. They pass through DrawerProvider as `children` prop — standard RSC composition.

---

## Verification

1. `npm run lint` — no errors
2. `npm run build` — successful production build
3. **Manual testing:**
   - Hero tile selection → CTA click → drawer opens
   - Slider drags smoothly from $20k to $500k+, snaps to $5k increments
   - Continue → navigates to `/pre-approval`
   - Closing CTA → drawer opens
   - Phone link works in closing CTA
   - Escape key closes drawer
   - Click backdrop closes drawer
   - Mobile: drag-to-dismiss works, body doesn't scroll behind drawer
   - Desktop: centered modal, close button works
   - Reduced motion: no animations, drawer still functional
   - Tab through all interactive elements — logical order, visible focus rings
4. **SEO validation:**
   - View page source → confirm 3 JSON-LD blocks render
   - Google Rich Results Test on FAQPage schema
   - Verify title tag and meta description in `<head>`
5. **Chrome DevTools MCP** — final runtime validation as last gate
