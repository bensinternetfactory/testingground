import type { Metadata } from "next";
import { RollbackFinancingPageShell } from "@/app/rollback-financing/_shared/RollbackFinancingPageShell";
import { rollbackPreviewHeroConfig } from "@/app/rollback-financing/_shared/rollback-page-data";
import { RollbackFinancingPreviewHero } from "./_components/RollbackFinancingPreviewHero";

export const metadata: Metadata = {
  title: "Rollback Financing Preview — Framed Selector Deck | TowLoans",
  description:
    "Preview route for the framed selector deck rollback financing hero concept.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Rollback Financing Preview — Framed Selector Deck | TowLoans",
    description:
      "Preview route for the framed selector deck rollback financing hero concept.",
    type: "website",
  },
};

export default function RollbackFinancingPreviewPage() {
  return (
    <RollbackFinancingPageShell
      hero={<RollbackFinancingPreviewHero config={rollbackPreviewHeroConfig} />}
      includeJsonLd={false}
    />
  );
}
