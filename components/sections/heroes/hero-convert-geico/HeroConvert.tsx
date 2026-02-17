import Image from "next/image";
import { TileSelector } from "./TileSelector";
import type { HeroConvertConfig } from "./config";

export function HeroConvert({ config }: { config: HeroConvertConfig }) {
  return (
    <section id="hero" className="bg-white pt-[var(--nav-height)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:py-20">
        {/* Left column — content + interactive tiles */}
        <div className="flex flex-col gap-6">
          <h1
            className="text-[2.5rem] font-medium leading-[1.1] text-[#111111] md:text-5xl lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            {config.headline}
          </h1>

          <p className="text-lg text-[#545454]">{config.bodyCopy}</p>

          {/* Only interactive part crosses the RSC boundary */}
          <TileSelector
            tiles={config.tiles}
            cta={config.cta}
            viewAllLink={config.viewAllLink}
          />

          <p className="text-sm text-[#545454]">{config.microcopy}</p>

          {/* Tertiary links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {config.tertiaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#111111] underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Legal disclaimer */}
          <p className="text-xs text-[#999]">{config.disclaimer}</p>
        </div>

        {/* Right column — hero image (desktop only) */}
        <div className="hidden lg:block">
          <Image
            src={config.heroImage}
            alt={config.heroImageAlt}
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 50vw, 0px"
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
