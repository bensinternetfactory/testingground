# Homepage-01 Section Map & Link Audit

Reference doc for polishing `app/homepage-01/page.tsx`. Each section listed with its current links/CTAs and the SEO target from `major-seo.md`.

---

## File: `app/homepage-01/page.tsx` (1,657 lines)

This page is the **Homepage Pillar** targeting "tow truck financing" (~980 monthly volume cluster). Per the SEO plan, it should link OUT to every major page on the site (13+ outbound links).

---

## Sections

### §0 — StickyNav (line 137)
- Component: `<StickyNav />` from `@/components/sections/nav/sticky-nav-rm`
- Not inline — links are defined in the nav component

---

### §2 — EQUIPMENT CARDS (lines 226–453) | `id="equipment"` | bg: #F5F5F5
**Purpose:** Intent router — sends visitors to equipment-specific pages.

| Card | Current href | SEO Target Anchor Text | Status |
|------|-------------|----------------------|--------|
| Rollback / Flatbed | `/rollback-financing` | "Rollback & flatbed financing" | OK (text differs slightly) |
| Wrecker | `/wrecker-financing` | "Wrecker financing" | OK |
| Rotator | `/rotator-financing` | "Rotator financing" | OK |
| Used Tow Trucks | `/used-tow-truck-financing` | "Used tow truck financing" | OK |

**All 4 links match SEO plan destinations.**

---

### §3 — HOW IT WORKS (lines 458–530) | `id="how-it-works"` | bg: white
**Purpose:** 3-step process. Build trust, reduce friction.

| Element | Current href | SEO Target | Status |
|---------|-------------|------------|--------|
| "See Your Payment First" link | `/tow-truck-calculator` | `/tow-truck-calculator` | OK |

---

### §4 — REVENUE PROOF (lines 535–639) | `id="revenue"` | bg: #F0FDF4
**Purpose:** ROI / profitability proof. Show the truck pays for itself.

| Element | Current href | SEO Target Anchor Text | Status |
|---------|-------------|----------------------|--------|
| "Calculate YOUR Payment" | `/tow-truck-calculator` | "Calculate your payment" | OK |
| "See Full ROI Breakdown" | `/resources/tow-truck-roi` | "See how fast a truck pays for itself" | OK (anchor text differs) |

---

### §5 — PROGRAMS (lines 644–851) | `id="programs"` | bg: white
**Purpose:** Differentiation cards showing financing programs.

| Card | Current href | SEO Target Anchor Text | Status |
|------|-------------|----------------------|--------|
| $0 Down Financing | `/zero-down-tow-truck-financing` | "Zero down financing" | OK |
| Fleet Upgrade | `/fleet-financing` | "Fleet expansion programs" | OK |
| Deferred Payment | `/deferred-payment-tow-truck-financing` | "Deferred payment options" | OK |
| Private Party Sales | `/private-party-tow-truck-financing` | "Private party & auction financing" | OK |

**Missing per SEO plan:** No link to `/tow-truck-leasing` ("Tow truck leasing options") in this section. SEO spec says body/programs section should link to leasing.

---

### §6 — REQUIREMENTS (lines 856–970) | `id="requirements"` | bg: #F5F5F5
**Purpose:** Objection killer. Show what you need / don't need.

| Element | Current href | SEO Target | Status |
|---------|-------------|------------|--------|
| "Check If You Qualify" button | `#pre-approve` | `#pre-approve` | OK |
| "See Full Requirements" link | `/resources/how-to-qualify` | "See financing requirements" | OK |

---

### §7 — SOCIAL PROOF (lines 975–1068) | `id="testimonials"` | bg: white
**Purpose:** Testimonials + stats + partner logos. No outbound links.

| Element | Current href | Notes |
|---------|-------------|-------|
| (none) | — | No links in this section. SEO plan doesn't specify any here. |

---

### §8 — CALCULATOR TEASER (lines 1073–1135) | `id="calculator"` | bg: #F0FDF4
**Purpose:** Push visitors to the calculator tool page.

| Element | Current href | SEO Target | Status |
|---------|-------------|------------|--------|
| "Calculate Your Payment" button | `/tow-truck-calculator` | `/tow-truck-calculator` | OK |

---

### §9 — RESOURCE HUB (lines 1140–1361) | `id="resources"` | bg: white
**Purpose:** SEO content links. Drive internal linking to resource pages.

| Card/Link | Current href | SEO Target | Status |
|-----------|-------------|------------|--------|
| Cost Guide card | `/resources/how-much-does-a-tow-truck-cost` | "How much does a tow truck cost?" | OK |
| ROI Guide card | `/resources/tow-truck-roi` | "See how fast a truck pays for itself" | OK |
| How to Qualify card | `/resources/how-to-qualify` | "See financing requirements" | OK |
| Lease vs. Loan card | `/resources/tow-truck-lease-vs-loan` | (not in homepage SEO spec directly but valid) | OK |
| Inline: Leasing | `/tow-truck-leasing` | "Tow truck leasing options" | OK |
| Inline: Startup Guide | `/resources/how-to-start-a-towing-business` | (top-of-funnel resource) | OK |
| Inline: Section 179 | `/resources/section-179-tow-truck` | (not in homepage spec but valid cross-link) | OK |

---

### §10 — FAQ (lines 1366–1376) | `id="faq"` | bg: #F5F5F5
**Purpose:** SEO FAQ schema + objection handling. Uses `<FAQ />` client component.

**FAQ links inside answers (defined in `faqs` array, lines 19–102):**

| FAQ Question | Link in Answer | href | SEO Target |
|-------------|---------------|------|------------|
| How long can you finance a tow truck? | "tow truck calculator" | `/tow-truck-calculator` | OK |
| What credit score is needed? | (none) | — | — |
| Does owning a tow truck make money? | "tow truck ROI guide" | `/resources/tow-truck-roi` | OK |
| Do tow trucks have payment plans? | (none) | — | — |
| What happens if you can't afford? | "zero down financing" | `/zero-down-tow-truck-financing` | OK |
| | "deferred payment programs" | `/deferred-payment-tow-truck-financing` | OK |
| How much to start a tow truck business? | "guide to starting a towing business" | `/resources/how-to-start-a-towing-business` | OK |

---

### §11 — FINAL CTA (lines 1381–1479) | `id="final-cta"` | bg: #F0FDF4
**Purpose:** Value recap + final conversion push.

| Element | Current href | SEO Target | Status |
|---------|-------------|------------|--------|
| "Get Pre-Approved" button | `#pre-approve` | `#pre-approve` | OK |
| Phone link | `tel:+18885550199` | tel link | OK |

---

### §12 — FOOTER (lines 1485–1654) | bg: #101820
**Purpose:** Site-wide navigation + trust signals.

**Footer link columns:**

| Column | Links | All hrefs |
|--------|-------|-----------|
| **Financing** | Rollback, Wrecker, Rotator, Used Trucks | `/rollback-financing`, `/wrecker-financing`, `/rotator-financing`, `/used-tow-truck-financing` |
| **Leasing** | Tow Truck Leasing, Lease vs Loan | `/tow-truck-leasing`, `/resources/tow-truck-lease-vs-loan` |
| **Programs** | Fleet Expansion, Zero Down, Deferred Pay, Private Party | `/fleet-financing`, `/zero-down-tow-truck-financing`, `/deferred-payment-tow-truck-financing`, `/private-party-tow-truck-financing` |
| **Resources** | Calculator, Cost Guide, ROI Guide, How to Qualify, Start a Towing Business | `/tow-truck-calculator`, `/resources/how-much-does-a-tow-truck-cost`, `/resources/tow-truck-roi`, `/resources/how-to-qualify`, `/resources/how-to-start-a-towing-business` |

| Other Footer Links | href | Status |
|-------------------|------|--------|
| TowLoans logo | `/` | OK |
| Phone | `tel:+18885550199` | OK |
| Email | `mailto:info@towloans.com` | OK |
| Privacy | `#` | PLACEHOLDER — needs real page |
| Terms | `#` | PLACEHOLDER — needs real page |

---

## GAP ANALYSIS: What the SEO Plan Says Homepage Should Link To vs. What's Currently There

### Links present and correct
- `/rollback-financing` — in Equipment Cards + Footer
- `/wrecker-financing` — in Equipment Cards + Footer
- `/rotator-financing` — in Equipment Cards + Footer
- `/used-tow-truck-financing` — in Equipment Cards + Footer
- `/tow-truck-leasing` — in Resource Hub inline + Footer
- `/private-party-tow-truck-financing` — in Programs + Footer
- `/fleet-financing` — in Programs + Footer
- `/zero-down-tow-truck-financing` — in Programs + FAQ + Footer
- `/deferred-payment-tow-truck-financing` — in Programs + FAQ + Footer
- `/tow-truck-calculator` — in How It Works + Revenue Proof + Calculator Teaser + FAQ + Footer
- `/resources/how-much-does-a-tow-truck-cost` — in Resource Hub + Footer
- `/resources/how-to-qualify` — in Requirements + Resource Hub + Footer
- `/resources/tow-truck-roi` — in Revenue Proof + Resource Hub + FAQ + Footer
- `/resources/tow-truck-lease-vs-loan` — in Resource Hub + Footer
- `/resources/how-to-start-a-towing-business` — in Resource Hub inline + FAQ + Footer
- `/resources/section-179-tow-truck` — in Resource Hub inline

### Links missing from body (only in footer or not at all)
| SEO Planned Link | Planned Anchor Text | Planned Placement | Current Status |
|-----------------|--------------------|--------------------|---------------|
| `/tow-truck-calculator` | "See Your Payment" | Hero (secondary CTA) | **MISSING from hero** — exists elsewhere |
| `/tow-truck-leasing` | "Tow truck leasing options" | Programs section | **MISSING from Programs** — only in Resource Hub inline |
| `/resources/when-to-add-next-truck` | — | Not specified for homepage | Not on page at all (not in footer either) |
| `/resources/rotator-vs-heavy-wrecker` | — | Not specified for homepage | Not on page (by design — SEO plan says "removed from nav") |

### Placeholder / broken links
| Link | Issue |
|------|-------|
| Privacy (`#`) | Needs real URL |
| Terms (`#`) | Needs real URL |

---

## Quick Reference: Section IDs for Navigation

| Section | id | Line |
|---------|-----|------|
| Hero | `hero` | 143 |
| Equipment Cards | `equipment` | 226 |
| How It Works | `how-it-works` | 458 |
| Revenue Proof | `revenue` | 535 |
| Programs | `programs` | 644 |
| Requirements | `requirements` | 856 |
| Social Proof / Testimonials | `testimonials` | 975 |
| Calculator Teaser | `calculator` | 1073 |
| Resource Hub | `resources` | 1140 |
| FAQ | `faq` | 1366 |
| Final CTA | `final-cta` | 1381 |
| Footer | (no id) | 1485 |
