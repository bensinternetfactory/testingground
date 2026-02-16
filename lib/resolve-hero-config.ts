import type { HeroQuoteStartConfig } from "@/components/sections/revenue-leak/hero-quote-start-config";
import type { HeroVariantOverride } from "@/components/sections/revenue-leak/hero-variants";

/**
 * Merges a variant override onto the default hero config.
 * Structural fields (tiles, heroImage, cta.href) always come from defaults.
 */
export function resolveHeroConfig(
  defaults: HeroQuoteStartConfig,
  override: HeroVariantOverride,
): HeroQuoteStartConfig {
  return {
    ...defaults,
    headline: override.headline,
    bodyCopy: override.bodyCopy,
    cta: { ...defaults.cta, label: override.cta.label },
    ...(override.microcopy !== undefined && { microcopy: override.microcopy }),
    ...(override.disclaimer !== undefined && {
      disclaimer: override.disclaimer,
    }),
    ...(override.tertiaryLinks !== undefined && {
      tertiaryLinks: defaults.tertiaryLinks.map((link, i) => ({
        ...link,
        ...(override.tertiaryLinks?.[i] && {
          label: override.tertiaryLinks[i].label,
        }),
      })),
    }),
    ...(override.viewAllLink !== undefined && {
      viewAllLink: override.viewAllLink,
    }),
    ...(override.heroImageAlt !== undefined && {
      heroImageAlt: override.heroImageAlt,
    }),
  };
}
