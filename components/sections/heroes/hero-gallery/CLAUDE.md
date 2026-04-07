# hero-gallery

Centered-text hero with currency input field (desktop) or CTA button (mobile), tertiary action links, and two staggered rows of decorative tow truck photos that fade into the next section.

## Usage

```tsx
import { HeroGallery, HERO_GALLERY_CONFIG } from "@/components/sections/heroes/hero-gallery";

<HeroGallery config={HERO_GALLERY_CONFIG} />
```

## Props — `HeroGallery`

| Prop | Type | Description |
|---|---|---|
| `config` | `HeroGalleryConfig` | Full config object (see `config.ts`) |

### `HeroGalleryConfig`

| Property | Type | Required | Description |
|---|---|---|---|
| `headline` | `string` | yes | Primary `<h1>` heading text |
| `subheadline` | `string` | yes | Supporting text below headline |
| `inputPlaceholder` | `string` | yes | Placeholder for the desktop currency input |
| `ctaLabel` | `string` | yes | Label for the desktop form submit button |
| `submitHref` | `string` | yes | Navigation target for desktop form submission (e.g., `"/pre-approval"`) — amount appended as `?amount=` query param |
| `mobileCta` | `{ label: string; href: string }` | yes | Mobile-only primary CTA button — if `href` is a hash, opens the drawer; if a path, navigates |
| `tertiaryLinks` | `TertiaryLink[]` | yes | Secondary action links shown on mobile below the primary CTA |
| `images.row1` | `string[]` | yes | First row of decorative truck image paths |
| `images.row2` | `string[]` | yes | Second row of decorative truck image paths (offset by `8rem`) |

### `TertiaryLink`

| Property | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | yes | Visible link text and analytics label |
| `href` | `string` | yes | Navigation target — typically `DRAWER_HASH` to open the pre-approval drawer |
| `drawerTitle` | `string` | no | Custom heading for the pre-approval drawer when opened via this link |

## Props — `HeroInput` (sub-component)

| Prop | Type | Required | Description |
|---|---|---|---|
| `placeholder` | `string` | yes | Input placeholder text |
| `ctaLabel` | `string` | yes | Submit button label |
| `submitHref` | `string` | no | Navigation target — on submit, navigates to `submitHref?amount={rawDigits}` via `router.push` |
| `onSubmit` | `(amount: string) => void` | no | Callback with raw digit string — takes priority over `submitHref` when both provided. Use from client wrapper parents for custom submit behavior. |

## Server/Client Boundary

- `HeroGallery.tsx` — **server component** (layout, images, text, mobile primary CTA wiring, tertiary links). Zero hydration cost.
- `HeroInput.tsx` — **client component** (`"use client"`). Only interactive element: currency input form with `useRouter` for navigation. This is the sole client boundary in the hero.
- `config.ts` — server-safe data. All values are serializable (no functions). The `submitHref` string bridges the server/client boundary so HeroGallery can configure navigation without passing a function prop.

## Visual States

### Desktop compound input (form)
- **Default**: `border-gray-200`, `bg-white`, `shadow-sm`, `rounded-full`
- **Focus-within**: `ring-2 ring-[#22C55E] ring-offset-2` (green ring on entire compound input)
- **Submit button**: `bg-[#22C55E]` → hover `bg-[#1EA94E]`, `rounded-full`, `text-white`

### Mobile CTA
- Canonical CTA surface (`LeadCta` when `preApprovalTrigger` is present, otherwise `CtaLink`)
- Green primary override (`!bg-[#22C55E]`)
- Full-width, ripple feedback on tap

### Tertiary links (mobile only)
- `RippleCtaLink variant="outline"`, `size="sm"`, `justify="between"`
- Hook icon + label text + chevron right icon
- Rendered in a semantic `<ul>/<li>` list

## Interaction Behavior

- **Live currency formatting**: Controlled input formats on every keystroke (`$50,000`). The `formatCurrency` function strips non-digits, converts to number, and formats with `toLocaleString("en-US")`.
- **Form submission**: `<form onSubmit>` wraps the input + button. Enter key or button click triggers submit. Extracts raw digits and navigates via `router.push(submitHref + "?amount=" + rawDigits)`. Empty amounts are silently ignored.
- **Tertiary links**: Open the pre-approval drawer via `DRAWER_HASH` (`#get-pre-approved`). The `drawerTitle` prop customizes the drawer heading per link.
- **Mobile CTA**: Opens the pre-approval drawer (default config) or navigates to a path.

## Responsive Behavior

| Breakpoint | Desktop input | Mobile CTA + tertiary links | Gallery |
|---|---|---|---|
| < `md` (768px) | Hidden | Visible | Hidden |
| >= `md` | Visible | Hidden | Visible |

- Text is left-aligned on mobile, centered on desktop (`md:text-center`)
- Gallery images scale from `h-40 w-56` to `lg:h-48 lg:w-64`

## Gallery

- **Decorative**: Entire gallery is `aria-hidden="true"` with empty `alt=""` on all images. Screen readers skip it.
- **Loading**: All images use default lazy loading (no `priority`). The text/input is the LCP element, not the gallery.
- **Layout**: Two rows of 7 images. Row 2 is offset by `translateX(8rem)` for a staggered effect.
- **Gradient fade**: Bottom 40% fades from transparent to `#F5F5F5` (next section's background).
- **Color bridge**: `h-8 bg-[#F5F5F5]` div for seamless transition.

## Validation Note

Amount validation is handled by the destination page at `/pre-approval`. When integrating with the pre-approval form, apply existing validation rules to the `amount` query param (e.g., min/max range, numeric checks).

## Dependencies

- `next/image` — gallery images + hook icon in tertiary links
- `next/navigation` — `useRouter` in HeroInput for form submission navigation
- `lucide-react` — `CircleDollarSign` (input icon), `ChevronRight` (tertiary link icon)
- `@/features/cta/client` — canonical mobile primary CTA
- `@/components/ui/ripple-cta-link` — compatibility tertiary action links during migration
- `@/features/pre-approval/drawer/server` — `preApprovalEntryHash` for drawer-entry hash integration
