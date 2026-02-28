import Image from "next/image";
import { TrustBadge } from "./TrustBadge";
import type { HeroLeadGenConfig } from "./config";

export function HeroLeadGen({ config }: { config: HeroLeadGenConfig }) {
  return (
    <section id="hero" className="bg-white pt-[var(--nav-height)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-5 lg:py-20">
        {/* Left column (60%) */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <h1
            className="text-[2.5rem] font-bold leading-[1.1] text-[#101820] md:text-5xl lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            {config.headline}
          </h1>

          <p className="text-lg text-[#545454]">{config.subheadline}</p>

          {/* Primary CTA */}
          <a
            href={config.cta.href}
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#101820] text-lg font-medium text-white transition-colors duration-200 hover:bg-[#101820]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2 sm:w-auto sm:self-start sm:px-10"
          >
            {config.cta.label}
          </a>

          {config.phone && (
            <p className="text-sm text-[#545454]">
              Or call us:{" "}
              <a
                href={config.phone.href}
                className="font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E]"
              >
                {config.phone.display}
              </a>
            </p>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#E9E9E9] pt-6">
            {config.trustBadges.map((badge) => (
              <TrustBadge key={badge.label} {...badge} />
            ))}
          </div>
        </div>

        {/* Right column (40%) — hero image */}
        <div className="relative hidden overflow-hidden rounded-3xl bg-[#F5F5F5] lg:col-span-2 lg:flex">
          <Image
            src={config.heroImage}
            alt={config.heroImageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
