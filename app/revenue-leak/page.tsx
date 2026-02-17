import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm";
import { HeroConvert, HERO_CONVERT_CONFIG } from "@/components/sections/heroes/hero-convert-geico";
import { HeroShowcase, NavTile, HERO_CONFIG } from "@/components/sections/heroes/hero-showcase-rm";
import { FinancingCards } from "@/components/sections/revenue-leak/FinancingCards";
import { GuideBuilder } from "@/components/sections/revenue-leak/GuideBuilder";
import { FeaturedPrograms } from "@/components/sections/revenue-leak/FeaturedPrograms";
import { CalculatorCTA } from "@/components/sections/revenue-leak/CalculatorCTA";
import { TestimonialsSection } from "@/components/sections/revenue-leak/TestimonialsSection";
import { FinalCTA } from "@/components/sections/revenue-leak/FinalCTA";
import { LegalSection } from "@/components/sections/revenue-leak/LegalSection";
import { FooterSection } from "@/components/sections/revenue-leak/FooterSection";
import { RollbackIcon } from "@/app/truckicons/RollbackIcon";
import { WreckerIcon } from "@/app/truckicons/WreckerIcon";
import { HeavyWreckerIcon } from "@/app/truckicons/HeavyWreckerIcon";
import { RotatorIcon } from "@/app/truckicons/RotatorIcon";

const DevVariantPanel =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/dev/DevVariantPanel"))
    : () => null;

export const metadata: Metadata = {
  title: "Tow Truck Financing | Stop Turning Down Calls | TowCap",
  description:
    "Every call you can\u2019t cover is cash driving to your competitor. Get pre-approved for tow truck financing in 30 seconds. No hard credit pull. No obligation.",
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

type Props = {
  searchParams: Promise<{ hero?: string }>;
};

export default async function RevenueLeakPage({ searchParams }: Props) {
  let currentHero: "quote-start" | "carousel" = "quote-start";

  if (process.env.NODE_ENV === "development") {
    const { hero: heroParam } = await searchParams;
    if (heroParam === "carousel") {
      currentHero = "carousel";
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#DE3341] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <StickyNav />
      <main>
        {currentHero === "quote-start" ? (
          <HeroConvert config={heroConvertConfig} />
        ) : (
          <HeroShowcase
            images={HERO_CONFIG.images}
            headline={HERO_CONFIG.headline}
            phrases={HERO_CONFIG.phrases}
            cta={HERO_CONFIG.cta}
            footer={
              <>
                {HERO_CONFIG.tiles.map((tile) => (
                  <NavTile key={tile.label} label={tile.label} href={tile.href} />
                ))}
              </>
            }
          />
        )}
        <FinancingCards />
        <GuideBuilder />
        <FeaturedPrograms />
        <CalculatorCTA />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <LegalSection />
      <FooterSection />
      <DevVariantPanel currentHero={currentHero} />
    </div>
  );
}
