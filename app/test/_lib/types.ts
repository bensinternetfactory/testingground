export type NavItem = {
  label: string;
  href: string;
};

export type CarouselSlide = {
  eyebrow?: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  bg?: string;
};

export type TruckIconKind =
  | "rollback"
  | "wrecker"
  | "heavy-wrecker"
  | "rotator"
  | "dtu"
  | "trailer";

export type EquipmentChoice = {
  label: string;
  href: string;
  iconKind: TruckIconKind;
};

export type ProgramChoice = {
  label: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
};

export type Program = {
  label: string;
  href: string;
};

export type ProgramCard = {
  title: string;
  description: string;
  qualifyingNote: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type ProofItem = {
  kind: "testimonial" | "funded" | "approval";
  title: string;
  subtitle: string;
  body: string;
  attribution?: string;
  meta?: string;
};

export type FooterColumn = {
  heading: string;
  links: NavItem[];
};

export type CtaVariant = "primary" | "secondary" | "ghost";
