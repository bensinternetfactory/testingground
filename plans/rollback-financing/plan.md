# Rollback Financing Page Update Spec

## Goal

Clean up and tighten the `/rollback-financing` page so the two-column content feels consistent, the deferred-payment offer feels more compelling, and the purchase/term section has stronger next-step paths without becoming cluttered.

This spec is intended to be clear enough that a new Codex or Claude instance can implement it without having to rediscover the intent.

## References

- Route: `app/rollback-financing/page.tsx`
- Page config: `app/rollback-financing/config.ts`
- Financing offers section: `components/sections/page/financing-offers-split/`
- Purchase + terms wrapper: `components/sections/page/purchase-and-terms/`
- Term slider section: `components/sections/page/term-length-slider/`
- Purchase source section: `components/sections/page/purchase-source-stack/`
- Pre-approval drawer: `components/ui/pre-approval-drawer/`
- Existing tertiary strip pattern: `components/sections/page/tertiary-strip/`
- Related dev notes: `plans/rollback-financing/rollbackdevlog.md`
- Deferred payments destination: `/deferred-payment-tow-truck-financing` from `major-seo.md`

## Scope

This work covers three areas:

1. Update the deferred-payments half of the financing offers split.
2. Fix the shared layout/spacing problem between the purchase-source and term-length content.
3. Add a slim tertiary CTA row below the purchase-and-terms section.

## Desired Outcome

- The financing-offers split and the purchase-and-terms section should feel like the same layout system.
- The deferred-payment offer should add urgency without feeling spammy.
- The term-length section should stay educational, not overly salesy.
- The new CTA row should create clearer next steps without competing with the page’s main funnel.

## 1. Financing Offers Split

### Section

`components/sections/page/financing-offers-split/`

### Required changes

- Update the right-hand offer: `No Payments for Up to 180 Days`.
- Add a promotional-but-professional countdown chip.
- Add a small text CTA at the bottom of that offer for deferred-payment education.

### Countdown chip requirements

- Place the chip inside the right-hand offer.
- On both desktop and mobile, the chip should sit at the top-right, visually across from the icon.
- The chip should feel like part of the offer card content, not like a separate section-level badge.
- Show remaining **days only**. Do not show hours/minutes.
- The countdown is **site-wide**, not per user/session.

### Countdown config behavior

The countdown must be configurable in code.

The implementation should support:

- A configurable anchor/expiry date so the owner can set a real promo window.
- A configurable initial window that can be something other than 30 days, for example 25 or 60.
- An `autoReset` mode.
- If `autoReset` is `true`, once the configured window expires the countdown should automatically restart in **30-day cycles**.
- Future resets should always default to 30 days, even if the initial configured window was different.

The spec does not require a CMS. A code/config-driven solution is fine.

### Chip tone

- Promotional
- Professional
- Not compliance-heavy
- Not flashy or gimmicky

### Example chip copy

- `Offer expires in 27 days`
- `Deferred payment offer ends in 27 days`

Keep the final version short.

### Deferred-payments learn-more link

- Add a text-style CTA at the bottom of the deferred-payments offer.
- This should not look like a full button.
- It can use an arrow treatment if that fits the existing design language.
- Link destination: `/deferred-payment-tow-truck-financing`
- The purpose is to answer questions like:
  - how deferred payments work
  - who they are for
  - what happens after the deferred period
  - what the tradeoffs are
- This information should live on the dedicated page, not on `/rollback-financing`

### Example link copy

- `Learn more about deferred payments`
- `How deferred payments work`

## 2. Shared Two-Column Layout Fix

### Sections involved

- `components/sections/page/financing-offers-split/`
- `components/sections/page/purchase-and-terms/`
- `components/sections/page/term-length-slider/`
- `components/sections/page/purchase-source-stack/`

### Problem to solve

The purchase-and-terms area currently has extra white space on desktop and does not visually match the financing-offers split, even though they are both effectively the same two-column layout pattern.

The goal is not just to hide the symptom. The goal is to fix the layout system so this mismatch does not keep happening.

### Required outcome

- The purchase-and-terms module should visually mirror the financing-offers split on desktop.
- Treat this as a shared layout problem, not just a one-off spacing tweak.
- If needed, extract or introduce a reusable shared two-column section shell/pattern that both modules can use.

### What should match

- Outer section rhythm
- Container width
- Top and bottom spacing
- Internal column spacing
- Divider behavior
- General sizing feel of each half

### Divider behavior

- Desktop: full-height vertical divider between columns
- Mobile: horizontal divider between stacked sections

### Important clarification

The spacing problem being called out is a **desktop issue**.

Mobile should still remain coherent, but the main correction is for desktop parity.

## 3. Term-Length Slider Update

### Section

`components/sections/page/term-length-slider/`

### Required changes

- Rework this section so it reuses the same slider style and interaction feel as the slider in `components/ui/pre-approval-drawer/`
- Reuse the slider’s visual language and interaction model
- The math/lookup logic can remain different because this section is educational and serves a different purpose

### Intent

- This section is primarily **educational**
- It should help the user understand how truck age affects financing term length
- It should not read like a calculator-first or application-first module

## 4. New Slim CTA Row Below Purchase + Terms

### Placement

- Add a slim two-link CTA row immediately **below** the purchase-and-terms section
- This should be a separate strip, not embedded inside one of the two columns
- Show it on **both desktop and mobile**

### Pattern

- Reuse the existing `TertiaryActionsStrip` pattern/component if possible
- It should feel similar in spirit to the hero’s two slim links
- The wording should be shorter and cleaner than the raw intent notes in this doc

### CTA strategy

This row should contain two actions:

1. One action tied to the purchase-source side
2. One action tied to the older-truck / term-length side

This row should feel secondary. It should help users self-select without overpowering the primary page CTAs.

### CTA 1: private-party purchase path

- Intent: speak directly to users buying from a private seller
- Destination: `/private-party-tow-truck-financing`
- This should not open the drawer

#### Example copy

- Eyebrow: `Buying outside a dealership?`
- Label: `Buying a rollback from a private party seller?`

### CTA 2: older-truck uncertainty path

- Intent: address uncertainty about truck age and whether an older rollback still qualifies
- This CTA should open the **same rollback pre-approval drawer flow** used when a user selects a rollback tile in the hero and clicks `Get Pre-Approved`
- It should behave exactly like that existing drawer entry point, including rollback-specific context/title behavior

#### Example copy

- Eyebrow: `Looking at an older rollback?`
- Label: `See if your truck year still works`

Alternative directions are fine as long as they stay focused on truck age, not generic payments or qualification language.

## UX Guidance

- Keep the page feeling clean and direct.
- Do not add extra explanatory bulk just because a new CTA row exists.
- Do not clutter the deferred-payment offer with too much copy.
- The educational slider section should remain simple and readable.
- The urgency chip should add scarcity without making the page feel low-trust.

## Non-Goals

- Do not rewrite the whole `/rollback-financing` page.
- Do not turn the term-length section into a full payment calculator.
- Do not add compliance-heavy legal content as part of this pass.
- Do not move deferred-payment education onto this page; keep that on the dedicated deferred-payments page.
- Do not invent a different drawer flow for the age-related CTA; reuse the existing rollback pre-approval flow.

## Acceptance Criteria

- The deferred-payments offer includes a top-right countdown chip on both desktop and mobile.
- The countdown is site-wide, config-driven, and supports optional auto-reset behavior.
- The deferred-payments offer includes a bottom text link to `/deferred-payment-tow-truck-financing`.
- The purchase-and-terms section no longer has the mismatched desktop white-space issue.
- The purchase-and-terms layout matches the financing-offers split layout pattern closely enough that they feel intentionally related.
- The term slider reuses the pre-approval drawer slider style/interaction feel.
- A new slim two-link CTA strip appears immediately below purchase-and-terms on both desktop and mobile.
- One link routes to `/private-party-tow-truck-financing`.
- The other opens the existing rollback pre-approval drawer flow.
- The new CTA row feels secondary, not like a replacement for the primary page CTA.

## Implementation Notes for the Next Agent

- Start by inspecting the desktop spacing difference between `FinancingOffersSplit` and `PurchaseAndTermsSection`.
- Fix the layout pattern first, then layer in the new CTA row.
- Reuse existing patterns where possible:
  - `TertiaryActionsStrip`
  - pre-approval drawer hash/title behavior
  - pre-approval slider styling
- Keep the implementation config-driven so future copy/date updates do not require structural rewrites.
