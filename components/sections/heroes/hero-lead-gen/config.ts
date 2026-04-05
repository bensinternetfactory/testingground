import type { ReactNode } from "react";
import {
  DRAWER_HASH,
  type DrawerTriggerPayload,
} from "@/components/ui/pre-approval-drawer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TrustBadgeData {
  label: string;
  icon?: ReactNode;
}

export interface HeroLeadGenConfig {
  headline: string;
  subheadline: string;
  cta: { label: string; href: string; drawer?: DrawerTriggerPayload };
  phone?: { display: string; href: string };
  trustBadges: TrustBadgeData[];
  heroImage: string;
  heroImageAlt: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

export const HERO_LEAD_GEN_CONFIG: HeroLeadGenConfig = {
  headline: "Get Your Tow Truck Financed. Start Earning Tomorrow.",
  subheadline:
    "Pre-approved in 30 seconds. No credit check. New\u00a0& used. $0\u00a0down available.",
  cta: { label: "Get Pre-Approved", href: DRAWER_HASH },
  phone: { display: "(888)\u00a0555-0199", href: "tel:+18885550199" },
  trustBadges: [
    { label: "30-Second Pre-Approval" },
    { label: "No Credit Impact" },
    { label: "$0 Down Available" },
  ],
  heroImage: "/truck-1.png",
  heroImageAlt: "Tow truck ready for financing",
};
