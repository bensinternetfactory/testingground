# faq

Reusable FAQ accordion and full FAQ section wrapper. Content is authored as
typed, serializable data so the same source can render UI and JSON-LD safely.

## Usage

```tsx
import {
  FaqSection,
  HOMEPAGE_FAQ_SECTION_CONFIG,
  buildFaqSchema,
} from "@/components/sections/page/faq";

const faqSchema = buildFaqSchema(HOMEPAGE_FAQ_SECTION_CONFIG.faqs);

<FaqSection config={HOMEPAGE_FAQ_SECTION_CONFIG} />
```

## Props

### `FAQ`

| Prop | Type | Description |
|---|---|---|
| `faqs` | `FaqItemData[]` | Accordion items |

### `FaqSection`

| Prop | Type | Description |
|---|---|---|
| `config` | `FaqSectionConfig` | Section heading/eyebrow plus FAQ items |

## Config Shape

### `FaqItemData`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable key |
| `question` | `string` | Visible question |
| `answerText` | `string` | Plain-text answer for JSON-LD |
| `answerContent` | `FaqContentPart[]` | Rendered answer content |

### `FaqContentPart`

- `{ type: "text", value: string }`
- `{ type: "link", value: string, href: string }`

### `FaqSectionConfig`

| Field | Type | Description |
|---|---|---|
| `eyebrow` | `string?` | Optional uppercase label |
| `heading` | `string` | Section title |
| `faqs` | `FaqItemData[]` | FAQ entries |

## Server/Client Boundary

- `FaqSection.tsx` -- server component
- `FAQ.tsx` -- client component for accordion state
- `config.ts` -- server-safe content data and schema helper

## Notes

- Use `buildFaqSchema()` for FAQPage JSON-LD instead of hand-building schema in
  route files.
- Internal links in answers render with `next/link`; other hrefs fall back to
  `<a>`.
