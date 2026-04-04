 Zero-Down Sidebar — Restyle + Rebalance         
                                     
 Context

 Codex's recent pass on the /zero-down-tow-truck-financing sidebar landed with two real problems:

 1. The sidebar doesn't look like the rest of the site. It uses a cream #F6F6F3 background, warm #E6E4DE borders, and rounded-[1.75rem] — a
 palette and shape system that appears ONLY in the sidebar. The dominant site pattern across EquipmentCards, ProgramCards, HowItWorks, FAQ,
 MiniROI, ResourceHub, and ClosingCta is white (or #F5F5F5) cards with rounded-3xl, shadow-[inset_0_0_0_1px_#E9E9E9] borders, and #22C55E green
  for active states. The sidebar reads as foreign.
 2. The article and sidebar have a large horizontal gap between them. Inside the max-w-7xl (1280px) grid, the article column is minmax(0,1fr)
 and the sidebar is 328px. The article itself has its own max-w-[720px] cap and is left-aligned, leaving ~230px of empty space between article
 text and sidebar. That empty band reads as "wasted white space on the right" — even at viewport widths below 1280px.

 Constraint: do not widen any containers. Keep the inner grid at max-w-7xl (the current site-wide max). Rebalance by centering the article
 inside its column.

 Also: delete the mobile TOC entirely. Mobile readers will scroll; the summary row, expanded link cards, and cream aesthetic don't earn their
 space.

 Changes

 1. Center the article inside its grid column

 File: app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx (line 41)

 Current:
 <article className="min-w-0 max-w-[720px] px-6 py-20 md:px-8 md:py-28 lg:pr-12">

 Change to:
 <article className="mx-auto min-w-0 max-w-[720px] px-6 py-20 md:px-8 md:py-28">

 - Add mx-auto → article centers horizontally inside its 1fr grid column
 - Remove lg:pr-12 → centering handles balance; right-padding is no longer needed
 - Keep min-w-0 → grid overflow safety
 - Keep px-6 md:px-8 → mobile content padding
 - max-w-[720px] stays → reading width untouched

 2. Delete the MobileTocCard

 File: app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx
 - Remove the import { MobileTocCard } ... line
 - Remove the <MobileTocCard items={...} /> render inside <article>
 - Delete app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/MobileTocCard.tsx
 - Keep toc in config.ts — it's still used by the desktop TableOfContents

 3. Rebuild TableOfContents to match site style

 File: app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/TableOfContents.tsx

 Replace the cream card system with the site's dominant pattern:

 - Outer nav container: rounded-3xl bg-white p-5 shadow-[inset_0_0_0_1px_#E9E9E9]  (mirrors FAQ, ResourceHub, MiniROI)
 - Label: keep uppercase tracked label but tone color to text-[#545454] (site body-copy gray)
 - List spacing: space-y-1 (tighter, more list-like — not stacked cards)
 - Items: drop the double-card (card-inside-card) treatment. Use inline list rows:
   - Default: flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#3A3A3A] transition-colors hover:bg-[#F5F5F5] hover:text-[#111]
   - Active: bg-[#F5F5F5] text-[#111] shadow-[inset_0_0_0_1px_#E9E9E9]
 - Number chip:
   - Default: flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#F5F5F5] text-[11px] font-semibold tabular-nums
 text-[#545454] shadow-[inset_0_0_0_1px_#E9E9E9]
   - Active: bg-[#22C55E] text-white (matches FAQ's active-toggle pattern + HowItWorks badges)
 - Keep existing IntersectionObserver logic untouched — it works.
 - Keep focus-visible:ring-[#22C55E] for keyboard accessibility.

 4. Update SidebarCta border-radius for consistency

 File: app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/SidebarCta.tsx

 - Change rounded-[1.75rem] → rounded-3xl on the outer dark card
 - Keep the rest (dark #101820 bg, #22C55E CTA, white text) — dark CTA cards are fine and this matches the shape language of the rest of the
 site
 - Optional: reduce inner padding slightly (p-5 xl:p-6 → p-6) to feel less cramped now that the TOC is whiter/lighter

 5. Rebalance ArticleSidebar padding

 File: app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/ArticleSidebar.tsx

 - Keep the lg:border-l lg:border-[#D4D4D4] left divider — it now serves as the visual start of the sidebar column and helps define the gap
 left by the centered article
 - Gap between TOC and CTA: keep gap-5
 - Vertical padding stays at lg:py-24 xl:py-28
 - Sidebar left padding lg:pl-8 xl:pl-10 stays
 - Sidebar right padding lg:pr-6 xl:pr-8 stays

 6. BlogLayout — no changes

 File: app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/BlogLayout.tsx

 - Leave max-w-7xl on the inner grid (per user instruction: don't widen containers)
 - Leave column template lg:grid-cols-[minmax(0,1fr)_328px] xl:grid-cols-[minmax(0,1fr)_344px]
 - Leave outer section 2xl:max-w-screen-2xl cap

 Critical Files

 ┌──────────────────────────────────────────────────────────────────────────────────────────┬───────────────────────────────────────────────┐
 │                                           File                                           │                    Action                     │
 ├──────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ app/(marketing)/(programs)/zero-down-tow-truck-financing/page.tsx                        │ Add mx-auto to article; remove MobileTocCard  │
 │                                                                                          │ import + render                               │
 ├──────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/TableOfContents.tsx │ Full restyle — white card, slim rows, green   │
 │                                                                                          │ active state                                  │
 ├──────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/SidebarCta.tsx      │ rounded-3xl + minor padding cleanup           │
 ├──────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/ArticleSidebar.tsx  │ Keep (border-l stays)                         │
 ├──────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/MobileTocCard.tsx   │ DELETE                                        │
 ├──────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ app/(marketing)/(programs)/zero-down-tow-truck-financing/_components/BlogLayout.tsx      │ No changes                                    │
 └──────────────────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────────┘

 Patterns / Tokens Reused (verified during exploration)

 - Card border: shadow-[inset_0_0_0_1px_#E9E9E9] — used by FAQ, EquipmentCards, MiniROI, ResourceHub, ClosingCta
 - Card radius: rounded-3xl — dominant across sections
 - Subtle row hover: bg-[#F5F5F5] — used by HowItWorks mobile accordion background, mini elements
 - Active green: #22C55E — used by FAQ toggle badges, RippleCtaLink focus rings
 - Body gray: text-[#545454] — site body-copy color
 - Active text: text-[#111] — emphasized copy color

 Verification

 1. Run npm run lint
 2. Run npm run build
 3. Start dev server on port 3005 (never 3000 — user's preview owns that): PORT=3005 npm run dev
 4. Open http://localhost:3005/zero-down-tow-truck-financing in a browser
 5. Desktop checks (viewport ≥ 1280px):
   - Article text is horizontally centered inside its grid column
   - Whitespace is balanced on the LEFT and RIGHT of the article text (no more large single-sided gap)
   - TOC is a white card with inset border, not cream
   - TOC active item is a green circular badge (matches FAQ visual language)
   - Sticky behavior still works on scroll; active TOC item updates as sections cross the viewport
   - SidebarCta card is rounded-3xl (less "blob-like" than before)
   - The lg:border-l divider still renders the sidebar column clearly
 6. Mobile checks (viewport ≤ 1024px):
   - No MobileTocCard appears at the top of the article
   - Article flows from hero → intro → business case → … with no TOC interruption
   - Section jumps via direct hash links (e.g. #business-case) still work if a user types/shares a deep link (TOC data still lives in
 config.ts)
 7. Keyboard accessibility:
   - Tab through the TOC items — focus-visible:ring-[#22C55E] ring remains visible on each link
   - aria-current="location" still applied to the active TOC link
 8. Regression: confirm RippleCtaLink inside SidebarCta still renders the green pill button unchanged

 Out of Scope

 - Widening max-w-7xl or changing outer section widths
 - Rebuilding the hero alignment or any other page section
 - Reintroducing a mobile TOC in a different form
 - Changing config.ts shape (toc/sidebarCta/section IDs preserved)
 - Editing the article body components (ArticleIntro, BusinessCaseSection, etc.)