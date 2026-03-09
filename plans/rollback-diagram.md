# Rollback Financing Page ASCII Diagram

Structural planning doc for `/rollback-financing`. This is a page-map handoff, not final UI design.

Legend:
- `[CTA]` = conversion action
- `[IL]` = internal link

Implementation note for later coding:
- Hero should reuse the `hero-convert-geico` structure with 2 rollback-specific tiles instead of the default 4-equipment layout.
- Icons should stay page-injected, matching the existing icon-decoupling pattern.

---

## 1. Sticky Nav

```text
+--------------------------------------------------------------------------------------------------+
| LOGO                               NAV LINKS                                [CTA] Pre-Approve   |
|                                    Home                                      -> #pre-approve    |
|                                    Rollback Financing (current)                                  |
|                                    Leasing                                     [IL] Home -> /   |
|                                    Used Financing                                                  |
+--------------------------------------------------------------------------------------------------+
```

Notes:
- Keep `/rollback-financing` visibly active in nav state.
- Primary nav CTA should stay persistent and point to `#pre-approve`.

---

## 2. Hero

```text
+--------------------------------------------------------------------------------------------------+
| LEFT COLUMN                                                             | RIGHT COLUMN            |
|                                                                         |                         |
| H1: Rollback Financing Built for Real Tow Deals                         |  Rollback truck image   |
| Supporting copy: tow-truck specialist, fast review,                    |  / desktop visual       |
| used/private-party/auction comfort                                      |                         |
|                                                                         |                         |
| Tile selector (HeroConvert pattern):                                    |                         |
|   +----------------------+  +----------------------+                    |                         |
|   | [rollback-light-green-icon] Rollback      |  | [rollback-green icon] Flatbed       |                    |                         |
|   | selectable tile      |  | selectable tile      |                    |                         |
|   +----------------------+  +----------------------+                    |                         |
|                                                                         |                         |
| [CTA] Get Pre-Approved for a Rollback -> #pre-approve                   |                         |
|       selected tile appends future equipment query behavior             |                         |
|       example: #pre-approve?equipment=rollback                          |                         |
|                                                                         |                         |
| [CTA] See Your Rollback Payment -> /tow-truck-calculator?type=rollback  |                         |
| [IL] Tow truck financing -> /                                           |                         |
| [IL] Explore rollback leasing options -> /tow-truck-leasing             |                         |
|                                                                         |                         |
| Microcopy: soft-pull / no-credit-impact style reassurance               |                         |
| Disclaimer: approval subject to review                                  |                         |
+--------------------------------------------------------------------------------------------------+
```

Hero requirements:
- Keep the `HeroConvert` split layout: content and tiles left, image right.
- Use exactly 2 rollback-related tiles.
- Main action remains pre-approval; calculator is secondary.

---

## 3. Why Operators Use Us for Rollback Deals

```text
+--------------------------------------------------------------------------------------------------+
| SECTION HEADLINE: Why Operators Use Us for Rollback Deals                                        |
| Short intro: specialist lender positioning, not beginner rollback education                      |
|                                                                                                  |
| +---------------------------+  +---------------------------+                                     |
| | Used rollback deals       |  | Private-party sellers     |                                     |
| | Older inventory OK when   |  | Manual review comfort     |                                     |
| | the business qualifies    |  | beyond dealer-only deals  |                                     |
| +---------------------------+  +---------------------------+                                     |
|                                                                                                  |
| +---------------------------+  +---------------------------+                                     |
| | Auction / marketplace     |  | Practical terms           |                                     |
| | Copart / online inventory |  | Zero down for qualified   |                                     |
| | fit called out directly   |  | buyers, flexible starts, longer terms   |                                     |
| +---------------------------+  +---------------------------+                                     |
|                                                                                                  |
| [IL] Financing a used rollback -> /used-tow-truck-financing                                      |
| [IL] Zero down rollback financing -> /zero-down-tow-truck-financing                              |
+--------------------------------------------------------------------------------------------------+
```

---

## 4. Simple Process

```text
+--------------------------------------------------------------------------------------------------+
| SECTION HEADLINE: Simple Process                                                                 |
|                                                                                                  |
|   [1] Apply / Get Pre-Approved   -->   [2] Review the Deal   -->   [3] Close and Fund          |
|       short form / fast start           truck, seller, terms         move when you find the unit |
|                                                                                                  |
|                          [CTA] Start Pre-Approval -> #pre-approve                                |
+--------------------------------------------------------------------------------------------------+
```

Process emphasis:
- Low-friction path.
- Reinforce what happens after pre-approval, not generic process filler.

---

## 5. Lease vs Finance / Payment Confidence

```text
+--------------------------------------------------------------------------------------------------+
| LEFT COLUMN: Payment Confidence                                      | RIGHT COLUMN: Fit / Support |
|                                                                      |                            |
| Headline: See what a rollback payment looks like                     | Lease vs finance help       |
| Copy: help operators size the deal before they commit                | Tax / ownership support     |
|                                                                      |                            |
| [CTA] Calculate your rollback payment                                | [IL] Should you lease or    |
|       -> /tow-truck-calculator?type=rollback                         |      finance your rollback? |
|                                                                      |      -> /resources/tow-     |
| [IL] How much does a rollback cost?                                  |         truck-lease-vs-loan |
|      -> /resources/how-much-does-a-tow-truck-cost                    |                            |
|                                                                      | [IL] Write off your         |
|                                                                      |      rollback this year     |
|                                                                      |      -> /resources/section- |
|                                                                      |         179-tow-truck       |
+--------------------------------------------------------------------------------------------------+
```

Notes:
- Calculator stays secondary to the page’s main application CTA.
- Keep this section practical, not overly educational.

---

## 6. FAQ

```text
+--------------------------------------------------------------------------------------------------+
| SECTION HEADLINE: Rollback Financing FAQ                                                         |
|                                                                                                  |
| [Accordion 1] Can you finance a used rollback tow truck?                                         |
|   Answer includes [IL] /used-tow-truck-financing                                                 |
|                                                                                                  |
| [Accordion 2] Can you finance a rollback from a private seller or auction?                       |
|   Answer references private-party / auction deal fit                                             |
|                                                                                                  |
| [Accordion 3] How much down do you need for a rollback?                                          |
|   Answer includes [IL] /zero-down-tow-truck-financing                                            |
|                                                                                                  |
| [Accordion 4] Can you lease a rollback tow truck?                                                |
|   Answer includes [IL] /resources/tow-truck-lease-vs-loan                                        |
|   and [IL] /tow-truck-leasing                                                                     |
|                                                                                                  |
| [Accordion 5] How do I know what payment fits my business?                                       |
|   Answer includes [IL] /tow-truck-calculator                                                     |
|   and [IL] /resources/section-179-tow-truck                                                      |
+--------------------------------------------------------------------------------------------------+
```

FAQ guidance:
- Keep questions rollback-specific and commercially relevant.
- Remove the off-topic trailer credit-score angle.

---

## 7. Final CTA

```text
+--------------------------------------------------------------------------------------------------+
| FINAL BAND                                                                                       |
| Headline: Ready to Add a Rollback to Your Fleet?                                                 |
| Short recap: specialist review, fast pre-approval, real rollback-deal fit                        |
|                                                                                                  |
| [CTA] Get Pre-Approved - It Takes 30 Seconds -> #pre-approve                                     |
| Phone / specialist line as tertiary action                                                       |
+--------------------------------------------------------------------------------------------------+
```

---

## 8. Quiet Related Links + Footer

```text
+--------------------------------------------------------------------------------------------------+
| QUIET RELATED LINKS                                                                              |
| [IL] Need a wrecker instead? -> /wrecker-financing                                               |
| [IL] Looking at rotators? -> /rotator-financing                                                  |
| [IL] Tow truck financing -> /                                                                    |
|                                                                                                  |
| ------------------------------------ FOOTER ---------------------------------------------------- |
| Logo | core nav | compliance/legal | contact | low-visual-weight sitemap support                 |
+--------------------------------------------------------------------------------------------------+
```

Related-links guidance:
- Keep these links present for internal architecture.
- They should sit low on the page and not compete with the main rollback CTA path.
