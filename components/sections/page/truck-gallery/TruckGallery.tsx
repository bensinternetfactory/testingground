import Image from "next/image";
import type { TruckGalleryConfig } from "./config";

export function TruckGallery({ config }: { config: TruckGalleryConfig }) {
  return (
    <section id="truck-gallery" aria-label="Tow truck photo gallery" className="md:hidden">
      <div className="grid aspect-[5/3] grid-cols-[50fr_25fr_25fr] grid-rows-2">
        <div className="relative row-span-2">
          <Image
            src={config.hero.src}
            alt={config.hero.alt}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        {config.grid.map((img) => (
          <div key={img.src} className="relative">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
