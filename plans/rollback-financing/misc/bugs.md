# /rollback-financing Hero Cleanup Spec

We are only working on the hero section of the `/rollback-financing` page.

## Goal

Polish the existing rollback-financing hero without changing how the flow works.

The current hero has two main problems:

1. On small mobile viewports, the hero is too tall and the primary CTA is pushed below the fold.
2. On desktop, the equipment tiles feel unpolished because hover/selected states cause movement, shadow, and weak click affordance.

This update should make the hero feel tighter, clearer, and more intentional while keeping the current interaction model intact.

## Scope

Only update the hero section.

Do not change:

- Any section below the hero
- Footer or global navigation links
- The overall two-step behavior of the hero
- The icon-only tile concept

## Core Behavior To Preserve

Keep the current hero interaction model:

- User sees the rollback hero
- User selects one of the two rollback type tiles
- Primary CTA remains in place and stays disabled until a tile is selected
- Tapping the CTA after selection continues the same existing flow

Do not introduce:

- A default selected tile
- A different CTA flow
- A bottom-sheet-only selection step
- Visible text labels inside the tiles

## Mobile Requirements

This needs to work down to the smallest mobile viewport in dev tools: `320px` wide.

### Required mobile outcome

On initial load, on mobile widths down to `320px`, the following must be fully visible without scrolling:

- Hero headline
- Selector prompt
- Both rollback tiles
- Primary CTA

It is acceptable if these fall below the fold on small mobile:

- Microcopy
- Disclaimer
- Tertiary links

### Mobile layout guidance

To make this fit properly on small screens:

- Reduce hero vertical space as needed
- Tighten spacing and sizing where necessary
- Shorten and clarify the body copy
- Keep the two tiles side-by-side, even on the smallest mobile widths
- If needed, reduce tile icon size with responsive breakpoints

Do not solve this by changing the hero flow or stacking the tiles vertically.

### Mobile content cleanup

- Remove the text row under the tiles entirely
- Keep the selector prompt, but make it bolder
- Keep the CTA visible in the same position, even while disabled

## Copy Direction

The body copy should be rewritten to be:

- Shorter
- Clearer
- More specific to rollback financing

The revised copy should communicate the core offer more clearly and avoid awkward phrasing like `bank rules`.

The updated body copy should include the most relevant points:

- Used rollback financing
- Private-seller deals
- Auction deals
- Deferred / no payments for up to 180 days

Do not create a separate mobile-only copy variant. Use one improved body copy that works across breakpoints.

## Desktop Tile Interaction Requirements

The desktop tile interaction needs cleanup.

### Hover behavior

- No layout shift
- No physical movement
- No lift effect
- No shadow on hover
- Cursor must clearly indicate clickability with `cursor: pointer`
- Hover state should use the same green visual family as the selected state

### Selected state

- No shadow when selected
- No movement when selected
- Use a green border treatment
- Use a light green tinted background
- Keep the styling polished and restrained

## Links Inside The Hero

- Remove the hero-local `Tow truck financing` link that currently links back to the homepage
- Do not remove or change any other `Tow truck financing` links outside the hero
- Keep the existing tertiary hero links where they are
- It is fine if those tertiary links sit below the fold on mobile

## Typography / Visual Direction

- Increase the visual weight of the hero `h1`
- Match the stronger heading feel used on the homepage hero
- Make the selector prompt visually stronger than it is now
- Overall polish should come from spacing, sizing, and cleaner states rather than decorative effects

## Accessibility Requirements

Maintain the current accessibility behavior while making these UI changes.

That includes:

- Keep icon-only tiles accessible via their labels
- Preserve clear keyboard focus states
- Preserve button semantics and disabled-state behavior
- Do not reduce usability for keyboard or assistive technology users

## Acceptance Criteria

The work is complete when all of the following are true:

1. On mobile widths down to `320px`, the headline, selector prompt, both tiles, and primary CTA are fully visible on initial load without scrolling.
2. The helper/status text beneath the tiles is removed.
3. The hero-local homepage `Tow truck financing` link is removed.
4. The hero body copy is shorter, clearer, and includes the rollback-specific financing points listed above.
5. The tiles remain side-by-side on small mobile widths.
6. Tile hover on desktop has no movement, no layout shift, no shadow, and shows a pointer cursor.
7. Selected tiles use a green border plus light green tint, with no shadow.
8. The hero feels more polished without changing the existing flow.
9. Only the hero is changed.
