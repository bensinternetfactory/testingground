 # Homepage Closing CTA Refactor Spec

  ## Summary

  This spec replaces the homepage’s hardcoded final CTA with a reusable, content-driven Closing CTA section and updates the
  homepage to use it. The homepage version should remove all green treatment inside the section, swap the three benefit
  icons to branded SVG assets, normalize the copy, and shorten the visible button label on mobile up to 640px.

  ## Key Changes

  - Create a new reusable section under components/sections/page named closing-cta, with its own CLAUDE.md, a typed config
    interface, and a presentational component.
  - Move the existing final CTA markup out of app/page.tsx:343 and render the new section from a homepage config object
    instead of inline JSX.
  - Use a fixed layout with configurable content:
      - headline
      - benefits[] with id, label, icon.src, icon.alt, icon.width, icon.height
      - primaryCta with label, shortLabel, href, ariaLabel
      - optional contactBlock with phone label/href and support text
  - Keep layout and styling owned by the component, not by page-level injected ReactNode icons.
  - Visual direction for the Closing CTA section:
      - No green background fills in the section
      - No green accent text or hover accents inside the section
      - Use neutral section styling with card/panel emphasis so it still reads as the terminal conversion moment
      - Keep the three benefits as uniform visual tiles with aligned rhythm
      - Use the repo’s shared CTA/button primitive rather than a bespoke inline anchor style
  - Normalize homepage close-CTA copy to a canonical set:
      - Heading: same message, but no highlighted green word
      - Benefit 1: Pre-Approved in 30 Seconds
      - Benefit 2: No Hard Credit Pull
      - Primary CTA short mobile label: Get Pre-Approved
      - Benefit 1: /brand-assets/benefit-icons/fast/fast-funding-dark.svg
      - Benefit 2: /brand-assets/benefit-icons/inquiry/credit-inquiry-dark.svg
      - Benefit 3: /brand-assets/benefit-icons/hook/hook-dark.svg
  - Mobile button behavior:
      - Show the short visible label at <= 640px
      - Preserve the full descriptive accessible label for screen readers
  - Contact block behavior:
      - Supported by the reusable API as optional but common
      - Homepage should keep the current phone/hours content unless separately changed

  ## Test Plan

  - Run npm run lint
  - Run npm run build
  - Validate the homepage visually at desktop, 640px, 480px, and 425px
  - Confirm the Closing CTA section has no green background or green text accents
  - Confirm benefit icons render from the specified asset paths and maintain aligned tile rhythm
  - Confirm the visible button text switches to Get Pre-Approved at <= 640px
  - Confirm the accessible name remains the full CTA wording after the mobile text swap
  - Confirm the homepage still links correctly to #pre-approve and the contact phone link still works

  ## Assumptions

  - This spec is scoped to the homepage Closing CTA extraction and the reusable pattern it introduces, not to a homepage-
    wide green accent audit.
  - “No green backgrounds on any section” does not require retrofitting unrelated sections right now because the current
    homepage section-level green background issue is the final CTA.
  - The new reusable section should follow the repo’s existing section/config conventions rather than invent a new
    composition pattern.
