import Image from "next/image";
import Link from "next/link";
import type { HeroConvertConfig } from "@/components/sections/heroes/hero-convert-geico";
import { RollbackFinancingPreviewHeroSelector } from "./RollbackFinancingPreviewHeroSelector";

export function RollbackFinancingPreviewHero({
  config,
}: {
  config: HeroConvertConfig;
}) {
  return (
    <section
      id="hero"
      className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FCF8_100%)] pt-[var(--nav-height)] 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:py-16">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1A7F4B]">
              Rollback Hero Preview
            </p>
            <h1
              className="text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#111111] sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem]"
              style={{ textWrap: "balance" }}
            >
              {config.headline}
            </h1>
          </div>

          <p className="max-w-2xl text-base leading-6 text-[#545454] sm:text-[1.0625rem] sm:leading-7">
            {config.bodyCopy}
          </p>

          <RollbackFinancingPreviewHeroSelector
            tiles={config.tiles}
            cta={config.cta}
            selectionPrompt={config.selectionPrompt}
            selectionRequiredMessage={config.selectionRequiredMessage}
          />

          <p className="text-sm leading-5 text-[#545454]">{config.microcopy}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
            {config.tertiaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={false}
                className="rounded-sm text-sm text-[#111111] underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs leading-5 text-[#7A7A7A]">{config.disclaimer}</p>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-[2rem] border border-[#D8E4DC] bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F8F3_100%)] p-3 shadow-[0_28px_70px_-40px_rgba(16,24,32,0.45)]">
            <Image
              src={config.heroImage}
              alt={config.heroImageAlt}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 50vw, 0px"
              className="rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
