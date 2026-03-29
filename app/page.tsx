import type { Metadata } from "next";
import { HeroGallery } from "@/components/sections/heroes/hero-gallery/HeroGallery";
import { HERO_GALLERY_CONFIG } from "@/components/sections/heroes/hero-gallery/config";
import { StickyNav } from "@/components/sections/nav/sticky-nav-rm/StickyNav";
import { BrandMarquee } from "@/components/sections/page/brand-marquee/BrandMarquee";
import { ClosingCta } from "@/components/sections/page/closing-cta/ClosingCta";
import { CLOSING_CTA_CONFIG } from "@/components/sections/page/closing-cta/config";
import { EquipmentCards } from "@/components/sections/page/equipment-cards/EquipmentCards";
import { EQUIPMENT_CARDS_CONFIG } from "@/components/sections/page/equipment-cards/config";
import {
  FaqSection,
  HOMEPAGE_FAQ_SECTION_CONFIG,
  buildFaqSchema,
} from "@/components/sections/page/faq";
import { Footer } from "@/components/sections/page/footer/Footer";
import { FOOTER_CONFIG } from "@/components/sections/page/footer/config";
import { HowItWorks } from "@/components/sections/page/how-it-works/HowItWorks";
import { HOW_IT_WORKS_CONFIG } from "@/components/sections/page/how-it-works/config";
import { MiniROI } from "@/components/sections/page/mini-roi/MiniROI";
import { MINI_ROI_CONFIG } from "@/components/sections/page/mini-roi/config";
import { ProgramCards } from "@/components/sections/page/program-cards/ProgramCards";
import { PROGRAM_CARDS_CONFIG } from "@/components/sections/page/program-cards/config";
import { ResourceHub } from "@/components/sections/page/resource-hub/ResourceHub";
import { RESOURCE_HUB_CONFIG } from "@/components/sections/page/resource-hub/config";
import { TestimonialMarquee } from "@/components/sections/page/testimonial-marquee/TestimonialMarquee";
import {
  TRUCK_GALLERY_CONFIG,
  TRUCK_GALLERY_CONFIG_ALT,
} from "@/components/sections/page/truck-gallery/config";
import {
  TruckGalleryHeroLeft,
  TruckGalleryHeroRight,
} from "@/components/sections/page/truck-gallery/TruckGallery";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Tow Truck Financing | Pre-Approved in 30 Seconds | TowLoans",
  description:
    "Get pre-approved for tow truck financing in 30 seconds. No credit check. New & used. Rollbacks, wreckers, rotators. $0 down available. (888) 555-0199",
};

const faqSchema = buildFaqSchema(HOMEPAGE_FAQ_SECTION_CONFIG.faqs);

export default function Homepage01() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={faqSchema} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <StickyNav />

      <main id="main-content">
        <HeroGallery config={HERO_GALLERY_CONFIG} />
        <EquipmentCards config={EQUIPMENT_CARDS_CONFIG} />

        <TruckGalleryHeroLeft
          config={TRUCK_GALLERY_CONFIG}
          sectionId="truck-gallery-top"
        />

        <ProgramCards config={PROGRAM_CARDS_CONFIG} />
        <BrandMarquee />
        <HowItWorks config={HOW_IT_WORKS_CONFIG} />
        <TestimonialMarquee />
        <MiniROI config={MINI_ROI_CONFIG} />

        <TruckGalleryHeroRight
          config={TRUCK_GALLERY_CONFIG_ALT}
          sectionId="truck-gallery-after-miniroi"
        />

        <ResourceHub config={RESOURCE_HUB_CONFIG} />
        <FaqSection config={HOMEPAGE_FAQ_SECTION_CONFIG} />
        <ClosingCta config={CLOSING_CTA_CONFIG} />
      </main>

      <Footer config={FOOTER_CONFIG} />
    </div>
  );
}
