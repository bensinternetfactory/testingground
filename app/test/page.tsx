import type { Metadata } from "next";
import { PromoStrip } from "./_components/promo-strip/PromoStrip";
import { Header } from "./_components/header/Header";
import { PromoCarousel } from "./_components/promo-carousel/PromoCarousel";
import { QuickActions } from "./_components/quick-actions/QuickActions";
import { EquipmentChooser } from "./_components/equipment-chooser/EquipmentChooser";
import { FeaturedBanner } from "./_components/featured-banner/FeaturedBanner";
import { ProgramsRow } from "./_components/programs-row/ProgramsRow";
import { Spotlight } from "./_components/spotlight/Spotlight";
import { WhyTowLoans } from "./_components/why-towloans/WhyTowLoans";
import { ProgramCards } from "./_components/program-cards/ProgramCards";
import { Proof } from "./_components/proof/Proof";
import { HowItWorks } from "./_components/how-it-works/HowItWorks";
import { Footer } from "./_components/footer/Footer";
import { CAROUSEL_SLIDES } from "./_lib/content";

export const metadata: Metadata = {
  title: "TowLoans — Tow Truck Financing (Test)",
  description:
    "Chewy-parallel test homepage for TowLoans. Get pre-qualified for tow truck financing in 30 seconds.",
  robots: { index: false, follow: false },
};

export default function TestHomepage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-[var(--t-blue)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <PromoStrip />
      <Header />

      <main id="main">
        <PromoCarousel slides={CAROUSEL_SLIDES} intervalMs={7000} />
        <QuickActions />
        <EquipmentChooser />
        <FeaturedBanner />
        <ProgramsRow />
        <Spotlight />
        <WhyTowLoans />
        <ProgramCards />
        <Proof />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}
