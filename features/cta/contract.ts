export type CtaPlacement =
  | "hero"
  | "section"
  | "sticky-nav"
  | "footer"
  | "inline"
  | "card";

export interface CtaOrigin {
  pageId: string;
  sectionId: string;
  ctaId: string;
  placement: CtaPlacement;
}

export interface CtaCopy {
  label: string;
  ariaLabel?: string;
}

export type CtaTone = "primary" | "secondary" | "inverse";
export type CtaSize = "sm" | "md" | "lg";
export type CtaAlignment = "center" | "between";

export interface CtaAppearance {
  tone?: CtaTone;
  size?: CtaSize;
  align?: CtaAlignment;
  fullWidth?: boolean;
  className?: string;
}

export type CtaModality = "touch" | "mouse" | "keyboard";

export type CtaIntent = "navigate" | "lead-entry" | "action";

export type CtaCancelReason =
  | "pointer-cancel"
  | "scroll-cancel"
  | "drift-cancel"
  | "blur-cancel"
  | "disabled";

export interface CtaInteractionConfig {
  pressRetentionPx?: number;
  cancelOnScroll?: boolean;
  reducedMotion?: "system" | "always" | "never";
  haptics?: "auto" | "off";
}

export type CtaNavigation =
  | {
      kind: "internal";
      href: string;
      prefetch?: boolean;
      replace?: boolean;
      scroll?: boolean;
    }
  | {
      kind: "external";
      href: string;
      target?: "_blank" | "_self";
      rel?: string;
    };

export interface CtaAnalyticsContext {
  legacySection?: string;
  legacyCardId?: string;
  isPlaceholder?: boolean;
}
