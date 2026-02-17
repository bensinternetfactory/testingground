# Hero Copy Variant System — Specification
## Tow Loans Revenue-Leak Page | Angle 2 (Niche Specialist)

This is the authoritative spec for the hero copy variant preview system. It covers both the copy generation brief and the technical implementation, consolidating all decisions from the planning interview.

---

# Part 1: Copy Generation Brief

## 1. Reference Documents

Agents must read these before generating any copy:

| Document | Path | Focus |
|----------|------|-------|
| Positioning Strategy | `@testingground/docs/sitemap/positioning-angles.md` | Angle 2 — The Niche Specialist |
| Brand Voice Profile | `@testingground/docs/brandvoice.md` | Full voice profile |
| Target Component | `@testingground/components/sections/revenue-leak/HeroQuoteStart.tsx` | Structure context (read-only) |

**Angle 2 — The Niche Specialist (Specificity Angle)**
Core idea: Tow Loans finances tow trucks specifically. Not general equipment. We understand towing operations. This is the default/foundational angle.

Ignore other angles unless lightly supportive.

---

## 2. Objective

Generate **10 hero copy variants** designed to increase:

- Quote-start clicks
- Trust in specialization
- Perceived industry understanding
- Clarity of eligibility and fit

Primary SEO keyword: **tow truck financing**

- Exact phrase must appear naturally in headline OR bodyCopy in **7+ of 10 variants**
- Remaining 3 may use close semantic variations ("financing for tow trucks", "tow truck loans")

---

## 3. Agent Skill Requirement

Agents must use the **direct-response-copy** skill. This means:

- Conversion-focused messaging
- Clear benefit communication
- Objection-aware language
- Respectful urgency (not pressure)
- Specificity over cleverness

Avoid: generic branding copy, corporate finance tone, startup hype language, empty slogans.

---

## 4. Audience Context

**Primary audience:** Established towing companies

- 2+ years operating
- Expanding fleets OR replacing aging trucks
- Cash-flow conscious
- Likely frustrated with traditional lenders

**Emotional realities:**

- Time pressure
- Equipment costs
- Skepticism toward lenders
- Pride in trade professionalism

---

## 5. Messaging Anchors (Angle 2 Specific)

Emphasize:

- Tow-truck-only financing specialization
- Understanding used trucks / private-party deals
- Familiarity with towing operations
- Straight answers, minimal runaround
- Industry respect

Implicit contrast with banks allowed. Direct bank-bashing not allowed.

---

## 6. Brand Voice Guardrails

**DO:**

- Speak plainly
- Sound industry fluent
- Keep sentences tight
- Respect reader intelligence
- Lead with their reality, not company intro

**DO NOT:**

- Promise guaranteed approval
- Use corporate buzzwords
- Over-explain financing mechanics
- Sound desperate for business
- Use exaggerated urgency

If copy sounds like a bank, fintech startup, or generic equipment lender — rewrite.

---

## 7. Hero Copy Constraints

This is first-contact copy:

- Signal specialization fast
- Build trust quickly
- Do not explain everything
- Keep scannable for mobile readers
- Use Unicode curly quotes (`\u2018` `\u2019` `\u201C` `\u201D`) and proper ellipsis (`\u2026`), not ASCII equivalents — match existing config patterns

Headline ideal length: **~6–12 words preferred.**

---

## 8. Specificity Test (Mandatory)

Each variant must pass:

**Replacement Test:** If "tow truck" can be replaced with "excavator" or "forklift" and the copy still works — rewrite.

Purpose: Protect niche positioning.

---

## 9. Emotional Outcome Requirement

After reading the hero, operators should feel:

- "They get my business."
- "This won't waste my time."
- "These are specialists."

If not — revise.

---

## 10. CTA Rules

CTAs must feel conversational, not pushy.

**Preferred examples:**

- See what you qualify for
- Get a straight answer
- Talk to us

**Avoid:**

- Apply Now
- Get Started
- Limited Time urgency language

---

## 11. Quality Rejection Criteria

Reject any variant if:

- Could belong to a general equipment lender
- Sounds corporate or hype-driven
- Leads with Tow Loans instead of operator reality
- Overuses marketing clichés
- Implies unrealistic ease or approval guarantees

---

# Part 2: Technical Implementation

## 12. Architecture Overview

- `HeroQuoteStart.tsx` remains a **server component** — unchanged in every way (props, exports, DOM structure, file location)
- Variant data lives in a **TypeScript data module** with `as const satisfies`
- Config resolution happens **server-side** in `page.tsx` via URL search params
- Dev panel is a **separate `"use client"` component**, dynamically imported
- Dev panel is **fully stripped from production builds** via `NODE_ENV` gating + dynamic import

---

## 13. File Map

| Action | File | Role | Server/Client |
|--------|------|------|---------------|
| Create | `components/sections/revenue-leak/hero-variants.ts` | Types + variant data + angle map | Server (data module) |
| Create | `lib/resolve-hero-config.ts` | Pure merge function (override → full config) | Server (utility) |
| Create | `components/dev/DevVariantPanel.tsx` | Floating dev panel UI | Client |
| Create | `app/revenue-leak/error.tsx` | Route-level error boundary | Client |
| Modify | `app/revenue-leak/page.tsx` | Read params, resolve config, render panel, convert barrel imports to direct imports | Server |
| **No change** | `components/sections/revenue-leak/HeroQuoteStart.tsx` | — | Server |
| **No change** | `components/sections/revenue-leak/hero-quote-start-config.ts` | Default config stays untouched | Server |

---

## 14. Variant Data Format

TypeScript data module at `hero-variants.ts`. NOT JSON.

```
HeroVariantOverride {
  name: string                          // Display name in panel (e.g. "Specialist Authority")
  headline: string                      // Required — always overrides
  bodyCopy: string                      // Required — always overrides
  cta: { label: string }                // Required — always overrides (href inherited from default)
  microcopy?: string                    // Optional — falls back to default
  disclaimer?: string                   // Optional — falls back to default
  tertiaryLinks?: { label: string }[]   // Optional — positional label override, hrefs inherited
  viewAllLink?: string                  // Optional — falls back to default
  heroImageAlt?: string                 // Optional — falls back to default
}
```

**Never overridden by variants:** `tiles`, `heroImage`, `cta.href`

Variants organized in a map keyed by angle:

```
heroVariantsByAngle = {
  2: [ ...10 Angle 2 variants... ],
  // Future: 1: [...], 3: [...], etc.
} as const satisfies HeroVariantsByAngle
```

`AngleId` is a `1 | 2 | 3 | 4 | 5` union type matching `positioning-angles.md`.

---

## 15. Toggle Mechanism

### URL Search Params (Server-Side)

- `?angle=2&variant=3` — both params supported from day one
- `page.tsx` becomes an `async` function to read params (Next.js 16 async pattern)
- Exact required signature:

```tsx
type Props = {
  searchParams: Promise<{ angle?: string; variant?: string }>;
};

export default async function RevenueLeakPage({ searchParams }: Props) {
  const { angle, variant } = await searchParams;
  // ...
}
```

- Calls `resolveHeroConfig(defaults, override)` to produce the final config
- Passes resolved config to `<HeroQuoteStart config={heroConfig} />`

### Barrel Import Cleanup (Required)

When modifying `page.tsx`, convert the existing barrel import to direct imports to avoid pulling the entire module into the bundle:

```tsx
// BEFORE (loads all 12 components via barrel)
import { FinancingCards, GuideBuilder, ... } from "@/components/sections/revenue-leak";

// AFTER (loads only what is used)
import { FinancingCards } from "@/components/sections/revenue-leak/FinancingCards";
import { GuideBuilder } from "@/components/sections/revenue-leak/GuideBuilder";
import { FeaturedPrograms } from "@/components/sections/revenue-leak/FeaturedPrograms";
import { CalculatorCTA } from "@/components/sections/revenue-leak/CalculatorCTA";
import { TestimonialsSection } from "@/components/sections/revenue-leak/TestimonialsSection";
import { FinalCTA } from "@/components/sections/revenue-leak/FinalCTA";
import { LegalSection } from "@/components/sections/revenue-leak/LegalSection";
import { FooterSection } from "@/components/sections/revenue-leak/FooterSection";
```

Existing direct imports (`HeroQuoteStart`, `StickyNav`) are already correct.

### Dev-Only Gating

- All param reading wrapped in `if (process.env.NODE_ENV === "development")`
- In production: params are ignored, hero always receives `HERO_QUOTE_START_CONFIG`
- Build-time dead code elimination strips the entire dev block from production

### Floating Dev Panel

- **Position:** Fixed bottom-right, `z-[9999]`
- **Default state:** Collapsed — small pill button reading "DEV: Hero Variants"
- **Expanded/collapsed state:** Managed via local `useState` only — toggling the panel does NOT trigger URL updates or server re-renders
- **Expanded state:**
  - Angle dropdown (only angles with data appear)
  - Scrollable variant list using `role="radiogroup"` with `aria-label="Hero copy variants"`
  - Each variant button uses `role="radio"` with `aria-checked` reflecting active state
  - Each button shows: variant `name` + truncated `headline` preview (use `truncate` with `min-w-0` on flex children)
  - "Default (Current)" always first option, shows current default headline
  - Active variant highlighted (black bg, white text)
- **Accessibility:**
  - All interactive elements (pill toggle, variant buttons, angle dropdown) must have visible `focus-visible:ring-2` indicators
  - Escape key dismisses the expanded panel and returns focus to the pill toggle
  - `touch-action: manipulation` on pill toggle and variant buttons
- **Keyboard dismiss pattern:**

```tsx
useEffect(() => {
  if (!isExpanded) return;
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      toggleRef.current?.focus();
    }
  };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}, [isExpanded]);
```

- **Navigation:** `useRouter().replace()` wrapped in `useTransition` — keeps panel responsive during server re-render, provides visual pending state

```tsx
const [isPending, startTransition] = useTransition();

function selectVariant(angle: number, variant: number | null) {
  startTransition(() => {
    const params = new URLSearchParams();
    if (variant !== null) {
      params.set("angle", String(angle));
      params.set("variant", String(variant));
    }
    const search = params.toString();
    router.replace(search ? `?${search}` : pathname);
  });
}
```

- **Animation:** Any expand/collapse transitions must use `motion-safe:` / `motion-reduce:` variants to respect `prefers-reduced-motion`
- **Props:** Panel receives `variantsByAngle`, `defaultHeadline` (string only — do NOT pass the full config object to avoid serializing `StaticImageData` + base64 blur data to the client), `currentAngle`, and `currentVariant` from the server parent. No `useSearchParams()` needed — avoids Suspense bail-out.

```tsx
<DevVariantPanel
  variantsByAngle={heroVariantsByAngle}
  defaultHeadline={HERO_QUOTE_START_CONFIG.headline}
  currentAngle={angle}
  currentVariant={variant}
/>
```

### Production Stripping

```tsx
import dynamic from "next/dynamic";

// ssr: false is intentional — DevVariantPanel uses useRouter and useState,
// and must only render on the client to avoid hydration mismatches.
const DevVariantPanel = process.env.NODE_ENV === "development"
  ? dynamic(() => import("@/components/dev/DevVariantPanel"), { ssr: false })
  : () => null;
```

Build-time ternary. Production takes the `() => null` branch. The `import()` is unreachable, so `DevVariantPanel.tsx` and all its dependencies are tree-shaken from the production bundle entirely.

---

## 16. Config Resolution Logic

Pure function in `lib/resolve-hero-config.ts`:

- Spreads default config
- Overlays required fields: `headline`, `bodyCopy`, `cta.label`
- Conditionally overlays optional fields only when defined (not `undefined`)
- `tertiaryLinks`: positional label override — preserves `href` from default config
- `tiles`, `heroImage`, `cta.href`: always from defaults, never overridden

---

## 17. Type Safety

- TypeScript with `as const satisfies` — no runtime validation needed
- `HeroVariantOverride` is a purpose-built interface (not `Partial<HeroQuoteStartConfig>`) to prevent accidental override of structural fields
- Build-time enforcement only — no zod, no runtime checks
- Typos in variant data fail the build

---

## 18. Variant Output Format (For Copy Generation)

Each variant in the data module:

```
{
  name: "Display Name",
  headline: "6-12 word headline with tow truck financing keyword",
  bodyCopy: "1-2 sentence supporting copy",
  cta: { label: "Conversational CTA text" },
  // Optional overrides only when they genuinely strengthen the variant
}
```

---

## 19. Implementation Sequence

1. **Types + data module** — `hero-variants.ts` with 2 placeholder variants
2. **Config resolver** — `lib/resolve-hero-config.ts`
3. **Page wiring** — `page.tsx`: convert barrel imports to direct imports, add async searchParams with `Promise<...>` typing, resolve config, render panel with slim props (`defaultHeadline`, `currentAngle`, `currentVariant`)
4. **Error boundary** — `app/revenue-leak/error.tsx` (`'use client'`) for graceful degradation
5. **Dev panel** — `components/dev/DevVariantPanel.tsx` with ARIA radiogroup, focus-visible rings, Escape dismiss, useTransition navigation, reduced-motion support
6. **Copy generation** — Invoke `/direct-response-copy` skill, populate all 10 variants
7. **Spec rewrite** — This file (already done)

---

## 20. Verification Checklist

- [ ] `npm run dev` → panel pill appears bottom-right on `/revenue-leak`
- [ ] Expand panel → Angle 2 shows "Default (Current)" + 10 variants
- [ ] Click variant → URL updates → hero text changes → panel shows pending state during transition
- [ ] Click "Default" → params removed → original hero restores
- [ ] Escape key dismisses expanded panel and returns focus to pill toggle
- [ ] Tab through panel → all buttons show visible focus-visible ring
- [ ] Panel expand/collapse does NOT trigger URL change or server re-render
- [ ] Barrel imports removed — `page.tsx` uses direct component imports only
- [ ] `npm run build` → no type errors
- [ ] Production build → `?angle=2&variant=3` ignored, default hero shows, no panel visible
- [ ] Production bundle → no `DevVariantPanel` code present

---

## 21. Future Expansion

- **Additional angles:** Add keys to `heroVariantsByAngle` (e.g., `1: [...]`, `3: [...]`)
- **Additional pages:** Import `DevVariantPanel` with page-specific variant data
- **Production A/B testing:** Out of scope. Can be layered on later without changing the data format — variant IDs and the `heroVariantsByAngle` structure support it

---
