import type { Metadata } from "next";
import { BrandClient } from "@/components/sections/brand/BrandClient";
import { BrandHero } from "@/components/sections/brand/BrandHero";
import { ColorSystem } from "@/components/sections/brand/ColorSystem";
import { Typography } from "@/components/sections/brand/Typography";
import { ButtonPatterns } from "@/components/sections/brand/ButtonPatterns";
import { BenefitIconLibrary } from "@/components/sections/brand/BenefitIconLibrary";
import { TruckIconLibrary } from "@/components/sections/brand/TruckIconLibrary";
import { SpacingLayout } from "@/components/sections/brand/SpacingLayout";
import { UsageRules } from "@/components/sections/brand/UsageRules";

export const metadata: Metadata = {
  title: "Brand Style Guide — TowLoans",
  description: "TowLoans visual identity system: colors, typography, icons, and component patterns.",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      <BrandClient>
        <BrandHero />
        <ColorSystem />
        <Typography />
        <ButtonPatterns />
        <BenefitIconLibrary />
        <TruckIconLibrary />
        <SpacingLayout />
        <UsageRules />
      </BrandClient>
    </main>
  );
}
