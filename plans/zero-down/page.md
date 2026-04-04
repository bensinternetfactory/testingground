# Zero-Down Page — Phase 2 Refinements

## Context

The zero-down-tow-truck-financing page is the reference implementation for `(programs)/*` routes. Its sidebar + article `BlogLayout` pattern is the blueprint for all future program pages. Phase 2 polishes four specific surfaces: the layout reusability, a missing icon on `ctaBand1`, the related-programs cards, a full refinement of `EquipmentClosingCtaTrucks`, and extending `RippleCtaLink` to cover the bottom link cards.

---

## 1. BlogLayout → shared (programs) layout

**Problem:** `BlogLayout` currently lives inside `zero-down-tow-truck-financing/_components/`. It needs to be the shared layout for all routes in `app/(marketing)/(programs)/`. The other three program routes (`deferred-payment-tow-truck-financing`, `fleet-financing`, `private-party-tow-truck-financing`) are placeholder stubs that will need this layout when built out.

**Change:** Move 4 components to `app/(marketing)/(programs)/_components/`:
- `BlogLayout.tsx`
- `ArticleSidebar.tsx`
- `TableOfContents.tsx`
- `SidebarCta.tsx`

Update imports on `zero-down-tow-truck-financing/page.tsx` to reference the new shared location. Delete the old files from the zero-down `_components/` folder. Keep page-specific sections (ArticleIntro, BusinessCaseSection, etc.) in the zero-down route's `_components/`.

---

## 2. Add icon to ctaBand1

**Change:** Add `iconSrc: "/brand-assets/benefit-icons/zero-down/no-money-down-light.svg"` + `iconAlt: ""` to `ctaBand1` config. `InlineCtaBand` already accepts `iconSrc`/`iconAlt` props — no component change needed.

**File:** `app/(marketing)/(programs)/zero-down-tow-truck-financing/config.ts` (ctaBand1 object)

---

## 3. RelatedProgramsSection — icons + RippleCtaLink

**Problems:**
1. Cards have no icons above the heading
2. "See details →" button doesn't match the site's aesthetic (plain `next/link` + custom pill styling, no ripple)
3. Inline `ArrowIcon` SVG duplicates RippleCtaLink's built-in arrow nudge

**Changes:**
- **Add icon above each card heading** (homepage `ProgramCards` mapping):

| Program slug | Icon path |
|---|---|
| `deferred-payment-tow-truck-financing` | `/brand-assets/benefit-icons/deferment/deferment-180-dark.svg` |
| `fleet-financing` | `/brand-assets/benefit-icons/terms/terms-dark.svg` |
| `private-party-tow-truck-financing` | `/brand-assets/benefit-icons/hook/hook-dark.svg` |

Icon placement: above the card heading (h3 for program name). Size: `h-10 w-auto` with `mb-4` spacing. Follow the `ProgramCards` visual pattern from the homepage.

- **Replace the button with `<RippleCtaLink variant="outline" />`** using `label="See details"`. Remove the inline `ArrowIcon` SVG and the custom `bg-[#F0FDF4]` pill styling. RippleCtaLink handles arrow animation on hover.

**File:** `app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/RelatedProgramsSection.tsx`

---

## 4. BottomLinkCards — add ripple press feedback

**Problem:** User likes the current slim-card aesthetic but wants the same tactile press/hover feedback as `RippleCtaLink` on mobile + desktop.

**Change:** Add a new variant to `RippleCtaLink` (proposed name: `variant="nav-card"`) that:
- Matches BottomLinkCards' current visual style (slim card, inset border, subtle bg)
- Keeps the ripple press feedback + arrow-nudge-on-hover that RippleCtaLink provides
- Wraps `next/link` like other RippleCtaLink variants

Then update `BottomLinkCards.tsx` to use `<RippleCtaLink variant="nav-card" />` for each card.

**Alternative (simpler):** Extract the ripple feedback logic into a small hook (`usePressRipple`) that BottomLinkCards applies to its existing Link elements. Cleaner if we don't want to overload RippleCtaLink variants.

**Files:**
- `components/ui/ripple-cta-link/RippleCtaLink.tsx` (add variant OR extract hook)
- `app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/BottomLinkCards.tsx` (apply ripple)

---

## 5. EquipmentClosingCtaTrucks — full rebuild per sketch

**Theme:** Dark (`#101820`) — matches current closing CTA pattern and SidebarCta.

**New structure (per sketch):**
```
┌────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░░░░░░░ [ ○ icon ] ░░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░░░░░░ GREEN EYEBROW ░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░ Large centered white heading ░░░░░░░│
│ ░░░░░░░░░░ white/72 subheading copy ░░░░░░░░░│
│ ░░░░░░░┌──┐ ┌──┐ ┌──┐ ┌──┐░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░│🚛│ │🚚│ │🏗│ │⚙│░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░└──┘ └──┘ └──┘ └──┘░░░░░░░░░░░░░░░░░░│
└────────────────────────────────────────────────┘
  Content vertically centered, tiles below copy
```

**Content fields (all centered):**
1. **Icon** (`iconSrc`, `iconAlt`) — ~48px circle/svg at top
2. **Eyebrow** — uppercase green (`#22C55E`), tracking-[0.14em]
3. **Heading** — large serif/sans-bold white, `text-3xl sm:text-4xl md:text-5xl`
4. **Subheading** — body copy, `text-white/72`, `text-base sm:text-lg`
5. **Truck tiles** — 4 tiles below subheading

**Grid:**
- Desktop (`md:`+): `grid-cols-4 gap-4` (single row)
- Mobile: `grid-cols-2 gap-3` (2×2)

**Tile behavior:** Each tile is a **direct drawer trigger** (`href={DRAWER_HASH}`) — clicking/tapping opens the pre-approval drawer immediately. No selection state, no separate CTA button. This is DIFFERENT from `FramedTileSelector` (which uses select-then-confirm).

**Tile styling (dark-themed, inspired by FramedSelectionTile):**
- Container: `rounded-2xl border-2 border-white/15 bg-white/5 p-4 md:p-6`
- Hover/focus: `hover:border-[#22C55E] hover:bg-white/10`
- Active/pressed: scale feedback via RippleCtaLink OR custom motion
- Icon: truck green SVG, `h-10 w-auto md:h-12`
- Label: white, `text-sm md:text-base font-medium`

**Truck icons** (reuse existing):
- Rollback: `/brand-assets/truck-icons/rollback/rollback-green.svg`
- Wrecker: `/brand-assets/truck-icons/wrecker/wrecker-green.svg`
- Heavy Wrecker: `/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg`
- Rotator: `/brand-assets/truck-icons/rotator/rotator-green.svg`

**Files:**
- `components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx` (rebuild)
- `components/sections/page/equipment-closing-cta/config.ts` (extend schema: add `iconSrc`, `iconAlt`, `eyebrow`, `headline`, `subheading`, `tiles[]`)
- `app/(marketing)/(programs)/zero-down-tow-truck-financing/config.ts` (populate new closingCta config)

---

## Critical Files

| File | Action |
|---|---|
| `app/(marketing)/(programs)/_components/BlogLayout.tsx` | **Create** (move from zero-down) |
| `app/(marketing)/(programs)/_components/ArticleSidebar.tsx` | **Create** (move) |
| `app/(marketing)/(programs)/_components/TableOfContents.tsx` | **Create** (move) |
| `app/(marketing)/(programs)/_components/SidebarCta.tsx` | **Create** (move) |
| `app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/{BlogLayout,ArticleSidebar,TableOfContents,SidebarCta}.tsx` | **Delete** (moved) |
| `app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx` | Update 4 imports to new shared path |
| `app/(marketing)/(programs)/zero-down-tow-truck-financing/config.ts` | Add `iconSrc` to ctaBand1; extend closingCta config for new tile structure |
| `app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/RelatedProgramsSection.tsx` | Add icons above headings, swap to RippleCtaLink outline variant |
| `app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/BottomLinkCards.tsx` | Apply ripple press feedback (via new variant or hook) |
| `components/ui/ripple-cta-link/RippleCtaLink.tsx` | Add nav-card variant OR extract press-ripple hook |
| `components/sections/page/equipment-closing-cta/EquipmentClosingCtaTrucks.tsx` | Full rebuild (centered dark layout, icon + eyebrow + heading + subheading + tile row) |
| `components/sections/page/equipment-closing-cta/config.ts` | Extend schema with new fields |

---

## Verification

1. `npm run lint`
2. `npm run build`
3. Dev server + browser check at 1440px, 2560px, and mobile (375/768px):
   - BlogLayout still renders correctly after the move
   - ctaBand1 shows the no-money-down icon
   - RelatedProgramsSection: icons above headings, outline RippleCtaLink buttons
   - BottomLinkCards: ripple press feedback works on mobile tap + desktop click
   - EquipmentClosingCtaTrucks: centered icon/eyebrow/heading/subheading, 4 tiles in a row (desktop) or 2×2 (mobile), tile taps open drawer
4. Click each closing CTA tile → pre-approval drawer opens

---

## Out of Scope

- Building out content for the other 3 program stub pages
- Rewriting `FramedTileSelector` (closing CTA is a new component)
- Modifying the pre-approval drawer's internal UI
- Changing the hero, FAQ, or article body sections
- Touching the homepage `ProgramCards` component
