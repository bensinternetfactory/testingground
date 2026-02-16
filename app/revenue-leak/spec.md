# StickyNav Component Update Spec

**Component location:** `/components/sections/revenue-leak/StickyNav.tsx`
**Related page:** `app/revenue-leak/page.tsx`

---

## 1. Component Architecture (Server/Client Split)

**Requirement:** The StickyNav must be split into a server component shell and a thin client interactive wrapper to keep the client bundle lean.

### File structure

| File | Directive | Purpose |
|------|-----------|---------|
| `StickyNav.tsx` | Server component (no directive) | Renders static nav content, dropdown card markup, icons, and placeholder text |
| `NavClient.tsx` | `'use client'` | Thin interactive shell — hover/focus state, mobile toggle, Radix NavigationMenu root |
| `nav-data.ts` | Server-safe module | Plain data arrays for dropdown card content (titles, descriptions, icons, hrefs) |

### Why
Converting the entire StickyNav to `'use client'` would ship all dropdown card content, SVG icons, and placeholder text in the client JS bundle. Instead, the `'use client'` boundary is pushed down to the smallest interactive wrapper.

```tsx
// StickyNav.tsx (server component — NO 'use client')
import { NavClient } from "./NavClient";
import { NAV_ITEMS } from "./nav-data";

export function StickyNav() {
  return (
    <NavClient>
      {/* Server-rendered dropdown content passed as children/slots */}
    </NavClient>
  );
}

// NavClient.tsx ('use client' — thin interactive shell)
"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export function NavClient({ children }: { children: React.ReactNode }) {
  // Only hover/focus state, mobile toggle, and animation logic here
  return <NavigationMenu.Root>{children}</NavigationMenu.Root>;
}
```

### Import pattern
Import StickyNav **directly from its file path** in `page.tsx` — do NOT import from the barrel file `components/sections/revenue-leak/index.ts`. The barrel re-exports all 10 revenue-leak components, and after adding Radix NavigationMenu, importing from the barrel pulls all Radix deps into any page that only needs one component.

```tsx
// app/revenue-leak/page.tsx — CORRECT
import { StickyNav } from "@/components/sections/revenue-leak/StickyNav";

// WRONG — barrel file anti-pattern
import { StickyNav } from "@/components/sections/revenue-leak";
```

---

## 2. Desktop Navigation Spacing Adjustment

**Current state:** The nav bar uses `justify-between` across the full width, creating excessive space between the TowCap logo and navigation items.

**Required change:**
- Group the logo and navigation items as a **left-aligned cluster** — they should sit close together on the left side
- The gap between nav items and the CTA/phone section on the right stays **unchanged**
- The visual gap shifts to the middle (between nav items and the right CTA section)

---

## 3. Rename "Calculator" to "Resources"

- Rename the "Calculator" nav item label to **"Resources"**
- Update the href from `#calculator` to `#` (placeholder — page doesn't exist yet)

---

## 4. Update All Navigation Hrefs

**All navigation links will point to pages (not section anchors).** Pages do not exist yet.

| Nav Item    | Current href    | New href |
|-------------|-----------------|----------|
| Financing   | `#financing`    | `#`      |
| Programs    | `#programs`     | `#`      |
| Resources   | `#calculator`   | `#`      |
| About       | `#about`        | `#`      |

> These will be updated to real page routes (e.g., `/revenue-leak/financing`) in a future task.

**Placeholder href handling:** Do NOT use bare `#` — it causes scroll-to-top and pollutes the URL. For items with dropdowns (Financing, Programs, Resources), Radix `NavigationMenu.Trigger` renders as a `<button>` so no href is needed. For About (simple link with no dropdown), use `href="#!"` or `event.preventDefault()` until a real route exists.

---

## 5. Install shadcn and NavigationMenu Component

### Setup
- Run `npx shadcn@latest add navigation-menu`
- Map shadcn's CSS variable system to the **full Rocket Mortgage brand palette** using HSL format
- Color mapping reference: `docs/rocket-mortgage-style-guide.md`
  - Convert all brand hex colors to HSL for shadcn tokens (`--primary`, `--secondary`, `--accent`, `--muted`, etc.)

### CSS variable format migration (CRITICAL)
The existing `globals.css` defines `--background` and `--foreground` using hex values. shadcn expects HSL space-separated values (e.g., `--primary: 355 73% 54%`) used as `hsl(var(--primary))`. **These formats are incompatible.**

**Required:** When adding shadcn tokens, convert ALL existing `:root` CSS variables from hex to HSL format. Also update the `@media (prefers-color-scheme: dark)` block in tandem so dark mode doesn't produce mismatched colors.

```css
:root {
  /* Convert existing vars to HSL */
  --background: 0 0% 100%;
  --foreground: 0 0% 7%;

  /* shadcn tokens */
  --primary: 355 73% 54%;
  --primary-foreground: 0 0% 100%;
  /* ... */
}
```

### Critical constraint
- shadcn installation and CSS variable additions **must not alter** the visual styling of the `HeroSection` component
- The rotating image arc, framer-motion animations, and all arc-thumbnail CSS in `globals.css` must remain unaffected
- After installation, visually verify the HeroSection is unchanged

---

## 6. Desktop Dropdown Menus (hover-triggered)

### Which items get dropdowns
- **Financing** — dropdown with rich card layout
- **Programs** — dropdown with rich card layout
- **Resources** — dropdown with rich card layout
- **About** — NO dropdown, remains a simple link (`#!`)

### Trigger behavior
- **Hover to open** (shadcn/Radix default behavior)
- Clicking the trigger label does NOT navigate anywhere — it only opens the dropdown
- Dropdowns close on hover-away or click outside
- Dropdowns **stay open** during page scroll (Radix default)

### Dropdown panel design
- **Width:** Content-driven — each dropdown sizes itself based on its items
- **Background:** Distinct elevated card — own white background, `shadow-elevated` (`0 10px 30px rgba(0,0,0,0.10)`), rounded corners
- **Arrow:** Small triangular **caret arrow** pointing up toward the trigger nav item — use a **CSS triangle** (`border` trick or `clip-path`), NOT an SVG
- **Content layout:** Rich card grid — each item is a card with icon, title, and short description
  - Similar visual pattern to the existing `FinancingCards` component
  - Cards follow brand styling: `rounded-2xl`, border, inset shadow
  - Card titles: use `text-wrap: balance` to prevent orphaned words
  - Card descriptions: use `line-clamp-2` with `min-w-0` on flex children to prevent layout breaks on overflow
- **Card hover state:** Background tint on hover (use brand tint colors: `#FBF0F6`, `#F3EEE7`, or `#EDF1FF`). Use specific transition properties (`transition: background-color 150ms ease`) — **never** `transition: all`
- **CTA section:** Desktop dropdowns do NOT overlay the right-side CTA/phone — they stay beneath the nav items only

### Transition between dropdowns
- **Use Radix's built-in CSS viewport animations** — do NOT use Framer Motion for dropdown transitions
- Radix NavigationMenu supports `data-state` and `data-motion` attributes on `NavigationMenu.Viewport` natively
- Animation speed: **~150ms** (snappy, Vercel-style)

```css
/* globals.css — Radix viewport animations */
.NavigationMenuViewport[data-state="open"] {
  animation: scaleIn 150ms ease;
}
.NavigationMenuViewport[data-state="closed"] {
  animation: scaleOut 100ms ease;
}
.NavigationMenuViewport[data-motion="from-start"] {
  animation: enterFromLeft 150ms ease;
}
.NavigationMenuViewport[data-motion="from-end"] {
  animation: enterFromRight 150ms ease;
}
.NavigationMenuViewport[data-motion="to-start"] {
  animation: exitToLeft 100ms ease;
}
.NavigationMenuViewport[data-motion="to-end"] {
  animation: exitToRight 100ms ease;
}
```

### Placeholder content
- Use **smart placeholders** — realistic sub-links based on what a tow truck financing company would offer
- Structure: grid of 2-3 cards per dropdown with icon, title, and 1-line description
- All card links point to `#!` for now
- **Hoist dropdown card data to module scope** in `nav-data.ts` — do NOT define data arrays inline in JSX (inline arrays create new references on every render and break memoization)

### Z-index
- Let shadcn/Radix handle z-index and portal behavior by default
- Only adjust if conflicts arise with the HeroSection (nav is currently `z-50`)

### Accessibility
- Preserve **full Radix a11y defaults**: keyboard navigation (Tab/Arrow keys), Escape to close, ARIA attributes, focus management

---

## 7. Mobile Navigation

### Breakpoint
- **md (768px)** — matches the existing nav breakpoint
- Below md: show hamburger + mobile overlay
- At md and above: show desktop nav with hover dropdowns

### Hamburger icon
- **Vercel-style two-bar toggle:**
  - Two horizontal bars stacked vertically
  - On open: top bar rotates 45°, bottom bar rotates -45° → forms an X
  - On close: bars animate back to horizontal
  - Smooth CSS transition (not icon swap)
- **Color:** `#545454` (muted text color)
- Uses `data-expanded` attribute for state
- `aria-label`: "Open menu" / "Close menu"
- **Focus styling:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2` — must match existing nav link focus styles
- Add `touch-action: manipulation` to eliminate 300ms tap delay on mobile Safari

### Mobile overlay
- **Full-screen overlay** that fades in over the page
- **Solid white background** (`#FFFFFF`)
- **Scroll lock:** Use `overscroll-behavior: contain` on the overlay element combined with `position: fixed; inset: 0`. Do NOT toggle `overflow: hidden` on `<body>` — it causes layout shift from scrollbar removal. If `overflow: hidden` is absolutely necessary, compensate with `padding-right` on `<body>`.
- **Overlay itself scrolls** if the menu content exceeds viewport height
- Overlay appears below the nav bar (nav bar stays fixed and visible)

```tsx
// Mobile overlay wrapper
<div
  className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-white"
  style={{ top: "var(--nav-height)" }}
>
  {/* accordion content */}
</div>
```

### Mobile overlay content
- **Navigation sections** as **tap-to-expand accordions**
  - Financing (accordion) → expands to show same items as desktop dropdown
  - Programs (accordion) → expands to show same items as desktop dropdown
  - Resources (accordion) → expands to show same items as desktop dropdown
  - About → simple link (no accordion)
- Add `touch-action: manipulation` to accordion triggers and mobile nav links
- **CTA section at the bottom:**
  - Phone number: `(888) 555-0199`
  - "Get Pre-Approved" button — **black background** (`#111111`), matching desktop style
- When a link is tapped → overlay closes automatically

---

## 8. Nav Height (CSS Variable)

- Define a **CSS variable** for nav height — single source of truth:

```css
:root {
  --nav-height: 72px;
}
```

- **StickyNav:** `h-[var(--nav-height)]`
- **HeroSection:** `pt-[var(--nav-height)]`
- **Allowed flex:** Adjust `--nav-height` between **72–80px** if needed to accommodate dropdown trigger chevrons — both nav and hero update automatically
- Do NOT use hardcoded `72px` or `pt-[72px]` in either component

---

## 9. Reduced Motion

**All new animations must respect `prefers-reduced-motion: reduce`.**

The existing codebase correctly handles reduced motion for the arc animation in `globals.css`. Extend this to all new motion:

- Hamburger bar rotation
- Mobile overlay fade-in
- Accordion expand/collapse
- Dropdown slide transitions

```css
@media (prefers-reduced-motion: reduce) {
  .hamburger-bar,
  .mobile-overlay,
  .accordion-content,
  .NavigationMenuViewport {
    animation: none !important;
    transition: none !important;
  }
}
```

When reduced motion is preferred, replace slide/rotate animations with instant state changes (opacity 0→1, duration 0) or remove them entirely.

---

## 10. Brand Style Consistency

### Color system (HSL conversion)
All brand colors must be converted to HSL and mapped to shadcn CSS variable tokens:

| Brand Color  | Hex       | HSL (approx)       | shadcn Token   |
|-------------|-----------|---------------------|----------------|
| Primary Red | `#DE3341` | `355 73% 54%`      | `--primary`    |
| Foreground  | `#111111` | `0 0% 7%`          | `--foreground` |
| Muted Text  | `#545454` | `0 0% 33%`         | `--muted-foreground` |
| Border      | `#E9E9E9` | `0 0% 91%`         | `--border`     |
| Background  | `#FFFFFF` | `0 0% 100%`        | `--background` |
| Pink Tint   | `#FBF0F6` | `320 58% 96%`      | (surface tint) |
| Beige Tint  | `#F3EEE7` | `35 30% 93%`       | (surface tint) |
| Blue Tint   | `#EDF1FF` | `226 100% 96%`     | (surface tint) |

### shadcn customization level
- **Light touch:** Keep shadcn's default animation/structure
- Swap in brand colors, fonts, and shadow values
- Override specific styles where needed to match brand guide

### Style guide reference
- Full style guide: `docs/rocket-mortgage-style-guide.md`
- Card patterns: `rounded-2xl`, border, inset shadow
- Elevated shadows: `0 10px 30px rgba(0,0,0,0.10)`
- Font: Geist Sans (already loaded)

### Mobile browser theming
- Add `<meta name="theme-color" content="#FFFFFF">` in the root layout to match nav background in mobile browser chrome

---

## 11. Verification Checklist

After implementation, verify:

**Architecture**
- [ ] StickyNav is a server component with a thin `NavClient` (`'use client'`) wrapper
- [ ] Dropdown card data is hoisted to module scope in `nav-data.ts`
- [ ] StickyNav is imported directly (not from barrel file)

**Desktop Nav**
- [ ] Logo and nav items are grouped as a left-aligned cluster
- [ ] "Calculator" is renamed to "Resources"
- [ ] All nav hrefs use `#!` or button (no bare `#`)
- [ ] shadcn navigation-menu is installed and functional
- [ ] Hover opens dropdowns on desktop with rich card content
- [ ] Horizontal slide transition via Radix CSS `data-motion` (~150ms) — no Framer Motion
- [ ] CSS triangle caret arrow on dropdown panels
- [ ] Card hover states use `transition: background-color` (not `transition: all`)
- [ ] Card titles use `text-wrap: balance`, descriptions use `line-clamp`
- [ ] Desktop CTA/phone remains visible when dropdown is open

**Mobile Nav**
- [ ] Hamburger icon appears below md breakpoint (two-bar Vercel style)
- [ ] Hamburger animates to X on open
- [ ] Hamburger has `focus-visible` ring and `touch-action: manipulation`
- [ ] Mobile overlay uses `overscroll-behavior: contain` (not `overflow: hidden` on body)
- [ ] Accordion sections work in mobile overlay
- [ ] Mobile overlay includes CTA (black) and phone at bottom
- [ ] Accordion triggers and links have `touch-action: manipulation`

**Styling & Theming**
- [ ] Existing `globals.css` variables converted from hex to HSL
- [ ] shadcn CSS variables mapped to brand HSL colors
- [ ] Dark mode `prefers-color-scheme` block updated with HSL values
- [ ] `<meta name="theme-color">` added to root layout
- [ ] No style conflicts with existing components

**Performance & Accessibility**
- [ ] HeroSection is visually UNCHANGED (arc animation, images, layout)
- [ ] Nav height uses `--nav-height` CSS variable (72–80px)
- [ ] HeroSection uses `pt-[var(--nav-height)]` (not hardcoded)
- [ ] All new animations respect `prefers-reduced-motion: reduce`
- [ ] All Radix a11y keyboard navigation works
- [ ] Client bundle does not contain static dropdown content (server-rendered)
