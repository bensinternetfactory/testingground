# sticky-nav-rm

Reusable sticky navigation extracted from the revenue-leak page. Self-contained folder — drop it into any Next.js project.

## Architecture

**Public API:**
- `index.ts` exports `StickyNav` only.
- Nav data, client wiring, and interactive helpers are private to this folder.

**Server / Client split:**
- `StickyNav.tsx` — server shell for the fixed bar, logo, and static phone link
- `NavDesktopMenu.tsx` — client island for desktop dropdown composition
- `NavClient.tsx` — small client island for current-path CTA resolution and mobile menu state
- `NavHeaderActions.tsx` — desktop CTA and mobile toggle button
- `NavMobileOverlay.tsx` — full-screen mobile dialog, focus containment, and accordion composition
- `useMobileNavState.ts` — mobile open/close and active section state
- `useEscapeKey.ts` / `useScrollLock.ts` — focused side-effect hooks owned by the interactive layer

**Nav item data:**
- `nav-data.ts` uses explicit `NavCardItem` variants instead of one mixed shape.
- Current data is image-backed, but icon-backed items remain supported through the discriminated union.

**Desktop dropdown contract:**
- `NavDesktopMenu.tsx` keeps `NavigationMenuLink asChild` with a direct `next/link` child for each dropdown row.
- `DropdownItem` is presentational only; it renders the visual tile and copy, but it does not own the anchor.
- Row hover/focus treatment must live on the slotted link itself, using the named group `group/nav-item`, so Radix owns one authoritative interactive surface for the row and the icon tile transitions.

## NavClient Props

```ts
interface NavClientProps {
  sections: readonly NavSection[];
}
```

Each `NavSection` has a `label`, `value`, and `items` array of `NavCardItem`.

## CSS

`NavClient` imports `./sticky-nav.css` which contains the Radix viewport transition animations extracted from `globals.css`.

## Dependencies

| Dependency | Type |
|---|---|
| `@/components/ui/navigation-menu` | Shared Radix primitive wrapper |
| `next/link` | Routing |
| `next/image` | Logo image |
| `@/lib/press-feedback` | Shared press/ripple interaction hook used by nav pressables |

## Global dependency

The nav reads `--nav-height` (default `72px`) from `:root` in `globals.css`. This variable is also used by hero components for top padding.

## Reduced motion

The `prefers-reduced-motion` block in `globals.css` targets `.hamburger-bar`, `.mobile-overlay`, `.accordion-content`, and `[data-slot="navigation-menu-*"]` selectors. It stays in globals because it mixes nav and non-nav selectors.
