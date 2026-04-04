# Step 6a: Audit FAQ Section

## Scope

- Executed target: `Step 6a` only
- Files reviewed:
  - `components/sections/page/faq/FaqSection.tsx`
  - `components/sections/page/faq/FAQ.tsx`
  - `components/sections/page/faq/config.ts`
  - `components/sections/page/faq/index.ts`
  - `components/sections/page/faq/CLAUDE.md`
- Conventions reviewed:
  - `vercel-composition-patterns`
  - `vercel-react-best-practices`
  - `next-best-practices`
  - repo-local conventions from `AGENTS.md`
  - local conventions from `components/sections/page/faq/CLAUDE.md`
- Routes validated:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Browser validation: required and completed on port `3005`

## Browser Evidence Notes

- Desktop validation ran on `/rollback-financing#faq` at `1280x900`.
- Mobile validation ran on `/rollback-financing#faq` at a confirmed `390x844` viewport.
- Desktop checks:
  - the FAQ section rendered with the first accordion item expanded by default
  - focus stayed on the active question button after keyboard activation, and pressing `Enter` on the focused first question collapsed it with `aria-expanded="false"`
- Mobile checks:
  - the FAQ section rendered in-flow at `390x844` without visible overflow in the annotated screenshot
  - after a short settle delay, clicking another FAQ question switched the single expanded item from the default first question to the selected question
  - `agent-browser errors` returned no runtime errors during the mobile interaction pass

## Findings

### FIN-schema-016

- Status: `open`
- Severity: `S2-medium`
- Source skill or convention: `next-best-practices`; `vercel-react-best-practices`; local FAQ contract from `components/sections/page/faq/CLAUDE.md`
- Rule ID or rule area: metadata; server-serialization
- Pattern tag: `faq-answer-dual-source-drift`
- Affected components:
  - `FAQ`
  - `FaqSection`
  - `buildFaqSchema`
  - `FaqItemData`
- Affected routes:
  - `/rollback-financing`
  - `/wrecker-financing`
  - `/rotator-financing`
  - `/used-tow-truck-financing`
- Shared dependency impact: every audited financing route that reuses the shared FAQ contract carries two answer representations per item, so UI copy and FAQ schema copy can drift independently and both payloads are serialized through the shared section boundary.
- Local or systemic: `systemic`
- Boundary-only: `no`
- Summary: `FaqItemData` stores both `answerText` and `answerContent`, `buildFaqSchema()` emits only `answerText`, and the client accordion renders only `answerContent`, so schema parity depends on authors manually keeping two answer sources synchronized.
- Why this violates the cited rule: `next-best-practices` favors stable metadata contracts that do not split route-visible content from schema-visible content into manually synced fields, and `vercel-react-best-practices` pushes minimizing duplicated serialized payloads across server and client boundaries. The local `CLAUDE.md` says the same source should render UI and JSON-LD safely, but the current FAQ model duplicates every answer instead of deriving both outputs from one canonical representation. That makes schema drift easy to introduce silently and sends redundant answer data through the shared FAQ contract on every financing route.
- Evidence:
  - [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/config.ts#L14) through [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/config.ts#L18) define both `answerText` and `answerContent` on every `FaqItemData`.
  - [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/config.ts#L27) through [config.ts](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/config.ts#L39) build schema answers only from `answerText`.
  - [FAQ.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/FAQ.tsx#L30) through [FAQ.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/FAQ.tsx#L45) render the rich answer body from `answerContent`, and [FAQ.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/FAQ.tsx#L107) through [FAQ.tsx](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/FAQ.tsx#L108) show the visible panel content never reads `answerText`.
  - [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/CLAUDE.md#L3) through [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/CLAUDE.md#L4) state that the same source should render UI and JSON-LD safely, while [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/CLAUDE.md#L40) through [CLAUDE.md](/Users/benfranzoso/Documents/Projects/copy/components/sections/page/faq/CLAUDE.md#L43) document the two separate answer fields that break that promise.
- Fix direction: make one canonical answer source and derive the other form from it, such as authoring only `answerContent` and flattening it to plain text for schema generation, or introducing a single richer answer model with shared UI/schema serializers.
- First-seen substep: `Step 6a`
- Latest-reviewed substep: `Step 6a`
- Evidence pointer: `plans/reviews/financing-step-06a-faq.md`

## Required Lenses

### Accessibility

- No findings. The shared FAQ uses native `button` controls with `aria-expanded` and `aria-controls`, desktop keyboard activation worked, and focus remained on the active question button after the tested `Enter` interaction.

### Responsive Behavior

- No findings. The FAQ rendered without visible overflow at both `1280x900` and `390x844`, and the mobile accordion still switched the expanded item after the page settled.

### Core Web Vitals Risk

- `FIN-schema-016` is the main risk in this step. Duplicating every answer into both `answerText` and `answerContent` increases the serialized FAQ payload and invites schema/UI drift in a shared section that ships on all audited financing routes.

### Repo Convention Compliance

- `FIN-schema-016` also covers the convention issue here. The local folder contract promises one source for UI and JSON-LD, but the current config shape requires authors to maintain two synchronized answer representations by hand.

## No-Findings Summary

- Accordion behavior: no issue found. The component preserves a single-open-item model and the tested buttons update `aria-expanded` correctly once the page is hydrated.
- Keyboard and focus handling: no issue found. Desktop browser validation confirmed `Enter` activation works on the focused accordion button and focus remains on the control after toggling.
- Hydration and runtime stability: no issue found. The mobile pass required a brief settle delay after navigation, but after that delay the accordion responded to clicks and `agent-browser errors` showed no runtime exceptions.
