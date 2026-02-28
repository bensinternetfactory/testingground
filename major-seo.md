# TowLoans.com Complete Sitemap & Internal Linking Plan

## Context

Building the complete SEO sitemap for towloans.com to dominate all tow truck financing terms in the US. Analysis is based on:
- **42 unique keywords** from Ahrefs CSV export (with SERP data, volumes, difficulty, PAA questions)
- Existing SEO strategy in `docs/sitemap/seo.md`
- Current site structure (3 live routes: `/`, `/revenue-leak`, `/private-party-tow-truck-financing`)

## Key Findings from CSV Analysis

### 1. Leasing is a Massive Untapped Cluster (~1,050 monthly searches)
The existing SEO doc treats leasing as a subsection. The CSV data shows it deserves its own pillar:
- "tow truck leasing" (200), "how much does it cost to lease a tow truck" (100), "used tow trucks for lease" (100), "lease tow truck" (90), "lease a tow truck" (80), "tow truck for lease" (70), "tow truck lease to own" (70), "tow truck leasing companies" (70), "how to lease a tow truck" (60), "tow truck leasing near me" (60), "lease rollback tow truck" (60), "rollback tow truck for lease" (60), plus 5 more variants at 50 vol each.

### 2. Cost Content is the #1 Informational Opportunity
"How much does a tow truck cost to own" (350 vol, KD 1) is the second-highest volume keyword. Traffic potential: 12,000+. Beacon Funding's article is the only real competition.

### 3. Jerr-Dan and Beacon Dominate Every SERP
Jerr-Dan ranks #1 for 20+ of the 42 keywords. Beacon is #1-3 for most others. Both have thin content — Jerr-Dan is a manufacturer's financing page, Beacon is a generic leasing company. Neither is tow-truck-only.

### 4. Zero Keyword Difficulty on Core Terms
"Tow truck financing" (KD 0), "tow truck leasing" (KD 0), "rollback financing" (KD 0), "used tow truck financing" (KD 0). The door is wide open.

### 5. Rich PAA Data for FAQ Optimization
130+ "People Also Ask" questions extracted. Key recurring themes: profitability, payment plans, credit requirements, costs, lease vs buy.

---

## Complete Sitemap (19 pages)

```
towloans.com/
│
├── /                                              HOMEPAGE PILLAR
│
├── EQUIPMENT PILLARS
│   ├── /rollback-financing
│   ├── /wrecker-financing
│   └── /rotator-financing
│
├── ACQUISITION-TYPE PILLARS
│   ├── /tow-truck-leasing                         NEW — captures 1,050+ monthly vol
│   ├── /used-tow-truck-financing
│   └── /private-party-tow-truck-financing          EXISTS
│
├── BUYER-TYPE PAGE
│   └── /fleet-financing
│
├── PROGRAM PAGES
│   ├── /zero-down-tow-truck-financing
│   └── /deferred-payment-tow-truck-financing
│
├── TOOL PAGE
│   └── /tow-truck-calculator
│
└── RESOURCE PAGES
    ├── /resources/how-much-does-a-tow-truck-cost
    ├── /resources/tow-truck-lease-vs-loan
    ├── /resources/tow-truck-roi
    ├── /resources/section-179-tow-truck
    ├── /resources/when-to-add-next-truck
    ├── /resources/how-to-qualify
    └── /resources/how-to-start-a-towing-business
```

---

## Page-by-Page Spec

### 1. `/` — Homepage Pillar: "Tow Truck Financing"

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| tow truck financing | 400 | 0 | $3.50 |
| tow truck financing companies | 100 | 0 | $5.00 |
| tow truck loans | 90 | 0 | $4.50 |
| tow truck financing near me | 70 | 0 | $3.50 |
| finance tow truck | 70 | 0 | $3.00 |
| how to finance a tow truck | 70 | 0 | $2.00 |
| best tow truck financing | 70 | 0 | $0.00 |
| tow truck for sale finance | 60 | 0 | $1.00 |
| tow truck equipment financing | 50 | 0 | $0.00 |
| **Cluster total** | **~980** | | |

**Primary CTA:** "Get Pre-Approved in 30 Seconds" → `#pre-approve`
**Secondary CTA:** "See Your Payment" → `/tow-truck-calculator`
**Tertiary CTA:** "Talk to a Tow Truck Financing Specialist" → `#specialist`

**FAQ Targets (from PAA):**
- How long can you finance a tow truck?
- What credit score is needed for truck financing?
- Does owning a tow truck make money?
- Do tow trucks have payment plans?
- What happens if you can't afford a tow truck?
- How much money do I need to start a tow truck business?

**Internal Links OUT:**
| Destination | Anchor Text | Placement |
|-------------|-------------|-----------|
| `/rollback-financing` | "Rollback & flatbed financing" | Equipment cards section |
| `/wrecker-financing` | "Wrecker financing" | Equipment cards section |
| `/rotator-financing` | "Rotator financing" | Equipment cards section |
| `/tow-truck-leasing` | "Tow truck leasing options" | Body / programs section |
| `/used-tow-truck-financing` | "Used tow truck financing" | Body / programs section |
| `/private-party-tow-truck-financing` | "Private party & auction financing" | Body / differentiation |
| `/fleet-financing` | "Fleet expansion programs" | Programs section |
| `/zero-down-tow-truck-financing` | "Zero down financing" | Programs section |
| `/deferred-payment-tow-truck-financing` | "Deferred payment options" | Programs section |
| `/tow-truck-calculator` | "Calculate your payment" | Calculator CTA section |
| `/resources/how-much-does-a-tow-truck-cost` | "How much does a tow truck cost?" | Resource links |
| `/resources/how-to-qualify` | "See financing requirements" | Body / qualification section |
| `/resources/tow-truck-roi` | "See how fast a truck pays for itself" | Revenue leak section |

---

### 2. `/rollback-financing` — Rollback / Flatbed Financing

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| rollback financing | 50 | 0 | $2.50 |
| rollback tow truck financing | 50 | 0 | $0.00 |
| lease rollback tow truck | 60 | 0 | $1.40 |
| rollback tow truck for lease | 60 | 0 | $0.80 |
| flatbed tow truck financing* | — | — | — |
| **Cluster total** | **~220+** | | |

**Primary CTA:** "Get Pre-Approved for a Rollback" → `#pre-approve`
**Secondary CTA:** "See Your Rollback Payment" → `/tow-truck-calculator?type=rollback`

**FAQ Targets (from PAA):**
- How long can you finance a tow truck?
- How much does a rollback tow truck cost?
- Can you lease a rollback tow truck?
- What credit score do I need to finance a trailer?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/wrecker-financing` | "Need a wrecker instead?" |
| `/rotator-financing` | "Looking at rotators?" |
| `/tow-truck-leasing` | "Explore rollback leasing options" |
| `/used-tow-truck-financing` | "Financing a used rollback" |
| `/tow-truck-calculator` | "Calculate your rollback payment" |
| `/resources/how-much-does-a-tow-truck-cost` | "How much does a rollback cost?" |
| `/resources/tow-truck-lease-vs-loan` | "Should you lease or finance your rollback?" |
| `/resources/section-179-tow-truck` | "Write off your rollback this year" |
| `/zero-down-tow-truck-financing` | "Zero down rollback financing" |

---

### 3. `/wrecker-financing` — Wrecker Financing

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| wrecker financing* | — | — | — |
| wrecker tow truck loans* | — | — | — |
| light duty wrecker financing* | — | — | — |
| medium duty wrecker financing* | — | — | — |
| heavy duty wrecker financing* | — | — | — |

*Not in CSV but identified in strategy doc as valid targets with dedicated search volume.

**Primary CTA:** "Get Pre-Approved for a Wrecker" → `#pre-approve`
**Secondary CTA:** "See Your Wrecker Payment" → `/tow-truck-calculator?type=wrecker`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/rollback-financing` | "Need a rollback instead?" |
| `/rotator-financing` | "Ready for a rotator?" |
| `/tow-truck-leasing` | "Explore wrecker leasing options" |
| `/used-tow-truck-financing` | "Financing a used wrecker" |
| `/tow-truck-calculator` | "Calculate your wrecker payment" |
| `/resources/how-much-does-a-tow-truck-cost` | "How much does a wrecker cost?" |
| `/resources/rotator-vs-heavy-wrecker` | "Heavy wrecker vs. rotator — which do you need?" |
| `/zero-down-tow-truck-financing` | "Zero down wrecker financing" |

---

### 4. `/rotator-financing` — Rotator Financing

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| rotator financing | 0* | 0 | $0.00 |
| rotator tow truck financing* | — | — | — |
| 50 ton rotator financing* | — | — | — |
| 75 ton rotator financing* | — | — | — |

*Low volume in Ahrefs but extremely high ticket ($200K-$1.3M). Almost zero competition.

**Primary CTA:** "Talk to a Rotator Financing Specialist" → `#specialist`
**Secondary CTA:** "See Your Rotator Payment" → `/tow-truck-calculator?type=rotator`

**FAQ Targets:**
- How much does a rotator cost?
- How fast does a rotator pay for itself?
- Rotator vs heavy wrecker — which is right for your operation?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/wrecker-financing` | "Heavy wrecker financing" |
| `/tow-truck-leasing` | "Rotator leasing options" |
| `/tow-truck-calculator` | "Calculate your rotator payment" |
| `/resources/rotator-vs-heavy-wrecker` | "Rotator vs heavy wrecker comparison" |
| `/resources/tow-truck-roi` | "How fast does a rotator pay for itself?" |
| `/resources/section-179-tow-truck` | "Section 179 deduction on your rotator" |
| `/fleet-financing` | "Adding a rotator to your fleet" |
| `/deferred-payment-tow-truck-financing` | "Defer payments while your rotator ramps up" |

---

### 5. `/tow-truck-leasing` — Tow Truck Leasing Pillar (NEW)

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| tow truck leasing | 200 | 0 | $1.40 |
| how much does it cost to lease a tow truck | 100 | 0 | $1.10 |
| used tow trucks for lease | 100 | 0 | $0.80 |
| lease tow truck | 90 | 0 | $1.40 |
| lease a tow truck | 80 | 0 | $1.40 |
| tow truck for lease | 70 | 0 | $1.40 |
| tow truck leasing companies | 70 | 0 | $2.00 |
| tow truck lease to own | 70 | 0 | $1.30 |
| how to lease a tow truck | 60 | 0 | $2.00 |
| tow truck leasing near me | 60 | 56 | $1.50 |
| lease a tow truck near me | 50 | 0 | $1.20 |
| tow truck for lease near me | 50 | 49 | $1.40 |
| lease tow trucks | 50 | 4 | $0.00 |
| where can i lease a tow truck | 50 | 0 | $1.30 |
| **Cluster total** | **~1,050+** | | |

**Primary CTA:** "Get a Leasing Quote in 30 Seconds" → `#pre-approve`
**Secondary CTA:** "Compare Lease vs. Loan" → `/resources/tow-truck-lease-vs-loan`

**FAQ Targets (from PAA):**
- Can I lease a tow truck?
- How much is a truck lease per month?
- How much does it cost to rent a tow truck?
- Do tow truck companies have payment plans?
- Is leasing a truck ever a good idea?
- Is it cheaper to lease a truck or buy a truck?
- How profitable is owning a tow truck?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing options" |
| `/rollback-financing` | "Lease a rollback" |
| `/wrecker-financing` | "Lease a wrecker" |
| `/rotator-financing` | "Lease a rotator" |
| `/used-tow-truck-financing` | "Used tow truck leasing" |
| `/tow-truck-calculator` | "Calculate your lease payment" |
| `/resources/tow-truck-lease-vs-loan` | "Lease vs. loan — which is right for you?" |
| `/resources/how-much-does-a-tow-truck-cost` | "How much does a tow truck cost?" |
| `/resources/section-179-tow-truck` | "Tax advantages of leasing" |
| `/zero-down-tow-truck-financing` | "Zero down leasing programs" |

---

### 6. `/used-tow-truck-financing` — Used Tow Truck Financing

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| used tow truck financing | 100 | 0 | $2.50 |
| used tow trucks for lease | 100 | 0 | $0.80 |
| how much is a used tow truck | 40 | 2 | $0.10 |
| used wrecker financing* | — | — | — |
| used rollback financing* | — | — | — |
| **Cluster total** | **~240+** | | |

**Primary CTA:** "Get Pre-Approved for a Used Truck" → `#pre-approve`
**Secondary CTA:** "Found your truck? See your payment." → `/tow-truck-calculator`

**FAQ Targets (from PAA):**
- How long can you finance a tow truck?
- What credit score do you need to buy a dump truck?
- What is a good monthly payment for a used truck?
- How much does a used tow truck cost to own?
- Is it cheaper to lease a truck or buy a truck?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/private-party-tow-truck-financing` | "Buying from a private seller?" |
| `/tow-truck-leasing` | "Used tow truck leasing options" |
| `/tow-truck-calculator` | "Calculate your used truck payment" |
| `/resources/how-much-does-a-tow-truck-cost` | "Used tow truck price guide" |
| `/zero-down-tow-truck-financing` | "Zero down on a used truck" |
| `/deferred-payment-tow-truck-financing` | "Defer payments until your truck is earning" |
| `/resources/tow-truck-roi` | "How fast does a used truck pay for itself?" |
| `/rollback-financing` | "Used rollback financing" |
| `/wrecker-financing` | "Used wrecker financing" |

---

### 7. `/private-party-tow-truck-financing` — Private Party Financing (EXISTS)

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| private party tow truck financing* | — | — | — |
| Facebook marketplace tow truck financing* | — | — | — |
| tow truck auction financing* | — | — | — |
| finance tow truck from private seller* | — | — | — |

**Primary CTA:** "Get Pre-Approved Before You Meet the Seller" → `#pre-approve`
**Secondary CTA:** "See your payment in 30 seconds" → `/tow-truck-calculator`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/used-tow-truck-financing` | "Used tow truck financing options" |
| `/tow-truck-calculator` | "Calculate your payment" |
| `/resources/how-much-does-a-tow-truck-cost` | "Is the price right? Check our cost guide" |
| `/zero-down-tow-truck-financing` | "Zero down on private party deals" |
| `/resources/how-to-qualify` | "What you need to qualify" |

---

### 8. `/fleet-financing` — Fleet Expansion Programs

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| fleet expansion financing* | — | — | — |
| multi-truck financing* | — | — | — |
| second truck financing* | — | — | — |
| tow truck fleet financing* | — | — | — |

**Primary CTA:** "Talk to Our Fleet Team" → `#specialist`
**Secondary CTA:** "Get Pre-Approved for Your Next Truck" → `#pre-approve`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/rollback-financing` | "Add a rollback to your fleet" |
| `/wrecker-financing` | "Add a wrecker to your fleet" |
| `/rotator-financing` | "Add a rotator to your fleet" |
| `/tow-truck-calculator` | "Run the numbers on truck #2" |
| `/resources/when-to-add-next-truck` | "Signs it's time to add another truck" |
| `/resources/tow-truck-roi` | "Revenue math: when does truck #2 make sense?" |
| `/deferred-payment-tow-truck-financing` | "Defer payments on your fleet addition" |
| `/zero-down-tow-truck-financing` | "Add a truck with zero down" |

---

### 9. `/zero-down-tow-truck-financing` — Zero Down Programs

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| zero down tow truck financing* | — | — | — |
| no money down tow truck* | — | — | — |
| 0 down tow truck financing* | — | — | — |
| zero down wrecker/rollback* | — | — | — |

**Primary CTA:** "Check If You Qualify — No Hard Credit Pull" → `#pre-approve`
**Secondary CTA:** "See your zero-down payment" → `/tow-truck-calculator`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/rollback-financing` | "Zero down rollback financing" |
| `/wrecker-financing` | "Zero down wrecker financing" |
| `/used-tow-truck-financing` | "Zero down on used trucks" |
| `/tow-truck-calculator` | "Calculate your zero-down payment" |
| `/deferred-payment-tow-truck-financing` | "Combine zero down with deferred payments" |
| `/resources/how-to-qualify` | "Zero down requirements" |
| `/tow-truck-leasing` | "Zero down leasing" |

---

### 10. `/deferred-payment-tow-truck-financing` — Deferred Payment Programs

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| deferred payment tow truck financing* | — | — | — |
| delayed payment equipment financing* | — | — | — |
| 180 day deferred payment* | — | — | — |

**Primary CTA:** "See If You Qualify for Deferred Payments" → `#pre-approve`
**Secondary CTA:** "Calculate payments with 180-day deferral" → `/tow-truck-calculator`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/zero-down-tow-truck-financing` | "Combine with zero down" |
| `/fleet-financing` | "Fleet growth with deferred payments" |
| `/tow-truck-calculator` | "See your deferred payment schedule" |
| `/rotator-financing` | "Deferred payments on rotators" |
| `/resources/tow-truck-roi` | "Earn before you pay — see the math" |

---

### 11. `/tow-truck-calculator` — Payment + ROI Calculator

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| tow truck payment calculator* | — | — | — |
| tow truck financing calculator* | — | — | — |
| tow truck loan calculator* | — | — | — |
| how much is a tow truck payment* | — | — | — |

**Primary CTA:** "Like what you see? Get pre-approved in 30 seconds." → `#pre-approve`
**Secondary CTA:** "Talk to a specialist about your numbers" → `#specialist`

**FAQ Targets (from PAA):**
- What is the payment on a $40,000 truck?
- How much is a $70,000 truck payment?
- How much is a truck lease per month?

**Internal Links OUT (contextual based on calculator inputs):**
| Destination | Anchor Text |
|-------------|-------------|
| `/rollback-financing` | "Financing a rollback? See rollback options" |
| `/wrecker-financing` | "Financing a wrecker? See wrecker options" |
| `/rotator-financing` | "Financing a rotator? See rotator options" |
| `/tow-truck-leasing` | "Want to lease instead? Compare options" |
| `/used-tow-truck-financing` | "Financing a used truck? See used truck options" |
| `/zero-down-tow-truck-financing` | "Want zero down? See zero-down programs" |
| `/deferred-payment-tow-truck-financing` | "Want to defer payments? See deferral programs" |
| `/resources/tow-truck-roi` | "How fast will this truck pay for itself?" |
| `/resources/tow-truck-lease-vs-loan` | "Not sure? Compare lease vs. loan" |

---

### 12. `/resources/how-much-does-a-tow-truck-cost` — Cost Guide

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| how much does a tow truck cost to own | 350 | 1 | $0.08 |
| how much does it cost to get a tow truck | 50 | 0 | $1.30 |
| how much is a used tow truck | 40 | 2 | $0.10 |
| tow truck how much does it cost | 20 | 0 | $1.40 |
| **Cluster total** | **~460** | | |

**Primary CTA:** "Know the price? See your payment." → `/tow-truck-calculator`
**Secondary CTA:** "Get pre-approved for your truck" → `#pre-approve`

**FAQ Targets (from PAA):**
- Is a tow truck a good investment?
- How much does it cost to buy your own tow truck?
- How much can you make owning your own tow truck?
- How much does it cost to start a tow truck?
- Is it better to buy a new or used tow truck?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing options" |
| `/rollback-financing` | "Rollback financing — from $X/month" |
| `/wrecker-financing` | "Wrecker financing — from $X/month" |
| `/rotator-financing` | "Rotator financing — from $X/month" |
| `/tow-truck-calculator` | "See what your truck payment would be" |
| `/used-tow-truck-financing` | "Used tow truck financing" |
| `/resources/tow-truck-roi` | "How fast does a truck pay for itself?" |
| `/resources/section-179-tow-truck` | "Reduce costs with Section 179" |
| `/tow-truck-leasing` | "Leasing costs vs buying" |

---

### 13. `/resources/tow-truck-lease-vs-loan` — Lease vs Buy Comparison

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| tow truck lease vs loan* | — | — | — |
| tow truck leasing vs financing* | — | — | — |
| should I lease or buy a tow truck* | — | — | — |

**Primary CTA:** "Ready to decide? Get pre-approved for either option." → `#pre-approve`
**Secondary CTA:** "Run the numbers" → `/tow-truck-calculator`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/tow-truck-leasing` | "Tow truck leasing programs" |
| `/tow-truck-calculator` | "Compare lease vs loan payments" |
| `/resources/section-179-tow-truck` | "Tax implications: lease vs loan" |
| `/resources/tow-truck-roi` | "ROI comparison by structure" |

---

### 14. `/resources/tow-truck-roi` — ROI / Profitability Guide

**Target Keywords:**
| Keyword | Volume | KD | CPC |
|---------|--------|-----|------|
| tow truck ROI* | — | — | — |
| how fast does a tow truck pay for itself* | — | — | — |
| towing revenue per truck* | — | — | — |
| tow truck profitability* | — | — | — |

**Primary CTA:** "Run Your Numbers" → `/tow-truck-calculator`
**Secondary CTA:** "Ready to add revenue? Get pre-approved." → `#pre-approve`

**FAQ Targets (from PAA):**
- How profitable is owning a tow truck?
- Is owning a tow truck profitable?
- Is there good money in owning a tow truck?
- How much can you make owning a tow truck per month?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Finance your next truck" |
| `/tow-truck-calculator` | "Calculate your truck's ROI" |
| `/fleet-financing` | "Add another revenue-generating truck" |
| `/resources/when-to-add-next-truck` | "When to add your next truck" |
| `/rollback-financing` | "Rollback ROI breakdown" |
| `/rotator-financing` | "Rotator ROI — heavy recovery math" |
| `/resources/how-much-does-a-tow-truck-cost` | "Cost breakdown by equipment type" |

---

### 15. `/resources/section-179-tow-truck` — Tax Advantage Guide

**Target Keywords:** Section 179 tow truck, tow truck tax deduction, equipment depreciation tow truck

**Primary CTA:** "Finance Before Year-End and Write It Off" → `#pre-approve`
**Secondary CTA:** "See your payment" → `/tow-truck-calculator`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/rollback-financing` | "Finance a rollback and deduct it" |
| `/wrecker-financing` | "Finance a wrecker and deduct it" |
| `/rotator-financing` | "Finance a rotator and deduct it" |
| `/tow-truck-calculator` | "See what you'd save" |
| `/resources/tow-truck-lease-vs-loan` | "Section 179 for leases vs loans" |
| `/tow-truck-leasing` | "Leasing and Section 179" |

---

### 16. `/resources/when-to-add-next-truck` — Fleet Growth Guide

**Target Keywords:** when to add another tow truck, grow towing business, scale towing company, towing fleet expansion

**Primary CTA:** "Ready to grow? Talk to our fleet team." → `#specialist`
**Secondary CTA:** "Get pre-approved for truck #2" → `#pre-approve`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/fleet-financing` | "Fleet expansion financing programs" |
| `/resources/tow-truck-roi` | "Revenue math for your next truck" |
| `/tow-truck-calculator` | "Run the numbers on a second truck" |
| `/zero-down-tow-truck-financing` | "Add a truck with zero down" |
| `/deferred-payment-tow-truck-financing` | "Defer payments until truck #2 is earning" |
| `/used-tow-truck-financing` | "Save with a used truck" |

---

### 17. `/resources/how-to-qualify` — Requirements Guide

**Target Keywords:** tow truck financing requirements, how to qualify for tow truck financing, tow truck financing application, documents needed

**Primary CTA:** "See If You Qualify — 30-Second Soft Pull" → `#pre-approve`
**Secondary CTA:** "Questions? Talk to a specialist." → `#specialist`

**FAQ Targets (from PAA):**
- What credit score is needed for truck financing?
- How to get financed for a tow truck?
- What credit score is needed for 0% truck financing?
- How hard is it to finance a tow truck?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing" |
| `/zero-down-tow-truck-financing` | "Qualify for zero down" |
| `/tow-truck-calculator` | "See what you'd be approved for" |
| `/used-tow-truck-financing` | "Requirements for used truck financing" |
| `/private-party-tow-truck-financing` | "Requirements for private party deals" |

---

### 18. `/resources/how-to-start-a-towing-business` — Startup Guide (Top-of-Funnel)

**Target Keywords:** how to start a towing business, towing business startup costs, tow truck business plan

**Primary CTA:** "Ready for your first truck? Get pre-approved." → `#pre-approve`
**Secondary CTA:** "See what a truck would cost" → `/tow-truck-calculator`

**FAQ Targets (from PAA):**
- How much money do you need to start a tow truck company?
- Can anybody own a tow truck?
- What licenses do you need for a tow truck?

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/` | "Tow truck financing for new operators" |
| `/resources/how-much-does-a-tow-truck-cost` | "How much does a tow truck cost?" |
| `/resources/how-to-qualify` | "Financing requirements for first-time buyers" |
| `/used-tow-truck-financing` | "Start with a used truck" |
| `/rollback-financing` | "Most popular first truck: the rollback" |
| `/resources/tow-truck-roi` | "Is a tow truck business profitable?" |
| `/zero-down-tow-truck-financing` | "Start with zero down" |

---

### 19. `/resources/rotator-vs-heavy-wrecker` — Equipment Comparison (REMOVED from nav, linked from equipment pages)

**Target Keywords:** rotator vs heavy wrecker, when to buy a rotator, rotator vs integrated wrecker

**Primary CTA:** "Talk to a heavy equipment specialist" → `#specialist`
**Secondary CTA:** "See financing for both" → `/tow-truck-calculator`

**Internal Links OUT:**
| Destination | Anchor Text |
|-------------|-------------|
| `/rotator-financing` | "Rotator financing options" |
| `/wrecker-financing` | "Heavy wrecker financing" |
| `/tow-truck-calculator` | "Compare payments side by side" |
| `/resources/tow-truck-roi` | "ROI comparison: rotator vs wrecker" |
| `/fleet-financing` | "Adding heavy equipment to your fleet" |

---

## Internal Linking Map (Visual)

```
                              ┌─────────────────────────┐
                              │    / (Homepage)          │
                              │  "Tow Truck Financing"   │
                              │  Cluster: ~980 vol       │
                              └────────────┬─────────────┘
                                           │
              links to EVERY page below + calculator + resources
                                           │
     ┌────────────┬────────────┬───────────┼───────────┬────────────┬────────────┐
     │            │            │           │           │            │            │
     ▼            ▼            ▼           ▼           ▼            ▼            ▼
/rollback    /wrecker    /rotator    /tow-truck  /used-truck  /private    /fleet-
-financing   -financing  -financing  -leasing    -financing   -party      financing
 ~220 vol                             ~1050 vol   ~240 vol
     │            │            │           │           │            │            │
     └────────────┴─────┬──────┴───────────┘           │            │            │
         Equipment pages cross-link each other          │            │            │
         + all link to leasing page                     │            │            │
                        │                               │            │            │
                        ▼                               ▼            ▼            ▼
              ┌─────────────────┐              ┌───────────────────────────────────┐
              │  /tow-truck-    │              │  /zero-down     /deferred-payment │
              │  calculator     │◄─────────────│  (Program pages cross-link        │
              │  (EVERY page    │              │   each other + to equipment       │
              │   links here)   │              │   pages + calculator)             │
              └────────┬────────┘              └───────────────────────────────────┘
                       │
           links contextually to every
           equipment + program page
                       │
              ┌────────┴────────┐
              │  /resources/*   │
              │  ┌─────────────────────────────────────────┐
              │  │ how-much-does-a-tow-truck-cost (460 vol)│
              │  │ tow-truck-lease-vs-loan                 │
              │  │ tow-truck-roi                           │
              │  │ section-179-tow-truck                   │
              │  │ when-to-add-next-truck                  │
              │  │ how-to-qualify                           │
              │  │ how-to-start-a-towing-business           │
              │  │ rotator-vs-heavy-wrecker                │
              │  │                                         │
              │  │ Every resource links back to parent     │
              │  │ pillar(s) + to calculator               │
              │  └─────────────────────────────────────────┘
              └─────────────────┘
```

### Linking Rules Summary

1. **Homepage → Everything** (13+ outbound links to all pillars, programs, calculator, top resources)
2. **Equipment pages ↔ Each other** (cross-link rollback, wrecker, rotator)
3. **Equipment pages → Leasing** (every equipment page links to leasing for that equipment type)
4. **Every commercial page → Calculator** (contextual CTA with equipment type)
5. **Every page → Pre-approval** (`#pre-approve` anchor on every page)
6. **Used → Private Party** (spoke relationship)
7. **Fleet → Growth resources** (when-to-add, ROI guide, deferred payments)
8. **Section 179 → Every equipment page** (urgency driver)
9. **Calculator → Everything** (contextual outbound based on user inputs)
10. **Resources → Parent pillars** (every resource links back to its parent commercial page)
11. **Leasing ↔ Homepage** (strong bidirectional as the two highest-volume pillars)
12. **Zero Down ↔ Deferred Payments** (combine programs = powerful conversion path)

---

## Navigation Structure

```
Logo (TowLoans) → /
├── Financing ▾
│   ├── Rollback Financing        → /rollback-financing
│   ├── Wrecker Financing         → /wrecker-financing
│   ├── Rotator Financing         → /rotator-financing
│   └── Used Tow Truck Financing  → /used-tow-truck-financing
├── Leasing ▾
│   ├── Tow Truck Leasing         → /tow-truck-leasing
│   ├── Lease vs. Loan            → /resources/tow-truck-lease-vs-loan
│   └── Lease-to-Own              → /tow-truck-leasing#lease-to-own
├── Programs ▾
│   ├── Fleet Expansion           → /fleet-financing
│   ├── Zero Down                 → /zero-down-tow-truck-financing
│   ├── Deferred Payments         → /deferred-payment-tow-truck-financing
│   └── Private Party             → /private-party-tow-truck-financing
├── Resources ▾
│   ├── Payment Calculator        → /tow-truck-calculator
│   ├── How Much Does a Truck Cost → /resources/how-much-does-a-tow-truck-cost
│   ├── Tow Truck ROI Guide       → /resources/tow-truck-roi
│   ├── How to Qualify            → /resources/how-to-qualify
│   └── Start a Towing Business   → /resources/how-to-start-a-towing-business
├── (888) 555-0199
└── [Get Pre-Approved] → #pre-approve
```

---

## Implementation Priority

### Phase 1 — Foundation (Weeks 1-3)
1. **Move `/revenue-leak` to `/`** — Homepage becomes the head term pillar
2. **Build `/rollback-financing`** — Fastest path to page 1 (KD 0, CFF only competition)
3. **Build `/tow-truck-leasing`** — Captures 1,050+ monthly searches, KD 0
4. **Build `/tow-truck-calculator`** — "Tow calls to cover payment" = your moat

### Phase 2 — Equipment + Differentiation (Weeks 4-6)
5. **Build `/wrecker-financing`**
6. **Build `/rotator-financing`**
7. **Build `/used-tow-truck-financing`**
8. **Build `/resources/how-much-does-a-tow-truck-cost`** — 460 combined monthly volume

### Phase 3 — Programs + Growth (Weeks 7-9)
9. **Build `/zero-down-tow-truck-financing`**
10. **Build `/fleet-financing`**
11. **Build `/deferred-payment-tow-truck-financing`**
12. **Build `/resources/tow-truck-lease-vs-loan`**

### Phase 4 — Authority + Long-Tail (Weeks 10-12)
13. **Build `/resources/tow-truck-roi`**
14. **Build `/resources/how-to-qualify`**
15. **Build `/resources/section-179-tow-truck`**
16. **Build `/resources/when-to-add-next-truck`**
17. **Build `/resources/rotator-vs-heavy-wrecker`**
18. **Build `/resources/how-to-start-a-towing-business`**

### Infrastructure (parallel to all phases)
- Add `sitemap.ts` for dynamic XML sitemap generation
- Add `robots.txt`
- Update root `layout.tsx` metadata (currently placeholder "Create Next App")
- Add JSON-LD structured data to all pages (Organization, FAQPage, Product schemas)

---

## Verification

After implementation:
1. Run `npm run build` — ensure all routes compile without errors
2. Check `/sitemap.xml` generates correctly with all 19 URLs
3. Verify all internal links resolve (no 404s)
4. Check metadata renders correctly for each page (title, description, OG tags)
5. Validate JSON-LD with Google's Rich Results Test
6. Lighthouse audit each page for Core Web Vitals
7. Manual click-through of all nav dropdown links
8. Verify mobile nav accordion includes all sections
