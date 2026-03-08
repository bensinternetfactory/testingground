# resource-hub

Reusable homepage resource cards section with mobile horizontal rail, dual-link cards (title + CTA), and supporting inline links.

## Usage

```tsx
import { ResourceHub, RESOURCE_HUB_CONFIG } from "@/components/sections/page/resource-hub";

<ResourceHub config={RESOURCE_HUB_CONFIG} />
```

## Props -- `ResourceHub`

| Prop | Type | Description |
|---|---|---|
| `config` | `ResourceHubConfig` | Full section content config (see `config.ts`) |

## Config Shape

### `ResourceHubCardData`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique card identifier |
| `title` | `string` | Card title (rendered as clickable link) |
| `description` | `string` | Supporting copy |
| `titleHref` | `string` | Title link destination |
| `linkText` | `string` | CTA label |
| `linkHref` | `string` | CTA destination |
| `iconId` | union | One of supported icon keys |

### `ResourceHubInlineLinkData`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique inline link identifier |
| `prefixText` | `string` | Text shown before the link |
| `linkText` | `string` | Clickable anchor text |
| `linkHref` | `string` | Destination URL |
| `suffixText` | `string?` | Optional trailing text |

## Server/Client Boundary

- `ResourceHub.tsx` -- server component (no `"use client"`)
- Section is server-rendered
- CTA interactions are provided by `RippleCtaLink` (client component)
- `config.ts` is server-safe content data

## Behavior

- Section anchor id is fixed to `resources`
- Mobile (`<sm`) uses horizontal scroll rail with snap behavior
- `sm+` uses 2-column grid and `lg+` uses 4-column grid
- Card title and CTA are both interactive links to the same destination with distinct anchor text

## Dependencies

- `@/components/ui/ripple-cta-link`
- `next/image`
- `next/link`
