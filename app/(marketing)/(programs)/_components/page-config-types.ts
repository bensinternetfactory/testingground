import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { HeroLeadGenConfig } from "@/components/sections/heroes/hero-lead-gen/config";
import type { EquipmentClosingCtaConfig } from "@/components/sections/page/equipment-closing-cta/config";
import type { FaqSectionConfig } from "@/components/sections/page/faq";

export interface TocItem {
  id: string;
  label: string;
}

export interface SidebarCtaConfig {
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface InlineCtaBandConfig {
  eyebrow?: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
  iconSrc?: string;
  iconAlt?: string;
}

export interface BottomLinkItem {
  label: string;
  href: string;
}

export interface BottomLinkGroup {
  label: string;
  links: BottomLinkItem[];
}

export interface BottomLinkGroupsConfig {
  groups: BottomLinkGroup[];
}

export type ParagraphContent = ReactNode | ReactNode[];

export interface ProgramSectionBase {
  kind: string;
  id?: string;
  tocLabel?: string;
}

export interface IntroSection extends ProgramSectionBase {
  kind: "intro";
  paragraphs: ParagraphContent[];
}

export interface ContentSectionListItem {
  label: string;
  body: string;
}

export interface ContentSection extends ProgramSectionBase {
  kind: "contentSection";
  heading?: string;
  eyebrow?: string;
  paragraphs: ParagraphContent[];
  list?: ContentSectionListItem[];
  closingParagraphs?: ParagraphContent[];
}

export interface PullQuoteSection extends ProgramSectionBase {
  kind: "pullQuote";
  content: ParagraphContent;
}

export interface InlineCtaSection extends ProgramSectionBase {
  kind: "inlineCta";
  config: InlineCtaBandConfig;
}

export interface QualificationPathItem {
  label: string;
  body: string;
}

export interface QualificationPath {
  label: string;
  title: string;
  items: QualificationPathItem[];
  explanation?: ParagraphContent;
}

export interface QualificationPathsSection extends ProgramSectionBase {
  kind: "qualificationPaths";
  heading: string;
  paragraphs: ParagraphContent[];
  paths: QualificationPath[];
  closingNote?: ParagraphContent;
}

export interface FeatureGridItem {
  title: string;
  body: string;
}

export interface FeatureGridSection extends ProgramSectionBase {
  kind: "featureGrid";
  heading: string;
  introParagraphs?: ParagraphContent[];
  items: FeatureGridItem[];
  closingParagraphs?: ParagraphContent[];
}

export interface ComparisonTableRow {
  label: string;
  withDown: string;
  zeroDown: string;
}

export interface ComparisonTableSection extends ProgramSectionBase {
  kind: "comparisonTable";
  heading: string;
  introParagraphs: ParagraphContent[];
  example: string;
  withDownLabel: string;
  zeroDownLabel: string;
  mobileWithDownLabel: string;
  mobileZeroDownLabel: string;
  rows: ComparisonTableRow[];
  closingParagraphs: ParagraphContent[];
}

export interface PromoPanelBullet {
  title: string;
  body: string;
}

export interface PromoPanelSection extends ProgramSectionBase {
  kind: "promoPanel";
  heading: string;
  paragraphs: ParagraphContent[];
  bullets?: PromoPanelBullet[];
  closingParagraphs?: ParagraphContent[];
  cta: {
    href: string;
    label: string;
  };
}

export interface RelatedProgramCard {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  iconSrc: string;
}

export interface RelatedProgramsSection extends ProgramSectionBase {
  kind: "relatedPrograms";
  heading: string;
  paragraphs: ParagraphContent[];
  programs: RelatedProgramCard[];
}

export interface DividerSection extends ProgramSectionBase {
  kind: "divider";
}

export type ProgramSection =
  | IntroSection
  | ContentSection
  | PullQuoteSection
  | InlineCtaSection
  | QualificationPathsSection
  | FeatureGridSection
  | ComparisonTableSection
  | PromoPanelSection
  | RelatedProgramsSection
  | DividerSection;

export interface ProgramSchemas {
  faq: Record<string, unknown>;
  service: Record<string, unknown>;
  breadcrumb: Record<string, unknown>;
}

export interface ProgramPageConfig {
  slug: string;
  metadata: Metadata;
  hero: HeroLeadGenConfig;
  sidebarCta: SidebarCtaConfig;
  sections: ProgramSection[];
  faqSection?: FaqSectionConfig;
  closingCta: EquipmentClosingCtaConfig;
  bottomLinks: BottomLinkGroupsConfig;
  schemas: ProgramSchemas;
}
