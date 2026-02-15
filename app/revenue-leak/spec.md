# Plan: Update StickyNav Spec with Interview Results

## What this plan does
Write the fully updated `app/revenue-leak/spec.md` incorporating all decisions from the user interview. No code changes — only the spec file is modified.

## Target file
`/Users/benfranzoso/Documents/Projects/copy/app/revenue-leak/spec.md`

## Updated spec content below

---

# StickyNav Component Update Spec

**Component location:** `/components/sections/revenue-leak/StickyNav.tsx`
**Related page:** `app/revenue-leak/page.tsx`

---

## 1. Desktop Navigation Spacing Adjustment

**Current state:** The nav bar uses `justify-between` across the full width, creating excessive space between the TowCap logo and navigation items.

**Required change:**
- Group the logo and navigation items as a **left-aligned cluster** — they should sit close together on the left side
- The gap between nav items and the CTA/phone section on the right stays **unchanged**
- The visual gap shifts to the middle (between nav items and the right CTA section)

---

## 2. Rename "Calculator" to "Resources"

- Rename the "Calculator" nav item label to **"Resources"**
- Update the href from `#calculator` to `#` (placeholder — page doesn't exist yet)

---

## 3. Update All Navigation Hrefs

**All navigation links will point to pages (not section anchors).** Pages do not exist yet.

| Nav Item    | Current href    | New href |
|-------------|-----------------|----------|
| Financing   | `#financing`    | `#`      |
| Programs    | `#programs`     | `#`      |
| Resources   | `#calculator`   | `#`      |
| About       | `#about`        | `#`      |

> These will be updated to real page routes (e.g., `/revenue-leak/financing`) in a future task.

---

## 4. Install shadcn and NavigationMenu Component

### Setup
- Run `npx shadcn@latest add navigation-menu`
- Map shadcn's CSS variable system to the **full Rocket Mortgage brand palette** using HSL format
- Color mapping reference: `docs/rocket-mortgage-style-guide.md`
  - Convert all brand hex colors to HSL for shadcn tokens (`--primary`, `--secondary`, `--accent`, `--muted`, etc.)

### Critical constraint
- shadcn installation and CSS variable additions **must not alter** the visual styling of the `HeroSection` component
- The rotating image arc, framer-motion animations, and all arc-thumbnail CSS in `globals.css` must remain unaffected
- After installation, visually verify the HeroSection is unchanged

---

## 5. Desktop Dropdown Menus (hover-triggered)

### Which items get dropdowns
- **Financing** — dropdown with rich card layout
- **Programs** — dropdown with rich card layout
- **Resources** — dropdown with rich card layout
- **About** — NO dropdown, remains a simple link (`#`)

### Trigger behavior
- **Hover to open** (shadcn/Radix default behavior)
- Clicking the trigger label does NOT navigate anywhere — it only opens the dropdown
- Dropdowns close on hover-away or click outside
- Dropdowns **stay open** during page scroll (Radix default)

### Dropdown panel design
- **Width:** Content-driven — each dropdown sizes itself based on its items
- **Background:** Distinct elevated card — own white background, `shadow-elevated` (`0 10px 30px rgba(0,0,0,0.10)`), rounded corners
- **Arrow:** Small triangular **caret arrow** pointing up toward the trigger nav item
- **Content layout:** Rich card grid — each item is a card with icon, title, and short description
  - Similar visual pattern to the existing `FinancingCards` component
  - Cards follow brand styling: `rounded-2xl`, border, inset shadow
- **Card hover state:** Background tint on hover (use brand tint colors: `#FBF0F6`, `#F3EEE7`, or `#EDF1FF`)
- **CTA section:** Desktop dropdowns do NOT overlay the right-side CTA/phone — they stay beneath the nav items only

### Transition between dropdowns
- **Horizontal slide** animation when moving between menu items (e.g., hovering from Financing → Programs)
- Animation speed: **~150ms** (snappy, Vercel-style)

### Placeholder content
- Use **smart placeholders** — realistic sub-links based on what a tow truck financing company would offer
- Structure: grid of 2-3 cards per dropdown with icon, title, and 1-line description
- All card links point to `#` for now

### Z-index
- Let shadcn/Radix handle z-index and portal behavior by default
- Only adjust if conflicts arise with the HeroSection (nav is currently `z-50`)

### Accessibility
- Preserve **full Radix a11y defaults**: keyboard navigation (Tab/Arrow keys), Escape to close, ARIA attributes, focus management

---

## 6. Mobile Navigation (NEW — not in original spec)

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

### Mobile overlay
- **Full-screen overlay** that fades in over the page
- **Solid white background** (`#FFFFFF`)
- **Body scroll locked** when overlay is open (prevent page scroll behind overlay)
- **Overlay itself scrolls** if the menu content exceeds viewport height
- Overlay appears below the nav bar (nav bar stays fixed and visible)

### Mobile overlay content
- **Navigation sections** as **tap-to-expand accordions**
  - Financing (accordion) → expands to show same items as desktop dropdown
  - Programs (accordion) → expands to show same items as desktop dropdown
  - Resources (accordion) → expands to show same items as desktop dropdown
  - About → simple link (no accordion)
- **CTA section at the bottom:**
  - Phone number: `(888) 555-0199`
  - "Get Pre-Approved" button — **black background** (`#111111`), matching desktop style
- When a link is tapped → overlay closes automatically

---

## 7. Nav Height

- **Current:** `72px` fixed height
- **Allowed:** Minor flex between **72–80px** if needed to accommodate dropdown trigger chevrons
- If height changes, **update HeroSection's `pt-[72px]`** to match the new value

---

## 8. Brand Style Consistency

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

---

## 9. Verification Checklist

After implementation, verify:

- [ ] Logo and nav items are grouped as a left-aligned cluster
- [ ] "Calculator" is renamed to "Resources"
- [ ] All nav hrefs are `#` (placeholder)
- [ ] shadcn navigation-menu is installed and functional
- [ ] Hover opens dropdowns on desktop with rich card content
- [ ] Horizontal slide transition between dropdowns (~150ms)
- [ ] Small caret arrow on dropdown panels
- [ ] Card hover states show background tint
- [ ] Desktop CTA/phone remains visible when dropdown is open
- [ ] Hamburger icon appears below md breakpoint (two-bar Vercel style)
- [ ] Hamburger animates to X on open
- [ ] Mobile overlay is full-screen, solid white, scroll-locked
- [ ] Accordion sections work in mobile overlay
- [ ] Mobile overlay includes CTA (black) and phone at bottom
- [ ] HeroSection is visually UNCHANGED (arc animation, images, layout)
- [ ] Nav height is between 72–80px
- [ ] All Radix a11y keyboard navigation works
- [ ] shadcn CSS variables mapped to brand HSL colors
- [ ] No style conflicts with existing components
