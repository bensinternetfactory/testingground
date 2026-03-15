  # Alternative /rollback-financing Page Spec

  ## Summary

  Create a new rollback financing page concept that replaces the current wording and persuasion model while keeping the page
  tightly focused on one job: get already-motivated operators to click Get Pre-Approved, enter a lightweight pre-approval
  flow, and receive a payment range inside that flow.

  This page should not educate users on whether they need a rollback, coach them on business strategy, or rely on generic
  lender language. It should feel like a premium guided financing product, not a bank landing page. The rollback version is
  the first instance, but the immediate goal is to get this page right before templating it for wrecker and rotator.

  ## Implementation Changes

  ### 1. Core page structure

  Use a lean 5-section structure:

  1. Hero / selector / launch point
  2. Proof block
  3. Light trust bridge
  4. Commercial objection FAQ
  5. Final CTA

  Keep alternate equipment links and any calculator/resource links low-emphasis and late in the page.

  ### 2. Hero behavior and UX

  - Keep the existing hero’s general split-layout direction, but replace the current wording.
  - The hero is the page’s control surface, not just a headline block.
  - Use rollback-specific body-type selector options in the hero.
  - Do not preselect a subtype; require explicit user choice.
  - Primary CTA: Get Pre-Approved.
  - On click/tap, open a premium bottom sheet with iOS-like motion.
  - Bottom sheet step 1: confirm selected rollback subtype and present a slider for how much financing do you need.
  - Slider purpose is combined:
      - increase user commitment
      - make the experience feel fast and productized
      - collect a strong qualification signal before the form
  - After Continue, transfer the user into the pre-approval form with subtype and amount carried forward.

  ### 3. Messaging model

  Use a calm operator confidence voice:

  - direct
  - experienced
  - low-hype
  - specific

  Avoid:

  - generic lender wallpaper like “competitive rates,” “easy financing,” “flexible solutions”
  - startup-focused messaging
  - “should you buy this equipment?” content
  - rate-heavy selling

  Lead the page around this promise:

  - TowLoans is a better way to acquire rollback equipment through financing.
  - The experience is modern and productized.
  - The lender can handle real-world deal shapes.
  - The user can get meaningful payment direction through pre-approval instead of dead-end lender intake.

  ### 4. Section-by-section content spec

  #### Hero

  - Headline should preserve the strength of the current concept but align to the new flow.
  - Body copy should position TowLoans as the financing path for real rollback deals, not generic truck paper.
  - Supporting copy should make the click feel safe and worth it.
  - Secondary links, if used at all, must be visually subordinate.

  #### Proof block

  This is the main persuasive section below the hero.

  - Show why TowLoans fits the actual rollback transaction.
  - Combine:
      - deal-shape specificity
      - time-saving credibility
      - product/process uniqueness
  - Proof themes should include:
      - used rollback deals
      - private seller deals
      - auction / marketplace deals
      - payment-range-first experience
      - approved users selecting payment/term once fully approved
  - Do not center rates.

  #### Light trust bridge

  Keep this short.

  - Do not use a heavy “how it works” section.
  - Use a compact bridge that explains just enough of the flow to remove bait-and-switch fear:
      - click pre-approve
      - answer a few questions
      - see payment range
      - continue only if it fits
  - This section should reduce suspicion without sounding like underwriting docs.

  #### FAQ

  Optimize for commercial objection cleanup, not search sprawl.
  Questions should mainly remove friction from entering pre-approval.
  Prioritize objections around:

  - whether this lender fits the deal
  - whether this wastes time
  - how the payment-range-first process works
  - used / private seller / auction fit
  - down payment flexibility where appropriate
    Keep answers direct and sales-relevant.

  #### Final CTA

  - Repeat the same product action as the hero.
  - Do not pivot to phone-first closing.
  - Reinforce that the fastest path to a straight answer is starting pre-approval now.
  - Keep the close visually strong and consistent with the premium guided-checkout feel.

  ## Public Interfaces / Data Needed

  For this rollback spec, define these content inputs explicitly so they can later inform a shared equipment-page model:

  - rollbackSubtypeOptions[]
  - lightTrustBridgeContent
  - faqItems[]
  - finalCtaCopy

  For the interactive flow:

  - selected rollback subtype must be persisted into the bottom sheet
  - slider amount must persist into the pre-approval form handoff

  ## Test Plan

  - Verify hero selector requires an explicit rollback subtype choice before meaningful progression.
  - Verify Get Pre-Approved opens the bottom sheet instead of immediately navigating away.
  - Verify bottom sheet animation feels premium on mobile and desktop.
  - Verify selected subtype and financing amount carry into the pre-approval flow.
  - Verify the page does not surface dominant calculator leakage above the fold.
  - Verify objection handling is specific to rollback financing and does not drift into generic lending copy.
  - Verify related equipment links, if present, remain late and low-competition.
  - Final validation sequence when implemented:
      - npm run lint
      - npm run build
      - Chrome DevTools MCP runtime validation as the last gate

  ## Assumptions and Defaults

  - The current /rollback-financing page structure is only a reference point; its wording should not be reused.
  - Rollback is the first page to refine; templating for wrecker/rotator happens after this version is proven.
  - The calculator remains de-emphasized, not removed entirely.
  - The page should feel more like Affirm/Bread-style financing UX than traditional commercial lending UX.
  - The spec sho