import Image from "next/image";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { EquipmentClosingCtaConfig } from "./config";

interface TruckTile {
  label: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
}

const truckTiles: TruckTile[] = [
  {
    label: "Rollback",
    iconSrc: "/brand-assets/truck-icons/rollback/rollback-green.svg",
    iconWidth: 151,
    iconHeight: 43,
  },
  {
    label: "Wrecker",
    iconSrc: "/brand-assets/truck-icons/wrecker/wrecker-green.svg",
    iconWidth: 151,
    iconHeight: 43,
  },
  {
    label: "Heavy Wrecker",
    iconSrc: "/brand-assets/truck-icons/heavywrecker/heavywrecker-green.svg",
    iconWidth: 151,
    iconHeight: 43,
  },
  {
    label: "Rotator",
    iconSrc: "/brand-assets/truck-icons/rotator/rotator-green.svg",
    iconWidth: 151,
    iconHeight: 43,
  },
];

export function EquipmentClosingCtaTrucks({
  config,
}: {
  config: EquipmentClosingCtaConfig;
}) {
  return (
    <section className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
              {config.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {config.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 lg:mx-0">
              {config.body}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 lg:items-start">
              <RippleCtaLink
                href={config.cta.href}
                label={config.cta.label}
                size="lg"
                section="closing-cta"
                className="!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]"
              />
              {config.contactBlock ? (
                <p className="text-sm text-white/60">
                  {config.contactBlock.prompt}{" "}
                  <a
                    href={config.contactBlock.phoneHref}
                    className="font-medium text-white underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820]"
                  >
                    {config.contactBlock.phoneLabel}
                  </a>
                  <span className="ml-2 text-white/40">
                    {config.contactBlock.supportText}
                  </span>
                </p>
              ) : null}
            </div>
          </div>

          {/* Right: truck tiles */}
          <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:w-auto">
            {truckTiles.map((tile) => (
              <a
                key={tile.label}
                href={DRAWER_HASH}
                aria-label={`Get pre-approved for a ${tile.label.toLowerCase()}`}
                className="group flex h-32 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22C55E]/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820] sm:h-36 lg:w-36"
              >
                <Image
                  src={tile.iconSrc}
                  alt=""
                  width={tile.iconWidth}
                  height={tile.iconHeight}
                  className="h-auto w-16 transition-transform duration-200 group-hover:scale-105 sm:w-20"
                />
                <span className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  {tile.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
