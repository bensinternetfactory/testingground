# sticky-nav-rm

Reusable sticky navigation extracted from the revenue-leak page. Self-contained folder — drop it into any Next.js project.

## Architecture

**Server / Client split:**
- `StickyNav.tsx` — thin server component, passes `NAV_SECTIONS` to `NavClient`
- `NavClient.tsx` — `"use client"` component with all interactive logic

**NavClient features:**
- Desktop: Radix `NavigationMenu` with hover-triggered dropdown panels
- Mobile: hamburger toggle → full-screen overlay with accordion sections
- Escape key closes mobile overlay
- 9 inline SVG icons mapped via `ICON_MAP`

## NavClient Props

```ts
interface NavClientProps {
  sections: readonly NavSection[];
}
```

Each `NavSection` has a `label`, `value`, and `items` array of `NavCardItem`.

## CSS

`NavClient` imports `./sticky-nav.css` which contains 6 keyframe animations for the Radix viewport transitions. These were extracted from `globals.css`.

## Dependencies

| Dependency | Type |
|---|---|
| `@/components/ui/navigation-menu` | Shared Radix primitive wrapper |
| `radix-ui` | NavigationMenu primitive (for `About` link) |
| `next/link` | Routing |
| `next/image` | Logo image |

## Global dependency

The nav reads `--nav-height` (default `72px`) from `:root` in `globals.css`. This variable is also used by hero components for top padding.

## Reduced motion

The `prefers-reduced-motion` block in `globals.css` targets `.hamburger-bar`, `.mobile-overlay`, `.accordion-content`, and `[data-slot="navigation-menu-*"]` selectors. It stays in globals because it mixes nav and non-nav selectors.
