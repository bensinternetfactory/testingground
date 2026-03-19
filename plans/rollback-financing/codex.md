# Rollback Financing Hero Concept Selection

This document executes [plan.md](/Users/benfranzoso/Documents/Projects/copy/plans/rollback-financing/plan.md) as written.

The scope here is concept selection only. It does not implement the winning concept in code.

## 1. Current Hero Audit

### Confirmed implementation constraints

- The page uses `HeroConvert` in [app/rollback-financing/page.tsx](/Users/benfranzoso/Documents/Projects/copy/app/rollback-financing/page.tsx).
- The selection block already accepts custom icon nodes through `HeroConvertConfig.tiles`.
- The rollback page is wired to two fixed SVG assets:
  - `rollback-light-green.svg`
  - `rollback-green.svg`
- Tile selection only gates the CTA. It does not change downstream funnel logic.
- The interaction model is already correct for this phase and should stay unchanged.

### Real layout constraints from the current code

- `HeroConvert` is a two-column hero on desktop with text and selection on the left, image on the right.
- The hero image is hidden on mobile, so the tile block carries much more visual weight on small screens.
- `TileSelector` currently renders the tiles in a hard two-column grid at all breakpoints.
- `SelectionTileData` only carries `id`, `label`, and `icon`.
- `SelectionTile` currently shows the icon visually, but the label is screen-reader only.
- The current rollback icons are rendered small inside the tile:
  - `width={150}`
  - `height={43}`
  - `className="h-6 w-auto sm:h-8"`
- The current tile shell is compact:
  - mobile min-height `4rem`
  - small-screen-up min-height `6rem`
- A winner that needs visible label hierarchy, subtitle text, or different mobile stacking is realistic, but it will require component work in the later build pass, not only config tweaks.

### Live observations from browser review

Checked on desktop and mobile (`iPhone 14`) against the running local page:

- The current hero renders as a conventional left-copy/right-image split.
- The selection area reads as two icon buttons more than two fully explained categories.
- The prompt sits above the tiles, but the category names are not visible in the tile bodies.
- On mobile, the hero image disappears, so the selector becomes the hero's main visual device.
- Selecting a tile enables the CTA exactly as expected.

### What feels weakest in the current hero

- The tile area does not look premium yet; it looks functional and small.
- The distinction between light-duty and medium/heavy relies too much on icon differences alone.
- On mobile, the selector block is usable but not especially scannable or authoritative.
- The tile block does not currently command enough attention relative to the headline.

## 2. Ten Concept Directions

### 1. Framed Selector Deck

**Intent:** Turn the choice area into a polished product module that feels like a premium selector, not two loose buttons.

```text
+--------------------------------------------------+   +-------------------+
| Need Rollback Financing?                         |   |                   |
| Copy...                                          |   |   Hero image      |
|                                                  |   |                   |
|  [ Select your rollback type ]                   |   |                   |
|  +----------------+  +------------------------+  |   |                   |
|  |    SVG         |  |         SVG            |  |   |                   |
|  | Light-Duty     |  | Medium / Heavy-Duty    |  |   |                   |
|  +----------------+  +------------------------+  |   |                   |
|  [ Get Pre-Approved ]                            |   |                   |
+--------------------------------------------------+   +-------------------+
```

**Mobile note:** Convert the deck into a single framed stack with two full-width cards and left-aligned labels.

**What changed from current:** The selector becomes a contained card inside the hero, labels become visible, and spacing increases materially.

**Advantages:**

- Reads immediately as a premium decision module.
- Improves scan clarity without changing the interaction model.
- Fits the current hero structure with moderate implementation complexity.

**Risks / tradeoffs:**

- Needs tile label rendering in the visible UI.
- If over-framed, it could start feeling too productized relative to the rest of the page.

### 2. Tall Spec Cards

**Intent:** Make each truck class feel like a high-value product card with more presence and vertical breathing room.

```text
+-----------------------------------------------+   +-------------------+
| Headline                                      |   |                   |
| Copy                                          |   |   Hero image      |
|                                               |   |                   |
|  +------------------+  +------------------+   |   |                   |
|  |      SVG         |  |       SVG        |   |   |                   |
|  |                  |  |                  |   |   |                   |
|  | Light-Duty       |  | Medium / Heavy   |   |   |                   |
|  | Rollback         |  | Rollback         |   |   |                   |
|  +------------------+  +------------------+   |   |                   |
|  CTA                                          |   |                   |
+-----------------------------------------------+   +-------------------+
```

**Mobile note:** Stack the cards vertically at full width and preserve generous icon size.

**What changed from current:** The tiles become portrait-oriented cards rather than compact pills.

**Advantages:**

- Premium and calm because of the extra negative space.
- Gives both categories real visual hierarchy.
- Very strong on mobile if stacked.

**Risks / tradeoffs:**

- Consumes more vertical space.
- Could push the CTA lower than ideal above the fold.

### 3. Editorial Split Bar

**Intent:** Use a flatter, more editorial composition with wide bars, oversized trucks, and strong typography.

```text
+-----------------------------------------------------+   +---------------+
| Headline                                            |   |               |
| Copy                                                |   | Hero image    |
|                                                     |   |               |
| +----------------------+ +------------------------+ |   |               |
| | SVG    Light-Duty    | | SVG  Medium / Heavy   | |   |               |
| +----------------------+ +------------------------+ |   |               |
| CTA                                                 |   |               |
+-----------------------------------------------------+   +---------------+
```

**Mobile note:** Keep the bars horizontal but stack them vertically with larger type and tighter icon width.

**What changed from current:** The tiles become low, wide bars with explicit icon-plus-label composition.

**Advantages:**

- Fast to scan.
- Feels refined without becoming decorative.
- Likely translates well into the existing two-up selector pattern.

**Risks / tradeoffs:**

- Less luxurious than taller card concepts.
- Wide bars can feel too utilitarian if the type is not handled carefully.

### 4. Center Stage Pair

**Intent:** Pull the selector toward the center seam of the hero so the choice block feels like the visual anchor of the whole fold.

```text
+-------------------------------------------+ +-----------------------+
| Headline                                  | |                       |
| Copy                                      | |      Hero image       |
|                                           | |                       |
|        +-----------------------------+    | |                       |
|        | [ SVG ]   [ SVG ]           |----|-| overlap seam          |
|        | Light     Medium / Heavy    |    | |                       |
|        +-----------------------------+    | |                       |
| CTA                                       | |                       |
+-------------------------------------------+ +-----------------------+
```

**Mobile note:** Collapse into a normal stacked selector card; the overlap idea should disappear on small screens.

**What changed from current:** The selector stops being just part of the left column and becomes the visual pivot of the hero.

**Advantages:**

- Highest perceived design intention on desktop.
- Makes the selector feel important enough to match the page goal.
- Strong premium signal when done cleanly.

**Risks / tradeoffs:**

- More complex to implement inside the current hero structure.
- Desktop win may not translate proportionally to mobile.

### 5. Dark Showcase Band

**Intent:** Introduce a richer band behind the selector so the rollback icons and labels feel showroom-like.

```text
+--------------------------------------------------+   +-------------------+
| Headline                                         |   |                   |
| Copy                                             |   | Hero image        |
|                                                  |   |                   |
|  ################ selector band ##############   |   |                   |
|  #   [ SVG ]            [ SVG ]               #  |   |                   |
|  # Light-Duty      Medium / Heavy-Duty        #  |   |                   |
|  ##############################################  |   |                   |
|  CTA                                             |   |                   |
+--------------------------------------------------+   +-------------------+
```

**Mobile note:** Keep the band but reduce contrast and stack the tiles so it does not feel cramped.

**What changed from current:** A background field is added to elevate the selector above plain white.

**Advantages:**

- Strong premium cue through contrast and framing.
- Makes the green rollback artwork feel more intentional.
- Distinguishes the selector from the rest of the body copy.

**Risks / tradeoffs:**

- A dark field could drift away from the page's existing tone.
- If too heavy, it may compete with the CTA instead of supporting it.

### 6. Comparison Panel

**Intent:** Treat the choice as a clean side-by-side comparison so the category distinction becomes the hero's strongest message.

```text
+---------------------------------------------------+   +------------------+
| Headline                                          |   |                  |
| Copy                                              |   | Hero image       |
|                                                   |   |                  |
|  +----------------+----------------------------+  |   |                  |
|  | Light-Duty     | Medium / Heavy-Duty        |  |   |                  |
|  | [ SVG ]        | [ SVG ]                    |  |   |                  |
|  +----------------+----------------------------+  |   |                  |
|  CTA                                              |   |                  |
+---------------------------------------------------+   +------------------+
```

**Mobile note:** Convert to stacked cards with the same comparison framing and explicit labels.

**What changed from current:** The selector gets a more structured, almost spec-sheet layout.

**Advantages:**

- Best pure scan clarity.
- Makes the two categories feel distinct without touching the art.
- Easy to understand at a glance.

**Risks / tradeoffs:**

- Risks feeling practical rather than luxurious.
- Needs careful typography so it does not read like a table.

### 7. Poster Tiles

**Intent:** Let the SVGs dominate with very large scale, then anchor each with a compact caption line.

```text
+--------------------------------------------------+   +-------------------+
| Headline                                         |   |                   |
| Copy                                             |   | Hero image        |
|                                                  |   |                   |
|  +----------------+  +------------------------+  |   |                   |
|  |                |  |                        |  |   |                   |
|  |      SVG       |  |          SVG           |  |   |                   |
|  |                |  |                        |  |   |                   |
|  | Light-Duty     |  | Medium / Heavy-Duty    |  |   |                   |
|  +----------------+  +------------------------+  |   |                   |
|  CTA                                             |   |                   |
+--------------------------------------------------+   +-------------------+
```

**Mobile note:** Reduce icon scale slightly but keep each card as a full-width poster tile.

**What changed from current:** Icon scale becomes the main hierarchy, with labels intentionally secondary.

**Advantages:**

- Most dramatic use of the existing artwork.
- Can feel expensive if the spacing is restrained.
- Keeps the category count visually simple.

**Risks / tradeoffs:**

- Category names may still feel secondary if not sized aggressively enough.
- Depends heavily on SVG silhouette quality at large scale.

### 8. Ribbon Rail

**Intent:** Turn the selector into a sleek horizontal rail that feels engineered and compact.

```text
+------------------------------------------------------+   +-------------+
| Headline                                             |   |             |
| Copy                                                 |   | Hero image  |
|                                                      |   |             |
|  [ Select type ]  | [ SVG Light ] | [ SVG Heavy ] |  |   |             |
|  --------------------------------------------------  |   |             |
|  CTA                                                 |   |             |
+------------------------------------------------------+   +-------------+
```

**Mobile note:** Break the rail apart into stacked rows; do not preserve the single-line layout.

**What changed from current:** The selector becomes a horizontal control strip rather than two standalone tiles.

**Advantages:**

- Very distinct from the current hero.
- Could feel precise and premium if spacing is tight.
- Efficient use of desktop width.

**Risks / tradeoffs:**

- Harder to preserve elegance on mobile.
- Less friendly if the labels need multiple lines.

### 9. Stepped Emphasis

**Intent:** Use asymmetry and scale change to make the selector feel more designed and less grid-bound.

```text
+--------------------------------------------------+   +-------------------+
| Headline                                         |   |                   |
| Copy                                             |   | Hero image        |
|                                                  |   |                   |
|  +--------------+   +------------------------+   |   |                   |
|  |   SVG        |   |           SVG          |   |   |                   |
|  | Light-Duty   |   | Medium / Heavy-Duty    |   |   |                   |
|  +--------------+   +------------------------+   |   |                   |
|  CTA                                             |   |                   |
+--------------------------------------------------+   +-------------------+
```

**Mobile note:** Remove the asymmetry and normalize both cards to full width.

**What changed from current:** The two tiles are intentionally different widths to create editorial tension.

**Advantages:**

- Feels less templated.
- Gives the hero more visual personality.
- Makes the selector area feel custom.

**Risks / tradeoffs:**

- Implies hierarchy between categories that may not be semantically intended.
- More likely to feel gimmicky if spacing is off.

### 10. Offset Gallery Stack

**Intent:** Present the selector like two gallery cards in a curated stack rather than a strict grid.

```text
+--------------------------------------------------+   +-------------------+
| Headline                                         |   |                   |
| Copy                                             |   | Hero image        |
|                                                  |   |                   |
|   +----------------------+                       |   |                   |
|   |        SVG           |                       |   |                   |
|   |   Light-Duty         |                       |   |                   |
|        +----------------------+                  |   |                   |
|        |          SVG         |                  |   |                   |
|        |   Medium / Heavy     |                  |   |                   |
|        +----------------------+                  |   |                   |
|  CTA                                             |   |                   |
+--------------------------------------------------+   +-------------------+
```

**Mobile note:** Flatten into a clean vertical stack with no overlap.

**What changed from current:** The selector becomes an intentionally offset composition instead of a uniform pair.

**Advantages:**

- Strong art-direction feel.
- Makes the selector more memorable.
- Uses layering to signal premium curation.

**Risks / tradeoffs:**

- Lower scan clarity than cleaner paired layouts.
- Overlap effects often look better in sketch than in code.

## 3. Rubric Review

Scored 1-5 using the plan's priority order.

| Concept | Premium feel | Mobile scan clarity | Distinction clarity | Fit with site | Ease in current hero | Total |
|---|---:|---:|---:|---:|---:|---:|
| Framed Selector Deck | 5 | 5 | 5 | 5 | 5 | 25 |
| Tall Spec Cards | 5 | 4 | 5 | 4 | 4 | 22 |
| Editorial Split Bar | 4 | 4 | 4 | 5 | 5 | 22 |
| Center Stage Pair | 5 | 3 | 4 | 4 | 2 | 18 |
| Dark Showcase Band | 4 | 4 | 4 | 3 | 3 | 18 |
| Comparison Panel | 4 | 5 | 5 | 4 | 4 | 22 |
| Poster Tiles | 5 | 3 | 4 | 4 | 4 | 20 |
| Ribbon Rail | 3 | 3 | 4 | 4 | 4 | 18 |
| Stepped Emphasis | 4 | 3 | 3 | 3 | 4 | 17 |
| Offset Gallery Stack | 4 | 2 | 4 | 3 | 3 | 16 |

## 4. Winner

### Winning Direction: Framed Selector Deck

**Why it wins**

- It is the clearest upgrade from "functional selector" to "premium choice module."
- It solves the current hero's biggest weakness without overcomplicating the structure.
- It works on desktop and has the cleanest mobile collapse path.
- It gives the two categories visible hierarchy without depending on new artwork.
- It stays coherent with the rest of the page's current language and restraint.

**Premium signal it creates**

- Containment: the selector feels curated and intentional.
- Space: the extra breathing room makes the same SVGs feel more expensive.
- Hierarchy: visible labels and a framed module make the choice feel decisive and polished.

**Compromises**

- It is less dramatic than Center Stage Pair or Poster Tiles.
- It still relies on typographic quality and spacing discipline rather than spectacle.
- It requires component changes to render visible labels and likely a different mobile stack.

**What must remain unchanged in implementation**

- Keep the existing rollback SVG artwork unchanged.
- Keep the two current categories and their meaning unchanged.
- Keep the current selection behavior and CTA gating unchanged.
- Keep `rollback` as the primary framing term.
- Do not let `flatbed` overtake the page language.

## 5. Backup Option

### Backup Direction: Tall Spec Cards

This is the fallback if the framed deck feels too conservative once built. It preserves the same core idea of visible hierarchy and premium spacing, but pushes harder on icon scale and card presence.

The backup is slightly riskier above the fold because of height, but it should still hold up well if the mobile layout becomes a stacked full-width card list.

## 6. Later Build Guardrails

When this moves into implementation, the build pass should:

- update only the hero layout and tile presentation
- keep the current rollback SVG files unchanged
- preserve the existing interaction model and CTA behavior
- expose the category labels visibly in the tile UI
- validate desktop and mobile scan clarity against the current page
- avoid introducing extra per-tile copy unless the config shape is intentionally expanded

## 7. Acceptance Check

- 10 concept directions exist
- each concept is materially different
- all concepts keep the fixed rollback SVG assets
- one winner and one backup are selected
- the winner rationale is documented for the later implementation pass
