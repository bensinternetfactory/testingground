# Rollback Financing Hero Cleanup

  ## Summary

  Update only the hero section of /rollback-financing so the two tertiary actions are clearer, more tappable, and still
  visually secondary to the main CTA.

  The existing pre-approval drawer should be reused:

  - #get-pre-approved opens the current bottom sheet on mobile and modal on desktop.
  - No new modal or financing flow should be created.

  ## Key Changes

  1. Update the two hero tertiary CTAs.

  - Keep the label I found a rollback and need financing.
  - Change its target to the existing drawer hash #get-pre-approved so it opens the current financing sheet/modal.
  - Keep the label What's my buying power?
  - Point it to the future dedicated pre-approval / buying-power page.
  - This CTA should navigate away, not open the drawer.

  2. Restyle the tertiary CTAs as secondary button-like links.

  - Both CTAs should look like buttons, not plain text links.
  - They must remain visually secondary to the primary Get Pre-Approved button.
  - Use a lightweight secondary treatment:
      - outlined or soft-toned surface
      - clear padding and rounded shape
      - inline arrow icon at the end
      - strong hover/focus states
  - Do not style them as filled primary buttons.
  - Keep the arrow purely directional and consistent across both CTAs.
  - On mobile they should feel obviously tappable.
  - On desktop they should still read as secondary actions, not as equal-priority primaries.

  3. Remove the current hero legal text block from the hero body.

  - Remove the inline hero microcopy:
      - No credit check for pre-approval. Full approval uses a soft Experian inquiry, so your score stays untouched.
  - Remove the inline hero disclaimer:
      - All financing is subject to credit review and approval. Terms vary by truck, seller, and business profile.

  4. Add a compact legal footnotes section near the bottom of the page.

  - Add a small, quiet legal section near the bottom of /rollback-financing.
  - Move the removed hero legal statements there as numbered footnotes.
  - Add small superscript-style number markers next to the related hero claims where needed.
  - Keep this implementation page-scoped unless the existing architecture already has a reusable footnote pattern.

  ## Interface / Data Changes

  Update the rollback hero config so it can express:

  - tertiary actions rendered as button-like secondary links
  - an optional trailing arrow icon treatment
  - one tertiary action that opens the existing drawer hash
  - one tertiary action that points to a future route
  - optional footnote markers for hero claims
  - omission of inline microcopy and disclaimer once legal copy moves below

  Prefer a minimal extension of the shared hero config/component over rollback-specific hardcoding.

  ## Test Plan

  - Both tertiary actions render as button-like secondary links with arrows.
  - Tapping I found a rollback and need financing opens the existing bottom sheet.
  - Tapping What's my buying power? navigates to the configured destination and does not open the drawer.
  - Old hero legal text is no longer shown inline.

  2. Desktop /rollback-financing:

  - Both tertiary actions still look like secondary button-style actions with arrows.
  - Clicking I found a rollback and need financing opens the existing centered modal.
  - Old hero legal text is no longer shown inline.
  - Footnote markers appear where referenced and match the bottom legal section.

  3. Footnotes:

  - Every visible marker maps to one bottom legal item.
  - Numbering is stable and readable.
  - No duplicate or orphaned markers appear.

  ## Assumptions

  - Scope stays limited to the /rollback-financing hero plus a new bottom legal section.
  - The current drawer behavior and hash listener remain unchanged.
  - The exact route for What's my buying power? is still a configurable placeholder.
  - The arrow can be an inline icon component or simple decorative arrow glyph, as long as it is visually consistent and
    accessible.