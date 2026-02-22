import type { Metadata } from "next";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import {
  HeroConvert,
  HERO_CONVERT_CONFIG,
} from "@/components/sections/heroes/hero-convert-geico";
import { QuickNavCards } from "@/components/sections/revenue-leak/QuickNavCards";
import { FinancingCards } from "@/components/sections/revenue-leak/FinancingCards";
import { GuideBuilder } from "@/components/sections/revenue-leak/GuideBuilder";
import { HowItWorksSection } from "@/components/sections/revenue-leak/HowItWorksSection";
import { FeaturedPrograms } from "@/components/sections/revenue-leak/FeaturedPrograms";
import { CalculatorCTA } from "@/components/sections/revenue-leak/CalculatorCTA";
import { RequirementsSection } from "@/components/sections/revenue-leak/RequirementsSection";
import { TestimonialsSection } from "@/components/sections/revenue-leak/TestimonialsSection";
import { HomepageFAQ } from "@/components/sections/revenue-leak/HomepageFAQ";
import {
  homepageFaqs,
  homepageFaqSchema,
} from "@/components/sections/revenue-leak/homepageFaqData";
import { FinalCTA } from "@/components/sections/revenue-leak/FinalCTA";
import { LegalSection } from "@/components/sections/revenue-leak/LegalSection";
import { FooterSection } from "@/components/sections/revenue-leak/FooterSection";
import { RollbackIcon } from "@/app/truckicons/RollbackIcon";
import { WreckerIcon } from "@/app/truckicons/WreckerIcon";
import { HeavyWreckerIcon } from "@/app/truckicons/HeavyWreckerIcon";
import { RotatorIcon } from "@/app/truckicons/RotatorIcon";

export const metadata: Metadata = {
  title: "Tow Truck Financing | Fast Pre-Approval, Flexible Terms — TowCap",
  description:
    "Get pre-approved for tow truck financing in 30 seconds. Rollbacks, wreckers, rotators — new or used, any seller. $0 down available. 340+ operators funded.",
};

/* ------------------------------------------------------------------ */
/*  Icon map — injected at the page level to keep heroes icon-agnostic */
/* ------------------------------------------------------------------ */

const TILE_ICONS: Record<string, React.ReactNode> = {
  rollback: <RollbackIcon className="w-20" />,
  wrecker: <WreckerIcon className="w-20" />,
  "heavy-wrecker": <HeavyWreckerIcon className="w-20" />,
  rotator: <RotatorIcon className="w-20" />,
};

const heroConvertConfig = {
  ...HERO_CONVERT_CONFIG,
  tiles: HERO_CONVERT_CONFIG.tiles.map((tile) => ({
    ...tile,
    icon: TILE_ICONS[tile.id],
  })),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* FAQPage structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageFaqSchema),
        }}
      />
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#DE3341] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      {/* §0 — StickyNav */}
      <StickyNav />

      <main>
        {/* §1 — HeroConvert (Above the Fold) */}
        <HeroConvert config={heroConvertConfig} />

        {/* §2 — QuickNavCards (Intent Router) */}
        <QuickNavCards />

        {/* §3 — FinancingCards (What We Do) */}
        <FinancingCards />

        {/* §4 — GuideBuilder (Interactive Qualifier) */}
        <GuideBuilder />

        {/* §5 — HowItWorksSection (Process Steps) */}
        <HowItWorksSection />

        {/* §6 — FeaturedPrograms (Objection Handling) */}
        <FeaturedPrograms />

        {/* §7 — CalculatorCTA (ROI Proof) */}
        <CalculatorCTA />

        {/* §8 — RequirementsSection (Qualification) */}
        <RequirementsSection />

        {/* §9 — TestimonialsSection (Social Proof) */}
        <TestimonialsSection />

        {/* §10 — FAQSection (SEO + Objection Cleanup) */}
        <HomepageFAQ faqs={homepageFaqs} />

        {/* §11 — FinalCTA (Value Recap + Conversion) */}
        <FinalCTA />

        {/* §12 — PreApprovalForm (3-Step Progressive Disclosure) — TODO: Phase 3 */}
      </main>

      {/* §13 — Legal + Footer */}
      <LegalSection />
      <FooterSection />
    </div>
  );
}
