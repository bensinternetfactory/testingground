# Rollback Financing Hero — Concept Selection

## Audit Summary

**Current state observed** (iPhone SE + iPhone 16 Pro Max screenshots + code review):

- Hero uses `HeroConvert` server component with `TileSelector` client boundary
- Two tiles in a `grid-cols-2` layout with `gap-2.5 sm:gap-3`
- Icons: custom rollback SVGs at `h-6 w-auto sm:h-8` (24px → 32px tall)
- Labels are **sr-only** — sighted users see only the truck silhouette
- Tiles: `min-h-[4rem] sm:min-h-24`, `rounded-2xl`, 2px border, white bg
- Selection: green border (#22C55E) + mint bg (#F2FBF5) on tap
- CTA disabled until a tile is selected
- Desktop: 2-column hero grid (content left, truck photo right); photo hidden on mobile
- Overall feel: functional, clean, but the tiles look small and utilitarian — not premium

**Key constraints:**
- SVG artwork is locked (no redraws)
- Two categories only (light-duty / medium-heavy)
- Selection + CTA behavior unchanged
- Icons are injected as ReactNode props — fully decoupled from component

---

## 10 Concept Directions

---

### Concept 1: "Gallery Cards"

**Design intent:** Give each tile the presence of a product card with visible labels, shadows, and generous padding.

```
Desktop (left column of hero):
┌─────────────────────────────────────────────┐
│  Choose your rollback type to continue.     │
│                                             │
│  ┌───────────────────┐ ┌───────────────────┐│
│  │                   │ │                   ││
│  │   ┈┈🚛┈┈         │ │   ┈┈🚛🚛┈┈       ││
│  │                   │ │                   ││
│  │   Light-Duty      │ │  Medium / Heavy   ││
│  │   Rollback        │ │  Duty Rollback    ││
│  └───────────────────┘ └───────────────────┘│
│                                             │
│  [ Get Pre-Approved ]                       │
└─────────────────────────────────────────────┘
```

**Mobile note:** Same 2-column layout, tiles grow taller (~120px min-h) so icon + two-line label stack comfortably. Label sits below the icon with a small divider or spacing.

**What changed:** Icons enlarged to ~48px tall. Visible text labels added below each icon. Tiles get `shadow-sm` and increased padding (p-5 sm:p-6). Min-height jumps to 120–140px.

**Advantages:**
- Adds the text label back for sighted users, eliminating any ambiguity
- Shadow and padding create a more tactile, premium card feel
- Minimal structural change — still a 2-col grid

**Risks:**
- Taller tiles push CTA further down on mobile
- Two-line label on "Medium / Heavy-Duty Rollback" may feel cramped in narrow columns

---

### Concept 2: "Full-Width Stack"

**Design intent:** Replace the side-by-side grid with a vertical stack. Each tile spans full width with icon left, label right — like a settings menu or product list.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────┐
│  Choose your rollback type to continue.      │
│                                              │
│  ┌──────────────────────────────────────────┐│
│  │  ┈┈🚛┈┈    Light-Duty Rollback          ││
│  └──────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────┐│
│  │  ┈┈🚛🚛┈┈  Medium / Heavy-Duty Rollback ││
│  └──────────────────────────────────────────┘│
│                                              │
│  [ Get Pre-Approved ]                        │
└──────────────────────────────────────────────┘
```

**Mobile note:** Tiles remain full-width stacked. Icon left (40px), label right. Each tile ~64px tall. Compact vertical rhythm.

**What changed:** Grid switches from `grid-cols-2` to `grid-cols-1`. Icon and label sit in a horizontal flex row inside each tile. Label is visible, not sr-only.

**Advantages:**
- Full-width tiles feel deliberate and substantial
- Horizontal icon-label pairing is highly scannable
- Extremely clean mobile layout with minimal wasted space

**Risks:**
- Vertical stack takes more vertical space than side-by-side
- May feel more like a form radio group than a premium selector

---

### Concept 3: "Showcase Pedestals"

**Design intent:** Dramatically enlarge the icons and place them on tinted background "stages" — the icon is the hero within the tile, with the label as a small caption beneath.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────┐
│  Choose your rollback type to continue.      │
│                                              │
│  ┌───────────────────┐ ┌───────────────────┐ │
│  │  ░░░░░░░░░░░░░░░  │ │  ░░░░░░░░░░░░░░░ │ │
│  │  ░░░            ░  │ │  ░░░            ░ │ │
│  │  ░░  ┈┈🚛┈┈    ░  │ │  ░░  ┈┈🚛🚛┈┈  ░ │ │
│  │  ░░░            ░  │ │  ░░░            ░ │ │
│  │  ░░░░░░░░░░░░░░░  │ │  ░░░░░░░░░░░░░░░ │ │
│  │   Light-Duty       │ │  Medium / Heavy   │ │
│  └───────────────────┘ └───────────────────┘ │
│                                              │
│  [ Get Pre-Approved ]                        │
└──────────────────────────────────────────────┘
```

**Mobile note:** Same 2-column layout. Pedestal area has a subtle mint/gray tint (#F7FCF8 or #F5F5F5). Icon scales to ~56px. Label below pedestal at `text-xs` or `text-sm`.

**What changed:** Icons enlarged 2.5–3× (to ~56–64px). Each tile has an inner "stage" area with a tinted background (rounded-xl, p-4). Label moves below the stage as visible caption text. Tiles grow to ~160px min-h.

**Advantages:**
- Icons become the visual centerpiece — premium product-showcase feel
- Tinted inner stage adds depth without adding borders or shadows
- Clear visual hierarchy: stage → icon → label

**Risks:**
- Tall tiles push CTA significantly below the fold on small screens
- Inner stage + outer tile border may feel over-decorated

---

### Concept 4: "Split Hero Takeover"

**Design intent:** The two tiles expand to dominate the hero area. Instead of sitting inside a content column, they become large side-by-side panels that feel like the primary visual — almost replacing the hero image on mobile.

```
Desktop (full hero width):
┌────────────────────────────────────────────────────────────────┐
│  Rollback Tow Truck Financing                                  │
│  Finance used rollback trucks...                               │
│                                                                │
│  ┌──────────────────────────┐ ┌──────────────────────────────┐ │
│  │                          │ │                              │ │
│  │                          │ │                              │ │
│  │       ┈┈🚛┈┈             │ │       ┈┈🚛🚛┈┈              │ │
│  │                          │ │                              │ │
│  │    Light-Duty Rollback   │ │  Medium / Heavy-Duty         │ │
│  │                          │ │  Rollback                    │ │
│  └──────────────────────────┘ └──────────────────────────────┘ │
│                                                                │
│              [ Get Pre-Approved ]                              │
└────────────────────────────────────────────────────────────────┘
```

**Mobile note:** Tiles stack vertically at full width, each ~140px tall. The headline + body are compact above. The tiles are the visual event.

**What changed:** The hero layout shifts. Instead of a 2-col (content | image) desktop grid, the content area uses the full hero width. The truck photo is removed or pushed to a background treatment. Tiles expand to fill available width with large icons (~64px) and centered visible labels.

**Advantages:**
- The selection tiles become the dominant visual — no competing hero image
- Maximum icon display size creates a confident, product-forward impression
- Bold departure that genuinely elevates the tile prominence

**Risks:**
- Losing the hero image removes environmental context (a real truck photo)
- May feel too sparse on desktop without the photo counterweight
- Bigger structural change to HeroConvert's grid

---

### Concept 5: "Inline Pill Selector"

**Design intent:** Compact, horizontal pill/chip design. Icons are small but paired with visible text labels inline. The selector feels lightweight and integrated into the copy flow.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────┐
│  Rollback Tow Truck Financing                │
│  Finance used rollback trucks...             │
│                                              │
│  Choose your rollback type:                  │
│                                              │
│  ┌─ ┈🚛┈ Light-Duty ─┐  ┌─ ┈🚛🚛┈ Med/Hvy ─┐│
│  └────────────────────┘  └────────────────────┘│
│                                              │
│  [ Get Pre-Approved ]                        │
└──────────────────────────────────────────────┘
```

**Mobile note:** Pills remain side-by-side but with shorter labels ("Light-Duty" / "Med / Heavy"). Height ~48px. Very compact — CTA stays close to viewport center.

**What changed:** Tiles shrink in height but gain visible inline text labels. Border-radius increases to `rounded-full` or `rounded-3xl` for pill shape. Icon and label sit in a single horizontal line. Min-height drops to ~48–56px.

**Advantages:**
- Extremely compact — CTA stays high on mobile screens
- Inline text + icon removes all ambiguity while staying lightweight
- Feels modern and app-like

**Risks:**
- Small tiles may not feel "premium" — more utilitarian/app-like
- "Medium / Heavy-Duty Rollback" label is long for a pill; needs abbreviation
- Reduced icon size may diminish the custom SVG artwork

---

### Concept 6: "Editorial Feature Cards"

**Design intent:** Tiles styled like editorial feature blocks with a thick left accent border, icon, label, and a one-line descriptor — creating an information-rich, magazine-quality feel.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────────┐
│  Choose your rollback type to continue.          │
│                                                  │
│  ┌──┬───────────────────────────────────────────┐│
│  │▌ │  ┈┈🚛┈┈  Light-Duty Rollback              ││
│  │▌ │           Class 3–5 · Single-axle beds     ││
│  └──┴───────────────────────────────────────────┘│
│  ┌──┬───────────────────────────────────────────┐│
│  │▌ │  ┈┈🚛🚛┈┈  Medium / Heavy-Duty Rollback   ││
│  │▌ │             Class 6–8 · Tandem & tri-axle  ││
│  └──┴───────────────────────────────────────────┘│
│                                                  │
│  [ Get Pre-Approved ]                            │
└──────────────────────────────────────────────────┘
```

**Mobile note:** Full-width stacked cards. Thick green left border (4px) provides color accent. Label + descriptor wrap naturally. Each card ~80px tall.

**What changed:** Grid switches to `grid-cols-1`. Each tile gains a 4px left border in brand green. Visible label (semibold) + descriptor line (text-sm, muted) appear to the right of the icon. This is a richer information design.

**Advantages:**
- Descriptor line adds expert credibility (class ratings, axle types)
- Left accent border provides a subtle premium/editorial feel
- Highly scannable on mobile — reads like a curated selection list

**Risks:**
- Descriptor copy needs to be accurate and maintained
- Slightly more content to manage in config
- May feel more informational than transactional

---

### Concept 7: "Tab Selector"

**Design intent:** The two options present as tabs rather than tiles. Selecting a tab visually "activates" that panel, with the icon enlarging inside the active area.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────────┐
│  Choose your rollback type:                      │
│                                                  │
│  ┌─────────────────┬─────────────────┐           │
│  │  Light-Duty ▼   │  Med / Heavy    │  ← tabs  │
│  ├─────────────────┴─────────────────┤           │
│  │                                   │           │
│  │         ┈┈🚛┈┈                    │  ← panel  │
│  │    Light-Duty Rollback            │           │
│  │    For single-axle flatbeds       │           │
│  │                                   │           │
│  └───────────────────────────────────┘           │
│                                                  │
│  [ Get Pre-Approved ]                            │
└──────────────────────────────────────────────────┘
```

**Mobile note:** Tabs span full width (50/50). Active panel shows large icon + label. Tab switch is instant (no animation delay). Panel height fixed to prevent layout shift.

**What changed:** Grid replaced by a tab bar + panel pattern. Only the selected tile's icon is displayed large inside a content panel. Unselected tab shows only text. The icon gets maximum display real estate.

**Advantages:**
- The active icon gets full attention at large size
- Tab pattern is universally understood
- Reduces visual noise — one icon visible at a time

**Risks:**
- Users can't compare the two icons simultaneously
- Tab UI may feel like navigation rather than selection
- Bigger implementation departure from current tile grid

---

### Concept 8: "Oversized Icons, Minimal Frame"

**Design intent:** Dramatically scale the icons (3–4× current) and remove almost all tile chrome. The icons float with just a subtle interaction ring — the artwork itself carries the premium weight.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────────┐
│  Choose your rollback type to continue.          │
│                                                  │
│                                                  │
│       ┈┈┈┈┈🚛┈┈┈┈┈         ┈┈┈┈┈🚛🚛┈┈┈┈┈      │
│                                                  │
│       Light-Duty            Medium / Heavy       │
│                                                  │
│                                                  │
│  [ Get Pre-Approved ]                            │
└──────────────────────────────────────────────────┘
```

**Mobile note:** Icons at ~72px tall, centered in their column. Label below in `text-sm`. No visible tile border — selected state shown via a subtle circular/pill background wash behind the icon. Very airy.

**What changed:** Icons scale to 64–80px tall. Tile border removed entirely (`border-transparent`). Background is transparent by default; selected state uses a soft radial wash or pill highlight. Label is visible below, small and muted. Generous negative space around each icon.

**Advantages:**
- Maximum showcase of the custom SVG artwork
- Stripped-down chrome feels confident and high-end
- The icons do the talking — very visual-first

**Risks:**
- Without borders, the interactive affordance is weak — may not read as tappable
- Hover/focus states need extra care to signal interactivity
- Very minimal aesthetic may not match the rest of the page's bordered sections

---

### Concept 9: "Badge Blocks"

**Design intent:** Square aspect-ratio tiles with the icon centered above a visible label. Badge-like presentation — think app icons or product category selectors.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────────┐
│  Choose your rollback type to continue.          │
│                                                  │
│      ┌─────────────┐     ┌─────────────┐        │
│      │              │     │              │        │
│      │   ┈┈🚛┈┈    │     │  ┈┈🚛🚛┈┈   │        │
│      │              │     │              │        │
│      │  Light-Duty  │     │  Med / Hvy   │        │
│      │  Rollback    │     │  Rollback    │        │
│      └─────────────┘     └─────────────┘        │
│                                                  │
│  [ Get Pre-Approved ]                            │
└──────────────────────────────────────────────────┘
```

**Mobile note:** Tiles maintain square aspect ratio (~140×140px on larger phones, ~110×110 on SE). Centered in the viewport with even spacing. Icon at ~44px, label at `text-sm` below.

**What changed:** Tiles switch to `aspect-square` with content centered vertically and horizontally. Icon stacks above visible label. Border-radius stays `rounded-2xl`. Tiles may get a very subtle background tint (#FAFAFA) to create depth.

**Advantages:**
- Square tiles feel like product category selectors — familiar premium e-commerce pattern
- Centered composition is balanced and visually calm
- Good icon-to-label ratio with clear hierarchy

**Risks:**
- Square tiles are wider than needed on desktop — may waste horizontal space
- "Medium / Heavy-Duty Rollback" needs to be abbreviated to fit
- Square aspect may look odd if tiles are too small on SE-width screens

---

### Concept 10: "Split Tier Cards"

**Design intent:** Each tile has two visual zones — a top zone with the icon on a tinted background, and a bottom zone with the label on white. Creates a structured, premium product-card hierarchy.

```
Desktop (left column of hero):
┌──────────────────────────────────────────────────┐
│  Choose your rollback type to continue.          │
│                                                  │
│  ┌─────────────────────┐ ┌─────────────────────┐ │
│  │ ░░░░░░░░░░░░░░░░░░ │ │ ░░░░░░░░░░░░░░░░░░ │ │
│  │ ░░              ░░ │ │ ░░              ░░ │ │
│  │ ░░   ┈┈🚛┈┈    ░░ │ │ ░░  ┈┈🚛🚛┈┈   ░░ │ │
│  │ ░░              ░░ │ │ ░░              ░░ │ │
│  │ ░░░░░░░░░░░░░░░░░░ │ │ ░░░░░░░░░░░░░░░░░░ │ │
│  │─────────────────────│ │─────────────────────│ │
│  │  Light-Duty         │ │  Medium / Heavy     │ │
│  │  Rollback           │ │  Duty Rollback      │ │
│  └─────────────────────┘ └─────────────────────┘ │
│                                                  │
│  [ Get Pre-Approved ]                            │
└──────────────────────────────────────────────────┘
```

**Mobile note:** Same 2-column layout. Top zone uses mint tint (#F2FBF5) or light gray (#F5F5F5). Icon at ~48px inside the tinted zone. Label zone below in white, `text-sm font-medium`. Total tile height ~150–160px.

**What changed:** Each tile is divided into two internal zones. Top: tinted background area housing the icon with generous padding. Bottom: white area with visible label text. The tile retains its `rounded-2xl` outer border. The internal split creates clear visual separation between illustration and identification.

**Advantages:**
- Two-zone card is a premium e-commerce pattern (think Stripe, Apple product cards)
- Icon and label have distinct visual layers — clean hierarchy
- Tinted top zone makes the SVG artwork pop without competing with the label

**Risks:**
- Tallest tile concept — significant vertical space on mobile
- Internal zone split adds visual complexity
- May feel over-structured for a binary choice

---

## Review Against Rubric

| # | Concept | Premium Feel | Mobile Scan | Class Distinction | Page Coherence | Unique? |
|---|---------|:---:|:---:|:---:|:---:|:---:|
| 1 | Gallery Cards | ●●●○ | ●●●○ | ●●●● | ●●●● | Yes |
| 2 | Full-Width Stack | ●●●○ | ●●●● | ●●●● | ●●●○ | Yes |
| 3 | Showcase Pedestals | ●●●● | ●●○○ | ●●●○ | ●●●○ | Yes |
| 4 | Split Hero Takeover | ●●●● | ●●●○ | ●●●● | ●●○○ | Yes |
| 5 | Inline Pill Selector | ●●○○ | ●●●● | ●●●○ | ●●●○ | Yes |
| 6 | Editorial Feature Cards | ●●●● | ●●●● | ●●●● | ●●●● | Yes |
| 7 | Tab Selector | ●●●○ | ●●●○ | ●●○○ | ●●○○ | Yes |
| 8 | Oversized Icons | ●●●● | ●●●○ | ●●●○ | ●●○○ | Yes |
| 9 | Badge Blocks | ●●●○ | ●●●○ | ●●●○ | ●●●● | Yes |
| 10 | Split Tier Cards | ●●●● | ●●○○ | ●●●● | ●●●○ | Yes |

### Rejected Concepts

- **Concept 5 (Inline Pill):** Compact is good for mobile, but the pill shape reduces the icons to thumbnails and doesn't read as premium. Fails criterion 1.
- **Concept 7 (Tab Selector):** Hides one icon at a time, breaking the ability to compare. Tab UI feels like navigation, not product selection. Fails criteria 2 and 3.
- **Concept 4 (Split Hero Takeover):** Bold departure, but removing the hero image breaks coherence with the rest of the site. The image provides environmental trust. Fails criterion 4.
- **Concept 8 (Oversized Icons):** Visually striking but borderless tiles lack interactive affordance. Feels disconnected from the bordered section style used throughout the site. Fails criterion 4.

### Strong Contenders

- **Concept 6 (Editorial Feature Cards):** Scores highest across all criteria. Premium feel from the accent border + descriptor. Excellent mobile scan. Rich information design.
- **Concept 10 (Split Tier Cards):** Most premium visual treatment. The two-zone card is sophisticated. But it's the tallest concept and pushes CTA far down on mobile.
- **Concept 3 (Showcase Pedestals):** Strong icon showcase. But similar CTA-push problem as #10 with less informational payoff.
- **Concept 1 (Gallery Cards):** Solid all-rounder but doesn't push far enough from current state to justify the change.

---

## Winner: Concept 6 — "Editorial Feature Cards"

### Why It Wins

1. **Premium visual feel:** The thick left accent border in brand green creates an editorial, curated impression. The icon + label + descriptor composition reads like a carefully designed product selection — not a utility form control. This is the only concept that adds information depth (class ratings, axle types) without adding visual clutter.

2. **Mobile scan clarity:** Full-width stacked cards are the most scannable mobile pattern. Each card reads left-to-right: green accent → icon → label → descriptor. No wrapping, no cramming, no abbreviation needed. The vertical stack respects thumb-scroll behavior.

3. **Clear class distinction:** The descriptor line ("Class 3–5 · Single-axle beds" vs "Class 6–8 · Tandem & tri-axle") adds expert-level differentiation that the icon silhouettes alone cannot fully communicate. This turns the selection from "which picture looks right?" into "I know exactly which one I need."

4. **Page coherence:** Full-width bordered cards match the page's existing visual language of bordered sections and contained content blocks. The left accent is a new element but doesn't fight the established design system.

5. **Implementation simplicity:** Grid changes from `grid-cols-2` to `grid-cols-1`. Tile internal layout changes from centered icon-only to horizontal flex (icon + text group). Label comes out of sr-only. Config adds a `descriptor` field. No structural changes to HeroConvert itself.

### Premium Signal

The editorial card pattern borrows from financial product selectors (think Stripe pricing cards, banking product choosers). The thick accent border signals "curated option" rather than "generic button." The descriptor line adds domain expertise, reinforcing that TowLoans understands the equipment classes their customers buy.

### Compromises

- Vertical stack takes more vertical space than the current 2-column layout (~160px vs ~96px of tile area)
- Descriptor copy needs to be accurate and maintained — adds a config field
- The thick accent border is a new visual element that doesn't appear elsewhere on the page (yet)

### What Must Remain Unchanged in Implementation

- The rollback SVG files — no artwork changes
- Tile selection state logic and CTA enable/disable behavior
- RippleCtaLink component and its disabled state
- Framer Motion tap/ripple interactions
- aria-pressed, aria-label, and sr-only announcement behavior
- HeroConvert's server/client boundary (TileSelector stays client-only)
- 2xl containment classes on the section

---

## Backup: Concept 10 — "Split Tier Cards"

### Why It's the Backup

Split Tier Cards has the highest raw premium signal — the two-zone card (tinted icon area over white label area) is a pattern used by Apple, Stripe, and luxury e-commerce. If the Editorial Feature Card feels too "informational" in code and not visual enough, Split Tier Cards provides a purely visual premium upgrade path.

### When to Switch

Consider switching to the backup if:
- The editorial accent border feels out of place when coded against the actual page
- The descriptor line feels forced or hard to maintain
- The design review favors a more visual/less textual approach

### Backup Compromises

- Tallest concept (~160px per tile) — CTA drops significantly on iPhone SE
- Two-zone visual treatment adds CSS complexity inside SelectionTile
- No descriptor line means less informational differentiation than the winner

---

## Acceptance Checklist

- [x] 10 concept directions generated
- [x] Each direction is materially different (varies layout, framing, hierarchy, or composition)
- [x] All directions respect the fixed SVG asset constraint
- [x] All directions preserve selection + CTA behavior
- [x] Review against 5-point rubric completed
- [x] One winner selected with reasoning (Concept 6: Editorial Feature Cards)
- [x] One backup selected with switch criteria (Concept 10: Split Tier Cards)
- [x] Implementation constraints documented for handoff
