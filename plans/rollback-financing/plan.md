# Rollback Financing Hero Concept Plan

## Summary

The `/rollback-financing` hero needs a stronger visual treatment for the two equipment tiles. This is not an icon redesign project. The rollback SVGs are custom-made for this site and must remain unchanged. The work is a concept-selection exercise focused on layout, scale, spacing, label hierarchy, and overall hero composition.

The immediate goal is to generate 10 materially different ASCII concept directions for the hero selection area, review them against a clear rubric, and pick one winning direction. Stop once a direction is selected and documented. Production implementation happens in a later pass.

## Locked Decisions

- Keep the existing rollback SVG artwork unchanged.
- Allow changes to icon size, tile composition, tile spacing, tile framing, label hierarchy, and hero balance.
- Keep the current interaction model unchanged.
- Treat the light-duty vs medium/heavy choice as purely visual for now.
- Keep `rollback` as the primary search term on the page.
- Use `flatbed` only as supporting language, not as the dominant framing.
- Preserve the meaning of the two tile categories, but allow copy refinement if it improves polish.
- Optimize for a more premium look first.
- Use mobile scan clarity as the second decision criterion.
- End this plan at concept selection, not code implementation.

## Current State

- The hero already supports two tiles through the existing `HeroConvert` config.
- The page currently uses custom rollback SVGs for:
  - `Light-Duty Rollback`
  - `Medium / Heavy-Duty Rollback`
- Tile selection currently enables the CTA but does not change downstream funnel behavior.
- The current plan note is too vague to guide execution and does not capture the actual constraints.

## Deliverables

Produce 10 concept directions for the hero selection area.

Each direction must include:

- A short concept name
- A one-line design intent
- An ASCII sketch showing the desktop composition
- A short mobile note describing how the same direction should collapse or rebalance
- A note explaining what changed from the current hero
- 2-3 advantages
- 1-2 risks or tradeoffs

Each concept must vary one or more of the following:

- Icon-to-label ratio
- Tile padding and density
- Label size and hierarchy
- Horizontal vs vertical emphasis
- Tile framing and background treatment
- Placement and prominence of the selection block within the hero
- Relationship between hero copy and the two selection tiles

The 10 directions must be materially different. Do not create 10 near-identical resize tweaks.

## Execution Steps

### 1. Audit the Current Hero

Before sketching concepts, confirm the live constraints in the existing implementation:

- The hero uses the `HeroConvert` section.
- The tile system already accepts custom icon nodes.
- The current rollback page uses two fixed SVG assets.
- No funnel logic changes are required.

Capture any layout constraints that would make a concept unrealistic, but do not turn this phase into implementation work.

### 2. Generate 10 ASCII Concept Directions

Create 10 concept directions using the same two SVG assets conceptually.

Focus the exploration on composition, not illustration:

- scale of each SVG inside the tile
- relative size of icon vs label
- amount of negative space
- tile border/background treatment
- whether the selection block feels compact, editorial, product-like, or more premium/luxury
- whether the overall hero shifts attention more strongly toward the tiles

Do not introduce new truck artwork, new categories, or new funnel states.

### 3. Review the 10 Directions

Evaluate every concept against this rubric:

1. Does it feel more premium than the current hero?
2. Is the distinction between the two classes easy to scan?
3. Does it still feel coherent with the rest of the page?
4. Will it likely hold up on small screens?
5. Is the idea different enough from the other concepts to deserve consideration?

Reject directions that are only cosmetic noise or that depend on changing the icon artwork itself.

### 4. Select One Winning Direction

Choose one preferred concept and document:

- why it wins
- what premium signal it creates
- what compromises it makes
- what must remain unchanged when it moves into implementation

Also identify one backup option in case the winning concept feels weaker in code than it does in sketch form.

## Selection Rubric

Use this priority order when choosing the winner:

1. Premium visual feel
2. Mobile scan clarity
3. Clear distinction between light-duty and medium/heavy
4. Fit with the current site language
5. Ease of translating the concept into the existing hero structure

Do not choose the winner based mainly on how little it changes.

## Out of Scope

The following are explicitly out of scope for this phase:

- Redrawing or replacing the SVG icons
- Changing the page funnel or CTA behavior
- Passing tile selection into CRM, tracking, or pre-approval logic
- Rewriting the page SEO strategy
- Implementing the winning concept in code

## Handoff for the Later Build Phase

Once a concept is selected, the later implementation pass should:

- update only the hero layout and tile presentation
- keep the rollback SVG files unchanged
- preserve current selection and CTA behavior
- validate the final hero on mobile and desktop
- confirm the result feels more premium without introducing confusion

## Acceptance Criteria

This planning phase is complete when:

- 10 concept directions exist
- each direction is clearly distinct
- all directions respect the fixed-asset constraint
- one winner and one backup direction are selected
- the reasoning for the winner is documented clearly enough for a later implementation pass
