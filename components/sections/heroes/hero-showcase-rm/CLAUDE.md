# hero-showcase-rm

Arc/carousel hero with rotating image thumbnails, animated headline phrases, and a CTA button.

## Usage

```tsx
import { HeroShowcase, NavTile, HERO_CONFIG } from "@/components/sections/heroes/hero-showcase-rm";

// With config object
<HeroShowcase
  {...HERO_CONFIG}
  footer={
    <>
      {HERO_CONFIG.tiles.map((tile) => (
        <NavTile key={tile.label} label={tile.label} href={tile.href} />
      ))}
    </>
  }
/>
```

## Props — `HeroShowcase`

| Prop | Type | Default | Description |
|---|---|---|---|
| `images` | `readonly (StaticImageData \| string)[]` | — | Unique arc images (repeated to fill 360deg) |
| `headline` | `string` | — | Small label above the rotating phrases |
| `phrases` | `readonly string[]` | — | Cycling phrases (single entry = static, no animation) |
| `cta` | `{ label, href, subtext? }` | — | Primary call-to-action button |
| `footer` | `ReactNode` | — | Slot below the arc (typically `NavTile` cards) |
| `arcConfig` | `{ spacing?, startOffset?, duration?, priorityCount?, sizes? }` | see below | Fine-tune arc layout |
| `phraseInterval` | `number` | `4000` | Milliseconds between phrase changes |

### arcConfig defaults
- `spacing`: 18 (degrees between thumbnails)
- `startOffset`: -90
- `duration`: 300 (seconds for full rotation)
- `priorityCount`: 5 (eagerly loaded images)
- `sizes`: responsive sizes string

## CSS

This component imports `./hero-showcase.css` which defines:
- `@keyframes arc-rotate` — the infinite rotation
- `.arc-thumbnail` — responsive sizing at 56px / 98px / 152px across breakpoints

The CSS is imported automatically via the component. No manual import needed.

## Dependencies

- `framer-motion` — phrase enter/exit animations
- `next/image` — optimized image rendering
