import Image from "next/image";
import type { TruckGalleryConfig } from "./config";

interface TruckGalleryProps {
  config: TruckGalleryConfig;
  layoutVariant?: "hero-left" | "hero-right";
  sectionId?: string;
  ariaLabel?: string;
}

export function TruckGallery({
  config,
  layoutVariant = "hero-left",
  sectionId = "truck-gallery",
  ariaLabel = "Tow truck photo gallery",
}: TruckGalleryProps) {
  const isHeroRight = layoutVariant === "hero-right";
  const gridColsClass = isHeroRight
    ? "grid-cols-[25fr_25fr_50fr]"
    : "grid-cols-[50fr_25fr_25fr]";
  const heroPlacementClass = isHeroRight
    ? "col-start-3 row-start-1"
    : "col-start-1 row-start-1";
  const smallTileClasses = isHeroRight
    ? [
        "col-start-1 row-start-1",
        "col-start-2 row-start-1",
        "col-start-1 row-start-2",
        "col-start-2 row-start-2",
      ]
    : [
        "col-start-2 row-start-1",
        "col-start-3 row-start-1",
        "col-start-2 row-start-2",
        "col-start-3 row-start-2",
      ];

  return (
    <section id={sectionId} aria-label={ariaLabel} className="md:hidden 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
      <div className={`grid aspect-[5/3] ${gridColsClass} grid-rows-2`}>
        <div className={`relative row-span-2 ${heroPlacementClass}`}>
          <Image
            src={config.hero.src}
            alt={config.hero.alt}
            fill
            sizes="50vw"
            loading="lazy"
            className="object-cover"
          />
        </div>
        {config.grid.map((img, index) => (
          <div
            key={img.src}
            className={`relative ${smallTileClasses[index]}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
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
