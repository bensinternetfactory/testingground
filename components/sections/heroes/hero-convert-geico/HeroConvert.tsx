import Image from "next/image";
import Link from "next/link";
import { buildDrawerTriggerDataAttributes } from "@/components/ui/pre-approval-drawer";
import { TileSelector } from "./TileSelector";
import type { HeroConvertConfig } from "./config";

export function HeroConvert({ config }: { config: HeroConvertConfig }) {
  return (
    <section
      id="hero"
      className="bg-white pt-[var(--nav-height)] 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        {/* Left column — content + interactive tiles */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <h1
            className="text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#111111] sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            {config.headline}
          </h1>

          <p className="max-w-2xl text-base leading-6 text-[#545454] sm:text-[1.0625rem] sm:leading-7">
            {config.bodyCopy}
          </p>

          {/* Only interactive part crosses the RSC boundary */}
          <TileSelector
            tiles={config.tiles}
            cta={config.cta}
            selectionPrompt={config.selectionPrompt}
            selectionRequiredMessage={config.selectionRequiredMessage}
            viewAllLink={config.viewAllLink}
          />

          <p className="text-sm leading-5 text-[#545454]">{config.microcopy}</p>

          {/* Tertiary links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
            {config.tertiaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={false}
                {...buildDrawerTriggerDataAttributes(link.drawer)}
                className="rounded-sm text-sm text-[#111111] underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal disclaimer */}
          <p className="text-xs leading-5 text-[#999]">{config.disclaimer}</p>
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
