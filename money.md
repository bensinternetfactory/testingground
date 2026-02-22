# Tow Truck Financing — Pillar Page Funnel Architecture

> **Page:** towloans.com/ (homepage IS the pillar — no separate `/tow-truck-financing/` path)
> **H1:** Tow Truck Financing Built for Your Business
> **Target keyword:** "tow truck financing" (400 vol/mo, KD 0, TP 1,000, CPC $3.50)
> **Word count:** 1,500–2,500
> **Architecture:** Two-speed funnel (fast lane for high-intent, slow lane for consideration)

---

## Keyword Data (Ahrefs, Feb 2026)

All tow-truck-specific terms show **0 keyword difficulty**. The market is wide open.

| Keyword | Vol | KD | CPC | TP | Intents |
|---------|-----|-----|------|----|---------|
| tow truck financing | 400 | 0 | $3.50 | 1,000 | Info, Commercial |
| beacon funding (branded competitor) | 400 | 3 | $3.50 | 350 | Info, Commercial, Branded |
| truck financing companies | 250 | 19 | $9.00 | 1,000 | Info, Commercial |
| tow truck leasing | 150 | 0 | $1.40 | 1,000 | Info, Commercial |
| how much does it cost to lease a tow truck | 100 | 0 | $1.10 | 90 | Info, Commercial |
| tow truck financing companies | 100 | 0 | $5.00 | 900 | Info, Commercial |
| used tow trucks for lease | 100 | 0 | $0.80 | 1,000 | Info, Commercial, Transactional |
| used tow truck financing | 100 | 0 | $2.50 | 450 | Info, Commercial, Transactional |
| lease tow truck | 90 | 0 | $1.40 | 1,100 | Info, Commercial |
| buy here pay here tow trucks for sale | 90 | 7 | $0.90 | 500 | Commercial, Transactional |
| lease a tow truck | 80 | 0 | $1.40 | 1,100 | Info, Commercial, Transactional |
| finance tow truck | 70 | 0 | $3.00 | 1,000 | Info, Commercial |
| tow truck for lease | 70 | 0 | $1.40 | 1,100 | Info, Commercial, Transactional |
| how to finance a tow truck | 70 | 0 | $2.00 | 1,000 | Info, Commercial |
| rollback financing | 50 | 0 | $2.50 | 1,000 | Info, Commercial |
| rotator financing | ~0 | — | — | — | Long-tail |

**Strategic takeaway:** "tow truck financing" at 400/mo with 0 difficulty is the money keyword. Domain `towloans.com` is a semantic exact-match. Homepage = pillar. No separate path needed (would cannibalize).

---

## Two-Speed Architecture

```
FAST LANE (High Intent)                    SLOW LANE (Consideration)
─────────────────────────                  ──────────────────────────
Sources: Google Ads, Direct,               Sources: Organic, Referral,
  "finance tow truck" queries                "how to finance a tow truck"

StickyNav "Get Pre-Approved" ──────┐       StickyNav dropdowns for browsing
Hero tile selector ────────────────┤              │
"Check Your Options" CTA ─────────┤       Read headline, scan body copy
                                   │              │
                                   │       Scroll: education + proof arc
                                   │       (13 sections, objection by objection)
                                   │              │
                                   │       Mid-page CTAs catch conviction
                                   │              │
                                   ▼              ▼
                              ┌──────────────────────┐
                              │   #pre-approve form   │
                              │   (3-step progressive  │
                              │    disclosure)         │
                              └──────────────────────┘
                                        │
                                        ▼
                              Instant pre-approval +
                              specialist within 2 hrs
```

Fast lane: ~1.5 CTAs per section, persistent sticky button, hero tiles pre-fill form.
Slow lane: 13-section psychological persuasion arc educates, builds trust, handles objections.

---

## Positioning Angles (5)

Deployed surgically per section — not all at once.

| # | Angle | Core Message |
|---|-------|-------------|
| 1 | Revenue Leak (Enemy) | "Every truck you can't put on the road is money leaving for competitors" |
| 2 | Niche Specialist (Specificity) | "We only finance tow trucks" |
| 3 | Zero-Friction (Speed/Ease) | "Pre-approved in 30 seconds, any seller, any age" |
| 4 | Cash Flow Play (Transformation) | "Add trucks without draining capital" |
| 5 | Math / ROI (Contrarian) | "A truck running 3 calls/day pays for itself in the first week" |

---

## 13-Section Page Structure

Each section maps to a visitor psychological state, deploys specific angles, and handles a specific objection.

### Section 0: StickyNav
- **Component:** `StickyNav` (existing — `components/sections/nav/sticky-nav-rm/`)
- **Role:** Infrastructure. Persistent escape hatch for high-intent visitors.
- **CTAs:** "Get Pre-Approved" button (always visible), phone number link
- **Angles:** None — utility layer
- **Visitor state:** Orientation — "Where am I? What can I do here?"
- **Nav sections:** Financing (rollback, wrecker, rotator, used), Programs (fleet, zero-down, deferred), Resources (calculator, buyer's guide, specialist)

### Section 1: HeroConvert (Above the Fold)
- **Component:** `HeroConvert` (existing — `components/sections/heroes/hero-convert-geico/`)
- **Angles deployed:** #1 Revenue Leak, #2 Niche Specialist
- **Visitor state:** "Does this apply to me?"
- **H1:** "Tow Truck Financing Built for Your Business"
- **Body copy:** "Every call you can't cover is cash driving to your competitor. Select your equipment below and see what you qualify for — 30 seconds, no hard credit pull."
- **Tiles:** Rollback, Wrecker, Heavy Wrecker, Rotator (pre-fills form `?equipment=` param)
- **Primary CTA:** "Check Your Options" → `#pre-approve`
- **Tertiary links:** "Continue Your Saved Application" | "Talk to a Specialist"
- **Microcopy:** "Checking won't affect your credit score."
- **Right column:** Hero truck image (desktop only, `priority` loaded)
- **Config:** `HERO_CONVERT_CONFIG` in `config.ts` — all content is configurable via the config object

### Section 2: QuickNavCards (Intent Router)
- **Component:** `QuickNavCards` (existing — `components/sections/revenue-leak/QuickNavCards.tsx`)
- **Angles deployed:** #3 Zero-Friction
- **Visitor state:** "Let me self-select my path"
- **Cards:**
  - "I need a truck on the road now" → `#pre-approve` (badge: "Most Popular")
  - "I want to see what payments look like" → `#calculator`
  - "I'm growing my fleet this year" → `#programs`

### Section 3: FinancingCards (What We Do)
- **Component:** `FinancingCards` (existing — `components/sections/revenue-leak/FinancingCards.tsx`)
- **Angles deployed:** #2 Niche Specialist
- **Visitor state:** "How is this different from my bank?"
- **H2:** "Financing built for towing. Not a side hustle for a big bank."
- **3 cards:**
  1. "Pre-Approved by Tomorrow" → `#pre-approve`
  2. "New & Used Equipment" → `#programs`
  3. "Fleet Growth Programs" → `#programs`
- **Each card:** Icon, title, 2-3 sentence description, text link CTA with arrow

### Section 4: GuideBuilder (Interactive Qualifier)
- **Component:** `GuideBuilder` (existing — `components/sections/revenue-leak/GuideBuilder.tsx`)
- **Angles deployed:** #3 Zero-Friction
- **Visitor state:** "Does my specific situation work?"
- **H2:** "Tell us what you're looking for"
- **Mad-libs sentence:** "I'm looking at a [Equipment type] that's [Condition] for around [Price range] and I need to move [Timeline]"
- **Dropdowns:**
  - Equipment: Rollback/Flatbed, Wheel-Lift Wrecker, Integrated Wrecker, Heavy-Duty Rotator, Landoll/Trailer, Other Specialty
  - Condition: Brand New (2025–2026), Like New (2022–2024), Used (2018–2021), Older but Solid (Pre-2018)
  - Price: Under $40K, $40K–$75K, $75K–$120K, $120K–$200K, $200K+
  - Timeline: This week, Within 2 weeks, Within 30 days, Just seeing what's out there
- **Primary CTA:** "Show me my options" → `#pre-approve`
- **Secondary:** "Rather talk it through?" → `tel:`
- **Data pass-through:** Selections should pre-fill Step 1 and Step 2 of the pre-approval form

### Section 5: How It Works (Process Steps) — NEW
- **Component:** **NEW** `HowItWorksSection` — server component
- **Angles deployed:** #3 Zero-Friction, #2 Niche Specialist
- **Visitor state:** "What's the actual process?"
- **H2:** "How tow truck financing works"
- **Schema:** `HowTo` structured data markup
- **Steps:**
  1. **Tell us what you're looking for** — "Select your equipment type and answer a few quick questions. Takes about 30 seconds. No hard credit pull."
  2. **See your options** — "Get a preliminary estimate — monthly payment range, term options, and down payment requirements. Instantly."
  3. **Talk to a specialist** — "A financing advisor who knows the towing industry reviews your deal. They'll call within 2 business hours."
  4. **Get funded** — "Full approval typically back within 24 hours. We handle title, payoff, and wiring — dealer, private party, or auction."
- **CTA:** "See what you qualify for" → `#pre-approve` (ghost button style)
- **Internal links:** Step 3 links to `/private-party-tow-truck-financing` and mentions auction/Marketplace support

### Section 6: FeaturedPrograms (Objection Handling)
- **Component:** `FeaturedPrograms` (existing — `components/sections/revenue-leak/FeaturedPrograms.tsx`)
- **Angles deployed:** #4 Cash Flow, #2 Niche Specialist
- **Visitor state:** "But what about MY situation?"
- **H2:** "More trucks on the road. More calls answered."
- **Subhead:** "Here's how we handle the objections you haven't said out loud yet."
- **3 cards:**
  1. "Your Credit Score Isn't the Whole Story" → `#pre-approve` (angle: we look at business strength, not just FICO)
  2. "Already Running Trucks? The Next One's Faster." → `#programs` (angle: repeat customer velocity)
  3. "Rotator Financing. No Runaround." → `#pre-approve` (angle: we understand six-figure specialized equipment)
- **Each card:** Tinted header surface, icon, title, description, text link CTA

### Section 7: CalculatorCTA (ROI Proof)
- **Component:** `CalculatorCTA` (existing — `components/sections/revenue-leak/CalculatorCTA.tsx`)
- **Angles deployed:** #5 Math / ROI
- **Visitor state:** "Can I actually afford this?"
- **H2:** "See how fast the truck pays for itself"
- **Copy:** "Plug in the price of the truck you're looking at. We'll show you the monthly payment — and how many tow calls it takes to cover it."
- **Calendar visualization:** 30-day grid. Days 1–5 pink (#FBF0F6, "Payment Covered"). Days 6–30 green (#EFF7F3, "Profit"). Visual proof: the truck pays for itself in the first week.
- **CTA:** "Run the numbers" → `#pre-approve` (ghost button)
- **Microcopy:** "Want real numbers, not estimates? Get pre-approved in 30 seconds and we'll show you actual payments."
- **Revenue leak math (implicit):** 3 missed calls/day × $250 avg = $22,500/mo leaving on the table

### Section 8: Requirements (Qualification Criteria) — NEW
- **Component:** **NEW** `RequirementsSection` — server component
- **Angles deployed:** #2 Niche Specialist, #3 Zero-Friction
- **Visitor state:** "Will I even qualify?"
- **H2:** "What you need to qualify"
- **Layout:** Two-column comparison
- **Column 1 — "What we look at":**
  - 2+ years in the towing business
  - Steady call volume / revenue
  - How you run your operation
  - Equipment condition and value
- **Column 2 — "What you DON'T need":**
  - Perfect credit score
  - Huge down payment ($0 down available)
  - Brand new equipment only (no age/mileage limits)
  - A dealer — we finance private party, auction, Marketplace
- **CTA:** "Check your pre-approval" → `#pre-approve` (ghost button)
- **Internal links:** "used tow truck financing" links to `/used-tow-truck-financing`, "zero down" links to `/zero-down-tow-truck-financing`

### Section 9: TestimonialsSection (Social Proof)
- **Component:** `TestimonialsSection` (existing — `components/sections/revenue-leak/TestimonialsSection.tsx`)
- **Angles deployed:** #1 Revenue Leak (via stories)
- **Visitor state:** "Has anyone like me done this?"
- **H2:** "They stopped turning down calls."
- **3 testimonials:**
  1. Marcus T. — 3-truck fleet, Georgia. "Turning down 10–15 calls a week... Pre-approved Monday, truck by Thursday. Covered payment in first 12 days."
  2. Dana R. — 6-truck fleet, Texas. "Competitor added two trucks and started pulling my motor club calls... Pre-approved in under a minute."
  3. James W. — 9-truck fleet, Ohio. "Putting off the rotator for two years... Should've done it sooner."
- **Stats bar (4 metrics):**
  - $2.8M+ in towing equipment financed this year
  - 24 hrs average pre-approval to full approval
  - 340+ towing operators funded
  - 4.9/5 average operator rating
- **Layout:** Left column = dark maroon heading card. Right column = stacked testimonial cards.

### Section 10: FAQ Section (SEO + Objection Cleanup) — NEW
- **Component:** **NEW** FAQ accordion — adapt `FAQSectionV2` pattern (`components/sections/v2/FAQSectionV2.tsx`)
- **Restyle:** From zinc/amber palette to revenue-leak design system (rounded-3xl, `#E9E9E9` borders, `#111111`/`#545454`/`#DE3341` color palette)
- **Angles deployed:** All angles, deployed per-question
- **Visitor state:** "Specific concerns before I commit"
- **Schema:** `FAQPage` structured data markup (use `faqSchema` pattern from `faqData.ts`)
- **10 questions (ordered by psychological priority):**

| # | Question | SEO Target | Angle |
|---|----------|-----------|-------|
| 1 | What credit score do I need for tow truck financing? | "tow truck financing credit score" | #2 Specialist |
| 2 | Can I finance a used tow truck? | "used tow truck financing" (100/mo) | #3 Zero-Friction |
| 3 | How fast can I get approved? | "how long does tow truck financing take" | #3 Zero-Friction |
| 4 | Can I buy from a private seller or auction? | Private party differentiator | #2 Specialist |
| 5 | What's the difference between leasing and financing a tow truck? | "tow truck leasing" (150/mo) | Education |
| 6 | Do you require a down payment? | Zero-down differentiator | #4 Cash Flow |
| 7 | What types of tow trucks do you finance? | rollback, wrecker, rotator long-tails | #2 Specialist |
| 8 | Can I finance a truck that's more than 10 years old? | No-age-limit differentiator | #3 Zero-Friction |
| 9 | How do deferred payments work? | $99 touch payments for 180 days | #4 Cash Flow |
| 10 | Does pre-approval affect my credit score? | Final risk-reversal before conversion | #3 Zero-Friction |

All answers use internal links with keyword-rich anchor text to sub-pillar pages.

### Section 11: FinalCTA (Value Recap + Conversion)
- **Component:** `FinalCTA` (existing — `components/sections/revenue-leak/FinalCTA.tsx`)
- **Angles deployed:** #2 Specialist, #3 Zero-Friction, #4 Cash Flow
- **Visitor state:** "Make it easy for me"
- **H2:** "Your next truck should already be on the road"
- **3 value props (recap):**
  1. "30 Seconds to Pre-Approval" — quick form, no hard credit pull, decision in 24 hours
  2. "Built for Towing. That's All We Do." — Jerr-Dan vs Century, motor club contracts, rotation lists
  3. "Terms That Match How Towing Actually Works" — seasonal flexibility, 36–84 month terms, no prepayment penalties
- **Primary CTA:** "Get pre-approved — 30 seconds, no commitment" → `#pre-approve` (large, dark button)
- **Microcopy:** "See your estimated payment right after. No surprises."
- **Background:** `bg-[#FBF0F6]` — warm, approachable

### Section 12: Pre-Approval Form (3-Step Progressive Disclosure) — NEW
- **Component:** **NEW** `PreApprovalForm` — `"use client"` component
- **Angles deployed:** #3 Zero-Friction
- **Visitor state:** "OK, I'm doing this. Make it painless."
- **Anchor:** `id="pre-approve"`

#### Step 1: "Let's see what you qualify for" (3 fields — low threat)
| Field | Type | Notes |
|-------|------|-------|
| Business name | text | |
| Years in towing | dropdown | 2–3 yrs, 3–5 yrs, 5–10 yrs, 10+ yrs |
| Equipment type | dropdown | Pre-filled from hero tile or GuideBuilder |
- **Microcopy:** "This takes about 30 seconds total."
- **Progress:** Step 1 of 3

#### Step 2: "Almost there" (3 fields — deal info)
| Field | Type | Notes |
|-------|------|-------|
| Estimated purchase price | dollar input | |
| Desired down payment | dropdown | Defaults to $0 |
| How did you find the truck? | radio | Dealer / Private Seller / Auction / Browsing |
- **Microcopy:** "One more step. No hard credit pull."
- **Progress:** Step 2 of 3

#### Step 3: "See your options" (4 fields — contact info last, after investment)
| Field | Type | Notes |
|-------|------|-------|
| Full name | text | |
| Email | email | |
| Phone | tel | |
| Estimated credit range | dropdown | Excellent / Good / Fair / Rebuilding |
- **CTA button:** "See What I Qualify For"
- **Microcopy:** "Soft pull only. No impact to your credit."
- **Progress:** Step 3 of 3

#### Results Screen (instant after submission)
- **Headline:** "Here's your preliminary estimate"
- **Display:**
  - Estimated monthly payment: $XXX – $XXX
  - Estimated term: 48–72 months
  - Down payment: $0 (zero down available)
- **Handoff message:** "A TowCap specialist will reach out within **2 business hours**."
- **Trust badge:** "**30 years combined towing finance experience.**"
- **CTAs:** [Download Your Pre-Approval Summary] [Call Us Now: (888) 555-0199]

#### Form Design Rationale
- **3 steps (not 1):** Commitment escalation + sunk cost psychology. By step 3, they've invested time and won't abandon.
- **Business info first:** Low-threat, non-personal. Establishes they're a real operator.
- **Contact info last:** Only asked after they've configured their deal and are invested.
- **Pre-fill intelligence:** Hero tile selection → equipment type. GuideBuilder dropdowns → equipment + condition + price + timeline. Reduces friction and shows continuity.

### Section 13: Legal + Footer
- **Components:** `LegalSection` + `FooterSection` (existing — `components/sections/revenue-leak/`)
- **Role:** Compliance, trust, internal linking, contact info
- **Legal disclaimer:** "All financing subject to credit approval. TowCap is a financing broker, not a direct lender..."
- **Legal links:** Privacy Policy, Terms of Use, Equal Credit Opportunity Notice, Do Not Sell My Information
- **Footer columns:** Company, Financing Programs, Equipment We Finance, Resources
- **Trust badges:** BBB Accredited, SSL Secured, Trusted by 340+ Operators
- **Contact:** (888) 555-0199 | info@towcap.com
- **Internal links in footer:** Every sub-pillar page appears in footer columns for crawl coverage

---

## Full-Page Funnel Diagram

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        TRAFFIC SOURCES                                       ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   Google Organic          Google Ads         Referral          Direct          ║
║   "tow truck financing"   Brand + exact      Motor club        towloans.com   ║
║   "how to finance..."     match campaigns    forums, FB        bookmarks      ║
║   (KD 0, 400/mo)         (CPC $3.50)        groups            repeat visits   ║
║        │                      │                 │                  │           ║
║        ▼                      ▼                 ▼                  ▼           ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  §0  STICKY NAV (persistent)                                                 ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │  TowCap    Financing ▾    Programs ▾    Resources ▾    (888) 555-0199  │  ║
║  │                                                    [Get Pre-Approved]  │  ║
║  └────────────────────────────────────────────────────────────┬───────────┘  ║
║       Mega menu: Rollback, Wrecker, Rotator, Used │ Fleet,    │              ║
║       Zero-Down, Deferred │ Calculator, Guide, Phone          │              ║
║                                                               │ ← FAST LANE ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §1  HERO CONVERT (Above the Fold)                            │              ║
║  ┌──────────────────────────────────┬────────────────────┐    │              ║
║  │  H1: Tow Truck Financing Built  │                    │    │              ║
║  │      for Your Business           │   [Hero Image]     │    │              ║
║  │                                  │   Truck photo      │    │              ║
║  │  "Every call you can't cover     │   (desktop only)   │    │              ║
║  │   is cash driving to your        │                    │    │              ║
║  │   competitor..."                 │                    │    │              ║
║  │                                  │                    │    │              ║
║  │  ┌──────────┐ ┌──────────┐      │                    │    │              ║
║  │  │ Rollback │ │ Wrecker  │      │                    │    │              ║
║  │  └──────────┘ └──────────┘      │                    │    │              ║
║  │  ┌──────────┐ ┌──────────┐      │                    │    │              ║
║  │  │ Heavy    │ │ Rotator  │      │                    │    │              ║
║  │  │ Wrecker  │ │          │      │                    │    │              ║
║  │  └──────────┘ └──────────┘      │                    │    │              ║
║  │  View All Equipment Types        │                    │    │              ║
║  │  [Check Your Options] ─────────────────────────────────────┤              ║
║  │  Continue Saved App │ Talk to Specialist               │    │              ║
║  │  "Checking won't affect credit"  │                    │    │              ║
║  └──────────────────────────────────┴────────────────────┘    │              ║
║  Angles: #1 Revenue Leak, #2 Niche Specialist                │              ║
║  Psychology: "Does this apply to me?"                         │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §2  QUICK NAV CARDS (Intent Router)                          │              ║
║  ┌──────────────────┬──────────────────┬──────────────────┐   │              ║
║  │ I need a truck   │ I want to see    │ I'm growing my   │   │              ║
║  │ on the road NOW  │ what payments    │ fleet this year   │   │              ║
║  │ ★ Most Popular   │ look like        │                   │   │              ║
║  │   → #pre-approve │   → #calculator  │   → #programs     │   │              ║
║  └────────┬─────────┴──────────────────┴──────────────────┘   │              ║
║           │                                                    │              ║
║           └────────────────────────────────────────────────────┤              ║
║  Angle: #3 Zero-Friction                                      │              ║
║  Psychology: "Let me self-select my path"                     │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║                                                               │              ║
║                      S L O W   L A N E                        │              ║
║                    (Education + Proof Arc)                     │              ║
║                                                               │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §3  FINANCING CARDS (What We Do)                             │              ║
║  H2: "Financing built for towing.                             │              ║
║       Not a side hustle for a big bank."                      │              ║
║  ┌──────────────────┬──────────────────┬──────────────────┐   │              ║
║  │ Pre-Approved by  │ New & Used       │ Fleet Growth     │   │              ║
║  │ Tomorrow         │ Equipment        │ Programs         │   │              ║
║  │ → #pre-approve───────────────────────────────────────────── ┤              ║
║  │                  │ → #programs      │ → #programs      │   │              ║
║  └──────────────────┴──────────────────┴──────────────────┘   │              ║
║  Angle: #2 Niche Specialist                                   │              ║
║  Psychology: "How is this different from my bank?"            │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §4  GUIDE BUILDER (Interactive Qualifier)                    │              ║
║  H2: "Tell us what you're looking for"                        │              ║
║  ┌─────────────────────────────────────────────────────────┐  │              ║
║  │  "I'm looking at a [Equipment ▾] that's [Condition ▾]  │  │              ║
║  │   for around [Price ▾] and I need to move [Timeline ▾]"│  │              ║
║  │                                                         │  │              ║
║  │  [Show me my options] ─────────────────────────────────────┤              ║
║  │   Rather talk it through? → tel:                        │  │              ║
║  └─────────────────────────────────────────────────────────┘  │              ║
║  Angle: #3 Zero-Friction                                      │              ║
║  Psychology: "Does my specific situation work?"               │              ║
║  Data: Selections pre-fill form Steps 1 + 2                  │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §5  HOW IT WORKS (Process Steps) ★ NEW                       │              ║
║  H2: "How tow truck financing works"                          │              ║
║  Schema: HowTo structured data                                │              ║
║                                                               │              ║
║  ① Tell us what you're looking for (30 sec, no hard pull)     │              ║
║  ② See your options (instant estimate)                        │              ║
║  ③ Talk to a specialist (within 2 business hours)             │              ║
║  ④ Get funded (24 hr full approval, we handle title/payoff)   │              ║
║                                                               │              ║
║  [See what you qualify for] ──────────────────────────────────┤              ║
║  Angles: #3 Zero-Friction, #2 Specialist                      │              ║
║  Psychology: "What's the actual process?"                     │              ║
║  Links: Step 3 → /private-party-tow-truck-financing           │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §6  FEATURED PROGRAMS (Objection Handling)                   │              ║
║  H2: "More trucks on the road. More calls answered."          │              ║
║  ┌──────────────────┬──────────────────┬──────────────────┐   │              ║
║  │ Credit Isn't the │ Already Running  │ Rotator          │   │              ║
║  │ Whole Story      │ Trucks? Next     │ Financing.       │   │              ║
║  │                  │ One's Faster.    │ No Runaround.    │   │              ║
║  │ → #pre-approve───────────────────────────────────────────── ┤              ║
║  │                  │ → #programs      │ → #pre-approve───────┤              ║
║  └──────────────────┴──────────────────┴──────────────────┘   │              ║
║  Angles: #4 Cash Flow, #2 Specialist                          │              ║
║  Psychology: "But what about MY situation?"                   │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §7  CALCULATOR CTA (ROI Proof)                               │              ║
║  H2: "See how fast the truck pays for itself"                 │              ║
║  ┌───────────────────────┬──────────────────────────────┐     │              ║
║  │  Copy: "Plug in the   │  ┌─────────────────────────┐ │     │              ║
║  │  price... we'll show   │  │  1  2  3  4  5  6  7   │ │     │              ║
║  │  how many tow calls    │  │  8  9  10 11 12 13 14  │ │     │              ║
║  │  it takes to cover it" │  │  15 16 17 18 19 20 21  │ │     │              ║
║  │                        │  │  22 23 24 25 26 27 28  │ │     │              ║
║  │  [Run the numbers] ────────────────────────────────────────┤              ║
║  │                        │  │  29 30                  │ │     │              ║
║  │  "Want real numbers?"  │  │  ■ Payment  ■ Profit   │ │     │              ║
║  └───────────────────────┘  └─────────────────────────┘ │     │              ║
║  Angle: #5 Math / ROI                                         │              ║
║  Psychology: "Can I actually afford this?"                    │              ║
║  Implicit math: 3 calls/day × $250 = $22,500/mo              │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §8  REQUIREMENTS (Qualification) ★ NEW                       │              ║
║  H2: "What you need to qualify"                               │              ║
║  ┌─────────────────────────┬─────────────────────────────┐    │              ║
║  │  WHAT WE LOOK AT       │  WHAT YOU DON'T NEED         │    │              ║
║  │  ✓ 2+ years in towing   │  ✗ Perfect credit score      │    │              ║
║  │  ✓ Steady call volume   │  ✗ Huge down payment         │    │              ║
║  │  ✓ How you run your op  │  ✗ Brand new equipment only  │    │              ║
║  │  ✓ Equipment value      │  ✗ A dealer (private OK)     │    │              ║
║  └─────────────────────────┴─────────────────────────────┘    │              ║
║  [Check your pre-approval] ───────────────────────────────────┤              ║
║  Angles: #2 Specialist, #3 Zero-Friction                      │              ║
║  Psychology: "Will I even qualify?"                            │              ║
║  Links: "used" → /used-tow-truck-financing                    │              ║
║         "zero down" → /zero-down-tow-truck-financing          │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §9  TESTIMONIALS (Social Proof)                              │              ║
║  H2: "They stopped turning down calls."                       │              ║
║  ┌────────────┬──────────────────────────────────────────┐    │              ║
║  │ ┌────────┐ │  Marcus T. — 3 trucks, GA               │    │              ║
║  │ │ DARK   │ │  "Pre-approved Monday, truck Thursday"   │    │              ║
║  │ │ MAROON │ │──────────────────────────────────────────│    │              ║
║  │ │ HEADING│ │  Dana R. — 6 trucks, TX                  │    │              ║
║  │ │ CARD   │ │  "Pre-approved in under a minute"        │    │              ║
║  │ │        │ │──────────────────────────────────────────│    │              ║
║  │ └────────┘ │  James W. — 9 trucks, OH                 │    │              ║
║  │            │  "Should've done the rotator sooner"     │    │              ║
║  └────────────┴──────────────────────────────────────────┘    │              ║
║  Stats: $2.8M+ financed │ 24hr approval │ 340+ ops │ 4.9/5   │              ║
║  Angle: #1 Revenue Leak (via stories)                         │              ║
║  Psychology: "Has anyone like me done this?"                  │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §10  FAQ (SEO + Objection Cleanup) ★ NEW                     │              ║
║  10 accordion questions with FAQPage schema markup            │              ║
║  All answers contain internal links to sub-pillar pages       │              ║
║                                                               │              ║
║  1. Credit score needed?           6. Down payment required?  │              ║
║  2. Finance used trucks?           7. Types we finance?       │              ║
║  3. How fast approved?             8. Trucks 10+ years old?   │              ║
║  4. Private seller / auction?      9. Deferred payments?      │              ║
║  5. Lease vs finance?             10. Pre-approval hurts      │              ║
║                                       credit?                 │              ║
║  Angles: All angles, deployed per-question                    │              ║
║  Psychology: "Specific concerns before I commit"              │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║  §11  FINAL CTA (Value Recap + Conversion)                    │              ║
║  H2: "Your next truck should already be on the road"          │              ║
║  ┌──────────────────┬──────────────────┬──────────────────┐   │              ║
║  │ 30 Seconds to    │ Built for        │ Terms That Match  │   │              ║
║  │ Pre-Approval     │ Towing. That's   │ How Towing        │   │              ║
║  │                  │ All We Do.       │ Actually Works    │   │              ║
║  └──────────────────┴──────────────────┴──────────────────┘   │              ║
║  [Get pre-approved — 30 seconds, no commitment] ──────────────┤              ║
║  Angles: #2 Specialist, #3 Zero-Friction, #4 Cash Flow       │              ║
║  Psychology: "Make it easy for me"                            │              ║
╠═══════════════════════════════════════════════════════════════╪═══════════════╣
║                                                               │              ║
║                          ▼ ALL PATHS CONVERGE ▼               │              ║
║                                                               │              ║
╠═══════════════════════════════════════════════════════════════╧═══════════════╣
║  §12  PRE-APPROVAL FORM (3-Step Progressive Disclosure) ★ NEW                ║
║  id="pre-approve"                                                             ║
║                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │  Step 1 of 3: "Let's see what you qualify for"                          │  ║
║  │  ┌──────────────────────────────────────────────────────────────────┐   │  ║
║  │  │  Business name          [________________]                       │   │  ║
║  │  │  Years in towing        [2-3 yrs ▾      ]                       │   │  ║
║  │  │  Equipment type         [Rollback ▾     ]  ← pre-filled         │   │  ║
║  │  │                                                                  │   │  ║
║  │  │  "This takes about 30 seconds total."             [Continue →]  │   │  ║
║  │  └──────────────────────────────────────────────────────────────────┘   │  ║
║  │                                                                         │  ║
║  │  Step 2 of 3: "Almost there"                                            │  ║
║  │  ┌──────────────────────────────────────────────────────────────────┐   │  ║
║  │  │  Est. purchase price    [$_______________]                       │   │  ║
║  │  │  Desired down payment   [$0 ▾           ]  ← defaults to $0     │   │  ║
║  │  │  How'd you find it?     ○ Dealer  ○ Private  ○ Auction  ○ TBD   │   │  ║
║  │  │                                                                  │   │  ║
║  │  │  "One more step. No hard credit pull."            [Continue →]  │   │  ║
║  │  └──────────────────────────────────────────────────────────────────┘   │  ║
║  │                                                                         │  ║
║  │  Step 3 of 3: "See your options"                                        │  ║
║  │  ┌──────────────────────────────────────────────────────────────────┐   │  ║
║  │  │  Full name              [________________]                       │   │  ║
║  │  │  Email                  [________________]                       │   │  ║
║  │  │  Phone                  [________________]                       │   │  ║
║  │  │  Est. credit range      [Good ▾         ]                       │   │  ║
║  │  │                                                                  │   │  ║
║  │  │  "Soft pull only. No impact to your credit."                     │   │  ║
║  │  │                              [See What I Qualify For]           │   │  ║
║  │  └──────────────────────────────────────────────────────────────────┘   │  ║
║  │                                                                         │  ║
║  │  RESULTS SCREEN                                                         │  ║
║  │  ┌──────────────────────────────────────────────────────────────────┐   │  ║
║  │  │  "Here's your preliminary estimate"                              │   │  ║
║  │  │                                                                  │   │  ║
║  │  │  Estimated monthly payment:  $XXX – $XXX                         │   │  ║
║  │  │  Estimated term:             48–72 months                        │   │  ║
║  │  │  Down payment:               $0 (zero down available)            │   │  ║
║  │  │                                                                  │   │  ║
║  │  │  "A TowCap specialist will reach out within 2 business hours."   │   │  ║
║  │  │  "30 years combined towing finance experience."                  │   │  ║
║  │  │                                                                  │   │  ║
║  │  │  [Download Pre-Approval Summary]  [Call Us: (888) 555-0199]     │   │  ║
║  │  └──────────────────────────────────────────────────────────────────┘   │  ║
║  └─────────────────────────────────────────────────────────────────────────┘  ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  §13  LEGAL + FOOTER                                                         ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │  Legal: Privacy │ Terms │ ECOA Notice │ DNSMPI                          │  ║
║  │  "TowCap is a financing broker, not a direct lender..."                │  ║
║  ├─────────────────────────────────────────────────────────────────────────┤  ║
║  │  TowCap                                                                 │  ║
║  │  Company │ Financing Programs │ Equipment We Finance │ Resources        │  ║
║  │  [BBB Accredited] [SSL Secured] [Trusted by 340+ Operators]            │  ║
║  │  © 2026 TowCap │ (888) 555-0199 │ info@towcap.com                     │  ║
║  └─────────────────────────────────────────────────────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## CTA Inventory (20 Touch Points)

~1.5 CTAs per section. Each is contextually relevant — no random "APPLY NOW" injections.

| # | Location | CTA Text | Type | Target |
|---|----------|----------|------|--------|
| 1 | StickyNav (persistent) | "Get Pre-Approved" | Primary button (dark) | #pre-approve |
| 2 | StickyNav phone | "(888) 555-0199" | Text link | tel: |
| 3 | HeroConvert | "Check Your Options" | Primary button (dark) | #pre-approve |
| 4 | Hero tertiary | "Continue Your Saved Application" | Text link | #saved |
| 5 | Hero tertiary | "Talk to a Specialist" | Text link | #specialist |
| 6 | QuickNavCards | "I need a truck on the road now" | Card (badge: "Most Popular") | #pre-approve |
| 7 | QuickNavCards | "I want to see what payments look like" | Card | #calculator |
| 8 | QuickNavCards | "I'm growing my fleet this year" | Card | #programs |
| 9 | FinancingCards | "Get pre-approved now" | Text link + arrow | #pre-approve |
| 10 | FinancingCards | "See what we finance" | Text link + arrow | #programs |
| 11 | FinancingCards | "Talk to us about fleet growth" | Text link + arrow | #programs |
| 12 | GuideBuilder | "Show me my options" | Primary button (dark) | #pre-approve |
| 13 | GuideBuilder | "Rather talk it through?" | Text link (phone) | tel: |
| 14 | How It Works (new) | "See what you qualify for" | Ghost button | #pre-approve |
| 15 | FeaturedPrograms | "Check your pre-approval" | Text link + arrow | #pre-approve |
| 16 | FeaturedPrograms | "See fleet programs" | Text link + arrow | #programs |
| 17 | FeaturedPrograms | "Talk to a rotator specialist" | Text link + arrow | #pre-approve |
| 18 | CalculatorCTA | "Run the numbers" | Ghost button | #pre-approve |
| 19 | Requirements (new) | "Check your pre-approval" | Ghost button | #pre-approve |
| 20 | FinalCTA | "Get pre-approved — 30 seconds, no commitment" | Primary button (dark, large) | #pre-approve |

---

## Internal Linking Strategy (Hub-and-Spoke)

Homepage (pillar) links OUT to sub-pillar pages. Each sub-pillar links back to homepage.

| Target Page | Linked From (on homepage) | Anchor Text Pattern |
|-------------|--------------------------|---------------------|
| `/rollback-financing` | Nav dropdown, FinancingCards, Hero tiles, FAQ Q7 | "rollback financing" |
| `/wrecker-financing` | Nav dropdown, FinancingCards, Hero tiles | "wrecker financing" |
| `/rotator-financing` | Nav dropdown, FeaturedPrograms card 3 | "rotator financing" |
| `/private-party-tow-truck-financing` | FinancingCards card 2, FAQ Q4, How It Works step 3 | "private party tow truck financing" |
| `/used-tow-truck-financing` | Nav dropdown, FAQ Q2, Requirements section | "used tow truck financing" |
| `/zero-down-tow-truck-financing` | Nav Programs dropdown, FAQ Q6, Requirements section | "zero down tow truck financing" |
| `/deferred-payment-tow-truck-financing` | Nav Programs dropdown, FAQ Q9 | "deferred payment financing" |
| `/fleet-financing` | Nav Programs dropdown, FeaturedPrograms card 2, QuickNavCards card 3 | "fleet financing" |

All links use descriptive anchor text containing the target page's primary keyword. No generic "click here" or "learn more."

---

## New Components to Build (4)

| Component | Type | Complexity | Notes |
|-----------|------|------------|-------|
| `PreApprovalForm` | Client (`"use client"`) | High | Multi-step form, pre-fill from URL params / context, results screen, validation |
| `HowItWorksSection` | Server | Low | 4 numbered steps, Schema.org HowTo markup |
| `RequirementsSection` | Server | Low | Two-column comparison layout |
| `FAQSection` (homepage variant) | Client (`"use client"`) | Medium | Adapt FAQSectionV2 accordion, restyle to revenue-leak palette, FAQPage schema |

**Design system to match:** rounded-3xl corners, `#E9E9E9` inset borders, `#111111` / `#545454` / `#DE3341` palette, Geist font, `shadow-[inset_0_0_0_1px_#E9E9E9]` card treatment.

---

## Existing Components to Reuse (9)

| Component | Path | Section |
|-----------|------|---------|
| `StickyNav` | `components/sections/nav/sticky-nav-rm/` | §0 |
| `HeroConvert` | `components/sections/heroes/hero-convert-geico/` | §1 |
| `QuickNavCards` | `components/sections/revenue-leak/QuickNavCards.tsx` | §2 |
| `FinancingCards` | `components/sections/revenue-leak/FinancingCards.tsx` | §3 |
| `GuideBuilder` | `components/sections/revenue-leak/GuideBuilder.tsx` | §4 |
| `FeaturedPrograms` | `components/sections/revenue-leak/FeaturedPrograms.tsx` | §6 |
| `CalculatorCTA` | `components/sections/revenue-leak/CalculatorCTA.tsx` | §7 |
| `TestimonialsSection` | `components/sections/revenue-leak/TestimonialsSection.tsx` | §9 |
| `FinalCTA` | `components/sections/revenue-leak/FinalCTA.tsx` | §11 |
| `LegalSection` | `components/sections/revenue-leak/LegalSection.tsx` | §13 |
| `FooterSection` | `components/sections/revenue-leak/FooterSection.tsx` | §13 |

---

## Key Differentiators (7)

1. **Tow-truck-only specialist** — not a generalist equipment lender
2. **No age/mileage limits** — model year 2000+, 54 months zero down
3. **Private-party & auction financing** — Marketplace, Craigslist, auctions
4. **Zero down available** — add equipment without draining capital
5. **30-second soft pre-approval** — no hard credit pull
6. **180-day deferred payments** — $99 touch payments while truck ramps up
7. **Choose-Your-Payment tool** — see real numbers before committing

---

## SEO Infrastructure

- **Schema.org markup:** FAQPage (§10), HowTo (§5), Organization, LocalBusiness
- **Metadata:** Title tag = "Tow Truck Financing | Fast Pre-Approval, Flexible Terms — TowCap"
- **Meta description:** "Get pre-approved for tow truck financing in 30 seconds. Rollbacks, wreckers, rotators — new or used, any seller. $0 down available. 340+ operators funded."
- **Canonical:** `https://towloans.com/`
- **Open Graph:** H1 + hero image + meta description
- **H-tag hierarchy:** Single H1, one H2 per section (13 H2s), H3s within FAQ answers and card titles

---

## Brand Voice

Straight-talking industry insider. Professional-casual. Like Carhartt meets Affirm.

- Short paragraphs, scannable
- Lead with their reality, not your features
- No countdown timers, fake urgency, or pushy "ACT NOW" CTAs
- Every CTA is contextually earned by the content above it

---

## Implementation Phases

1. **Phase 1:** Migrate `/revenue-leak` page content to `app/page.tsx` (homepage)
2. **Phase 2:** Build 3 new sections (HowItWorks, Requirements, FAQ homepage variant)
3. **Phase 3:** Build PreApprovalForm (highest complexity — multi-step, pre-fill, results)
4. **Phase 4:** SEO infrastructure (Schema.org, metadata, canonical, Open Graph)
5. **Phase 5:** Content polish following brand voice guidelines
