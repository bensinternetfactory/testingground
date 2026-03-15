# footer

Reusable site footer with typed config for grouped links, contact actions, trust
badges, and legal items.

## Usage

```tsx
import { Footer, FOOTER_CONFIG } from "@/components/sections/page/footer";

<Footer config={FOOTER_CONFIG} />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `config` | `FooterConfig` | Footer content and routing data |

## Config Shape

### `FooterConfig`

| Field | Type | Description |
|---|---|---|
| `logo` | `FooterLogo` | Logo source and destination |
| `columns` | `FooterColumn[]` | Grouped navigation columns |
| `badges` | `string[]` | Trust badge labels |
| `contacts` | `FooterContactLink[]` | `tel:` / `mailto:` style actions |
| `legalLinks` | `FooterLinkItem[]` | Legal items; omit `href` to render as non-interactive text |
| `companyName` | `string` | Used in copyright line |

## Server/Client Boundary

- `Footer.tsx` -- server component
- `config.ts` -- server-safe content data

## Notes

- Internal route links render with `next/link`.
- External/contact links render with `<a>`.
- Missing legal routes are rendered as non-interactive labels instead of broken
  `href="#"` links.
