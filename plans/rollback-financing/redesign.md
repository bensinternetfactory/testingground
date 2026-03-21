# Rollback Financing Hero Redesign — ASCII Mockups

Five variations of the redesigned hero. All share these constraints from the interview:

- **Primary CTA**: `Get Pre-Approved` — filled dark pill (RippleCtaLink `md`)
- **Tertiary CTAs**: RippleCtaLink outline variant, `sm` size, `border-gray-400`, neutral gray ripple, trailing arrow icon via `icon` prop
  - "I found a rollback and need financing" → `#get-pre-approved` (opens drawer in-place, no scroll)
  - "What's my buying power?" → `/pre-approval` (navigates away)
- **Microcopy & disclaimer**: removed from hero, moved to footnote section
- **Footnotes**: two numbered markers (¹ ²) in body copy only; non-interactive `<sup>` elements
- **Footnote section**: `bg-gray-50` strip placed right above the dark closing CTA section
- **Mobile**: headline + subheading + tiles + primary CTA fill the viewport; tertiary CTAs below the fold, stacked full-width
- **Desktop**: two-column layout; left = content, right = hero image (unchanged)

---

## Mockup 1 — Clean Stack (Recommended)

Minimal vertical layout. Tertiary CTAs stack naturally below CTA with generous spacing.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE (375px)                                                            │
│                                                                            │
│  Need Rollback Financing?                                                  │
│                                                                            │
│  We'll pre-approve you for your next truck in                              │
│  less than 30 seconds.¹ Know your payment                                  │
│  before you apply.²                                                        │
│                                                                            │
│  What do you need financing on?                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Light-Duty Rollback        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Medium / Heavy-Duty        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │                                         │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │      Get Pre-Approved     →     │    │ ← filled dark pill            │
│  │  └─────────────────────────────────┘    │                               │
│  └─────────────────────────────────────────┘                               │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD ─ ─ ─ ─ ─ ─ ─ ─ ─                                │
│                                                                            │
│  (mt-8 spacing)                                                            │
│                                                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  I found a rollback and need financing →│  ← outline, sm, gray-400      │
│  └─────────────────────────────────────────┘                               │
│  ┌─────────────────────────────────────────┐                               │
│  │  What's my buying power?             →  │  ← outline, sm, gray-400      │
│  └─────────────────────────────────────────┘                               │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP (1280px)                                                          │
│                                                                            │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────┐    │
│  │                                  │  │                              │    │
│  │  Need Rollback Financing?        │  │                              │    │
│  │                                  │  │       ┌──────────────┐       │    │
│  │  We'll pre-approve you for your  │  │       │              │       │    │
│  │  next truck in less than 30      │  │       │  🚛 TRUCK    │       │    │
│  │  seconds.¹ Know your payment     │  │       │    IMAGE     │       │    │
│  │  before you apply.²              │  │       │              │       │    │
│  │                                  │  │       │              │       │    │
│  │  What do you need financing on?  │  │       └──────────────┘       │    │
│  │  ┌──────────┐ ┌──────────┐      │  │                              │    │
│  │  │ Light-   │ │ Med/Hvy  │      │  │                              │    │
│  │  │ Duty     │ │ Duty     │      │  │                              │    │
│  │  └──────────┘ └──────────┘      │  │                              │    │
│  │                                  │  │                              │    │
│  │  ┌──────────────────────────┐    │  │                              │    │
│  │  │   Get Pre-Approved   →   │    │  │                              │    │
│  │  └──────────────────────────┘    │  │                              │    │
│  │                                  │  │                              │    │
│  │  ┌─────────────────────────┐     │  │                              │    │
│  │  │ I found a rollback... →│      │  │                              │    │
│  │  └─────────────────────────┘     │  │                              │    │
│  │  ┌─────────────────────────┐     │  │                              │    │
│  │  │ What's my buying pwr? →│      │  │                              │    │
│  │  └─────────────────────────┘     │  └──────────────────────────────┘    │
│  │                                  │                                      │
│  └──────────────────────────────────┘                                      │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Mockup 2 — Side-by-Side Tertiary (Desktop)

On desktop, the two tertiary CTAs sit inline on one row. Mobile stays stacked.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE (375px)                                                            │
│                                                                            │
│  Need Rollback Financing?                                                  │
│                                                                            │
│  We'll pre-approve you for your next truck in                              │
│  less than 30 seconds.¹ Know your payment                                  │
│  before you apply.²                                                        │
│                                                                            │
│  What do you need financing on?                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Light-Duty Rollback        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Medium / Heavy-Duty        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │                                         │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │      Get Pre-Approved     →     │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  └─────────────────────────────────────────┘                               │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD ─ ─ ─ ─ ─ ─ ─ ─ ─                                │
│                                                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  I found a rollback and need financing →│                               │
│  └─────────────────────────────────────────┘                               │
│  ┌─────────────────────────────────────────┐                               │
│  │  What's my buying power?             →  │                               │
│  └─────────────────────────────────────────┘                               │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP (1280px)                                                          │
│                                                                            │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────┐    │
│  │                                  │  │                              │    │
│  │  Need Rollback Financing?        │  │                              │    │
│  │                                  │  │       ┌──────────────┐       │    │
│  │  We'll pre-approve you...¹ ²     │  │       │              │       │    │
│  │                                  │  │       │  🚛 TRUCK    │       │    │
│  │  What do you need financing on?  │  │       │    IMAGE     │       │    │
│  │  ┌──────────┐ ┌──────────┐      │  │       │              │       │    │
│  │  │ Light    │ │ Med/Hvy  │      │  │       └──────────────┘       │    │
│  │  └──────────┘ └──────────┘      │  │                              │    │
│  │                                  │  │                              │    │
│  │  ┌──────────────────────────┐    │  │                              │    │
│  │  │   Get Pre-Approved   →   │    │  │                              │    │
│  │  └──────────────────────────┘    │  │                              │    │
│  │                                  │  │                              │    │
│  │  ┌───────────────────┐ ┌───────────────────┐                      │    │
│  │  │ Found a rollback →│ │ Buying power?  → │                       │    │
│  │  └───────────────────┘ └───────────────────┘                      │    │
│  │                                  │  │                              │    │
│  └──────────────────────────────────┘  └──────────────────────────────┘    │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Mockup 3 — Grouped Card with Divider

Tertiary CTAs wrapped in a subtle card container with a thin top border, creating a distinct "secondary actions" zone.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE (375px)                                                            │
│                                                                            │
│  Need Rollback Financing?                                                  │
│                                                                            │
│  We'll pre-approve you for your next truck in                              │
│  less than 30 seconds.¹ Know your payment                                  │
│  before you apply.²                                                        │
│                                                                            │
│  What do you need financing on?                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Light-Duty Rollback        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Medium / Heavy-Duty        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │                                         │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │      Get Pre-Approved     →     │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  └─────────────────────────────────────────┘                               │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD ─ ─ ─ ─ ─ ─ ─ ─ ─                                │
│                                                                            │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐                               │
│  │ ─────────────────────────────────────── │ ← thin border-t gray-200      │
│  │                                         │                               │
│  │  Already have a truck in mind?          │ ← muted label (text-xs)       │
│  │                                         │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │ I found a rollback & need fin →│     │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │ What's my buying power?      →  │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘                               │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP (1280px)                                                          │
│                                                                            │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────┐    │
│  │                                  │  │                              │    │
│  │  Need Rollback Financing?        │  │                              │    │
│  │                                  │  │       ┌──────────────┐       │    │
│  │  Body copy with ¹ ² markers...   │  │       │              │       │    │
│  │                                  │  │       │  🚛 IMAGE    │       │    │
│  │  What do you need financing on?  │  │       │              │       │    │
│  │  ┌──────────┐ ┌──────────┐      │  │       └──────────────┘       │    │
│  │  │ Light    │ │ Med/Hvy  │      │  │                              │    │
│  │  └──────────┘ └──────────┘      │  │                              │    │
│  │                                  │  │                              │    │
│  │  ┌──────────────────────────┐    │  │                              │    │
│  │  │   Get Pre-Approved   →   │    │  │                              │    │
│  │  └──────────────────────────┘    │  │                              │    │
│  │                                  │  │                              │    │
│  │  ──────────────────────────────  │  │                              │    │
│  │  Already have a truck in mind?   │  │                              │    │
│  │  ┌───────────────────┐           │  │                              │    │
│  │  │ Found a rollback →│           │  │                              │    │
│  │  └───────────────────┘           │  │                              │    │
│  │  ┌───────────────────┐           │  │                              │    │
│  │  │ Buying power?   → │           │  │                              │    │
│  │  └───────────────────┘           │  └──────────────────────────────┘    │
│  │                                  │                                      │
│  └──────────────────────────────────┘                                      │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Mockup 4 — Compact Inline Arrows

Tertiary CTAs rendered as compact text-sized pill buttons (extra-tight padding), letting them feel more like enhanced links than full buttons. Arrows are small chevrons.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE (375px)                                                            │
│                                                                            │
│  Need Rollback Financing?                                                  │
│                                                                            │
│  We'll pre-approve you for your next truck in                              │
│  less than 30 seconds.¹ Know your payment                                  │
│  before you apply.²                                                        │
│                                                                            │
│  What do you need financing on?                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Light-Duty Rollback        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Medium / Heavy-Duty        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │                                         │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │      Get Pre-Approved     →     │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  └─────────────────────────────────────────┘                               │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD ─ ─ ─ ─ ─ ─ ─ ─ ─                                │
│                                                                            │
│  ┌───────────────────────────────────────┐                                 │
│  │ I found a rollback and need financing ›│  ← compact pill, thin border   │
│  └───────────────────────────────────────┘                                 │
│  (gap-2)                                                                   │
│  ┌───────────────────────────────────────┐                                 │
│  │ What's my buying power?              › │  ← compact pill, thin border   │
│  └───────────────────────────────────────┘                                 │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP — same left-column layout, compact pills below primary CTA        │
│                                                                            │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────┐    │
│  │                                  │  │                              │    │
│  │  Need Rollback Financing?        │  │       ┌──────────────┐       │    │
│  │                                  │  │       │              │       │    │
│  │  Body copy with ¹ ² markers...   │  │       │  🚛 IMAGE    │       │    │
│  │                                  │  │       │              │       │    │
│  │  Tile selector + Primary CTA     │  │       └──────────────┘       │    │
│  │                                  │  │                              │    │
│  │  ┌─────────────────────────────────────┐                           │    │
│  │  │ Found a rollback and need financing ›│                          │    │
│  │  └─────────────────────────────────────┘                           │    │
│  │  ┌───────────────────────┐       │  │                              │    │
│  │  │ Buying power?        › │      │  │                              │    │
│  │  └───────────────────────┘       │  │                              │    │
│  │                                  │  └──────────────────────────────┘    │
│  └──────────────────────────────────┘                                      │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Mockup 5 — Icon-Led Action Cards

Tertiary CTAs as mini action cards with a leading icon (truck icon for "found a rollback", calculator icon for "buying power"), label, and trailing arrow. More visual weight — works if the hero has room.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE (375px)                                                            │
│                                                                            │
│  Need Rollback Financing?                                                  │
│                                                                            │
│  We'll pre-approve you for your next truck in                              │
│  less than 30 seconds.¹ Know your payment                                  │
│  before you apply.²                                                        │
│                                                                            │
│  What do you need financing on?                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Light-Duty Rollback        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │  🚛  Medium / Heavy-Duty        │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  │                                         │                               │
│  │  ┌─────────────────────────────────┐    │                               │
│  │  │      Get Pre-Approved     →     │    │                               │
│  │  └─────────────────────────────────┘    │                               │
│  └─────────────────────────────────────────┘                               │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD ─ ─ ─ ─ ─ ─ ─ ─ ─                                │
│                                                                            │
│  ┌─────────────────────────────────────────┐                               │
│  │  🚛  I found a rollback and        →    │  ← rounded-xl card,          │
│  │      need financing                     │    bg-gray-50, border         │
│  └─────────────────────────────────────────┘                               │
│  ┌─────────────────────────────────────────┐                               │
│  │  📊  What's my buying power?       →    │  ← rounded-xl card,          │
│  │                                         │    bg-gray-50, border         │
│  └─────────────────────────────────────────┘                               │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP (1280px)                                                          │
│                                                                            │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────┐    │
│  │                                  │  │                              │    │
│  │  Need Rollback Financing?        │  │       ┌──────────────┐       │    │
│  │                                  │  │       │              │       │    │
│  │  Body copy with ¹ ² markers...   │  │       │  🚛 IMAGE    │       │    │
│  │                                  │  │       │              │       │    │
│  │  Tile selector + Primary CTA     │  │       └──────────────┘       │    │
│  │                                  │  │                              │    │
│  │  ┌──────────────────────────┐    │  │                              │    │
│  │  │ 🚛 Found a rollback   → │    │  │                              │    │
│  │  │    and need financing    │    │  │                              │    │
│  │  └──────────────────────────┘    │  │                              │    │
│  │  ┌──────────────────────────┐    │  │                              │    │
│  │  │ 📊 What's my buying   → │    │  │                              │    │
│  │  │    power?                │    │  │                              │    │
│  │  └──────────────────────────┘    │  └──────────────────────────────┘    │
│  │                                  │                                      │
│  └──────────────────────────────────┘                                      │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Footnote Section (shared across all mockups)

Sits right above the dark closing CTA section. Same structure for all 5 variants.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ... (FAQ section ends above)                                              │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  bg-gray-50 · py-6 · text-xs text-[#999] · 2xl containment        │   │
│  │                                                                     │   │
│  │  ¹ No credit check for pre-approval. Full approval uses a soft      │   │
│  │    Experian inquiry, so your score stays untouched.                  │   │
│  │  ² All financing is subject to credit review and approval. Terms    │   │
│  │    vary by truck, seller, and business profile.                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  bg-[#101820] · READY WHEN YOU ARE · dark CTA section              │   │
│  │  ...                                                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Variant Comparison

| # | Style | Pros | Cons | Best for |
|---|-------|------|------|----------|
| 1 | **Clean Stack** | Simplest, fastest to build, minimal DOM | Generic | Default recommendation |
| 2 | **Side-by-Side Desktop** | Compact on desktop, saves vertical space | Labels may truncate | Wide labels that fit |
| 3 | **Grouped Card** | Clear visual zone, contextual label | Extra DOM + styling | Sites with many CTAs |
| 4 | **Compact Inline** | Lightest visual weight, link-like | May feel too subtle | Minimalist designs |
| 5 | **Icon-Led Cards** | Most discoverable, visual anchors | Heaviest, needs icons | High engagement goals |
