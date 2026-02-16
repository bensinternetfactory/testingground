import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { StickyNav } from "@/components/sections/revenue-leak/StickyNav";
import { HeroQuoteStart } from "@/components/sections/revenue-leak/HeroQuoteStart";
import { HERO_QUOTE_START_CONFIG } from "@/components/sections/revenue-leak/hero-quote-start-config";
import { FinancingCards } from "@/components/sections/revenue-leak/FinancingCards";
import { GuideBuilder } from "@/components/sections/revenue-leak/GuideBuilder";
import { FeaturedPrograms } from "@/components/sections/revenue-leak/FeaturedPrograms";
import { CalculatorCTA } from "@/components/sections/revenue-leak/CalculatorCTA";
import { TestimonialsSection } from "@/components/sections/revenue-leak/TestimonialsSection";
import { FinalCTA } from "@/components/sections/revenue-leak/FinalCTA";
import { LegalSection } from "@/components/sections/revenue-leak/LegalSection";
import { FooterSection } from "@/components/sections/revenue-leak/FooterSection";
import { heroVariantsByAngle } from "@/components/sections/revenue-leak/hero-variants";
import { resolveHeroConfig } from "@/lib/resolve-hero-config";
import { HeroSection } from "@/components/sections/revenue-leak/HeroSection";
import { HERO_CONFIG } from "@/components/sections/revenue-leak/hero-config";
import { HeroTile } from "@/components/sections/revenue-leak/HeroTile";

const DevVariantPanel =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/dev/DevVariantPanel"))
    : () => null;

export const metadata: Metadata = {
  title: "Tow Truck Financing | Stop Turning Down Calls | TowCap",
  description:
    "Every call you can\u2019t cover is cash driving to your competitor. Get pre-approved for tow truck financing in 30 seconds. No hard credit pull. No obligation.",
};

type Props = {
  searchParams: Promise<{ angle?: string; variant?: string; hero?: string }>;
};

export default async function RevenueLeakPage({ searchParams }: Props) {
  let heroConfig = HERO_QUOTE_START_CONFIG;
  let angle: number | undefined;
  let variant: number | undefined;
  let currentHero: "quote-start" | "carousel" = "quote-start";

  if (process.env.NODE_ENV === "development") {
    const { angle: rawAngle, variant: rawVariant, hero: heroParam } = await searchParams;

    if (heroParam === "carousel") {
      currentHero = "carousel";
    } else {
      const parsedAngle = rawAngle ? Number(rawAngle) : undefined;
      const parsedVariant = rawVariant ? Number(rawVariant) : undefined;

      if (parsedAngle !== undefined && parsedVariant !== undefined) {
        const angleVariants =
          heroVariantsByAngle[
            parsedAngle as keyof typeof heroVariantsByAngle
          ];
        const override = angleVariants?.[parsedVariant];

        if (override) {
          heroConfig = resolveHeroConfig(HERO_QUOTE_START_CONFIG, override);
          angle = parsedAngle;
          variant = parsedVariant;
        }
      }
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
        {currentHero === "carousel" ? (
          <HeroSection
            images={HERO_CONFIG.images}
            headline={HERO_CONFIG.headline}
            phrases={HERO_CONFIG.phrases}
            cta={HERO_CONFIG.cta}
            footer={
              <>
                {HERO_CONFIG.tiles.map((tile) => (
                  <HeroTile key={tile.label} label={tile.label} href={tile.href} />
                ))}
              </>
            }
          />
        ) : (
          <HeroQuoteStart config={heroConfig} />
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
      <DevVariantPanel
        variantsByAngle={heroVariantsByAngle}
        defaultHeadline={HERO_QUOTE_START_CONFIG.headline}
        currentAngle={angle}
        currentVariant={variant}
        currentHero={currentHero}
      />
    </div>
  );
}
