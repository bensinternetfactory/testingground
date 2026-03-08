import Image from "next/image";
import type { TruckGalleryConfig } from "./config";
import { normalizeGridImages } from "./utils";

interface TruckGalleryProps {
  config: TruckGalleryConfig;
  layoutVariant?: "hero-left" | "hero-right";
  sectionId?: string;
  decorative?: boolean;
  ariaLabel?: string;
  heroLoading?: "lazy" | "eager";
}

interface TruckGalleryVariantProps {
  config: TruckGalleryConfig;
  sectionId?: string;
  decorative?: boolean;
  ariaLabel?: string;
  heroLoading?: "lazy" | "eager";
}

const HERO_LEFT_TILE_CLASSES = [
  "col-start-2 row-start-1",
  "col-start-3 row-start-1",
  "col-start-2 row-start-2",
  "col-start-3 row-start-2",
] as const;

const HERO_RIGHT_TILE_CLASSES = [
  "col-start-1 row-start-1",
  "col-start-2 row-start-1",
  "col-start-1 row-start-2",
  "col-start-2 row-start-2",
] as const;

export function TruckGallery({
  config,
  layoutVariant = "hero-left",
  sectionId,
  decorative = false,
  ariaLabel,
  heroLoading = "lazy",
}: TruckGalleryProps) {
  const isHeroRight = layoutVariant === "hero-right";
  const gridColsClass = isHeroRight
    ? "grid-cols-[25fr_25fr_50fr]"
    : "grid-cols-[50fr_25fr_25fr]";
  const heroPlacementClass = isHeroRight
    ? "col-start-3 row-start-1"
    : "col-start-1 row-start-1";
  const smallTileClasses = isHeroRight
    ? HERO_RIGHT_TILE_CLASSES
    : HERO_LEFT_TILE_CLASSES;
  const gridImages = normalizeGridImages(config.grid);

  return (
    <section
      id={sectionId}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      className="md:hidden"
    >
      <div className={`grid aspect-[5/3] ${gridColsClass} grid-rows-2`}>
        <div className={`relative row-span-2 ${heroPlacementClass}`}>
          <Image
            src={config.hero.src}
            alt={decorative ? "" : config.hero.alt}
            fill
            sizes="50vw"
            loading={heroLoading}
            className="object-cover"
          />
        </div>
        {gridImages.map((img, index) => (
          <div
            key={`${img.src}-${index}`}
            className={`relative ${smallTileClasses[index]}`}
          >
            <Image
              src={img.src}
              alt={decorative ? "" : img.alt}
              fill
              sizes="25vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function TruckGalleryHeroLeft({
  config,
  sectionId = "truck-gallery-hero-left",
  decorative = true,
  ariaLabel,
  heroLoading = "lazy",
}: TruckGalleryVariantProps) {
  return (
    <TruckGallery
      config={config}
      layoutVariant="hero-left"
      sectionId={sectionId}
      decorative={decorative}
      ariaLabel={ariaLabel}
      heroLoading={heroLoading}
    />
  );
}

export function TruckGalleryHeroRight({
  config,
  sectionId = "truck-gallery-hero-right",
  decorative = true,
  ariaLabel,
  heroLoading = "lazy",
}: TruckGalleryVariantProps) {
  return (
    <TruckGallery
      config={config}
      layoutVariant="hero-right"
      sectionId={sectionId}
      decorative={decorative}
      ariaLabel={ariaLabel}
      heroLoading={heroLoading}
    />
  );
}
