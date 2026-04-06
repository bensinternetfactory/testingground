import Link from "next/link";
import Image from "next/image";
import { buildPreApprovalTriggerAttributes } from "@/features/pre-approval/drawer/server";
import type { EquipmentClosingCtaConfig } from "./config";

export function EquipmentClosingCtaTrucks({
  config,
}: {
  config: EquipmentClosingCtaConfig;
}) {
  const tiles = config.tiles ?? [];

  return (
    <section className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        {config.iconSrc ? (
          <Image
            src={config.iconSrc}
            alt={config.iconAlt ?? ""}
            width={48}
            height={48}
            className="mb-5 h-12 w-12"
          />
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#22C55E] sm:text-sm">
          {config.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {config.headline}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
          {config.body}
        </p>

        {tiles.length > 0 ? (
          <ul className="mt-10 grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {tiles.map((tile) => (
              <li key={tile.label}>
                <Link
                  href={tile.href}
                  {...(tile.preApprovalTrigger
                    ? buildPreApprovalTriggerAttributes(tile.preApprovalTrigger)
                    : {})}
                  aria-label={`Get pre-approved for a ${tile.label.toLowerCase()}`}
                  className="group flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-white/15 bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22C55E] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820] md:p-6"
                >
                  <Image
                    src={tile.iconSrc}
                    alt={tile.iconAlt ?? ""}
                    width={151}
                    height={43}
                    className="h-10 w-auto transition-transform duration-200 group-hover:scale-105 md:h-12"
                  />
                  <span className="text-sm font-medium text-white md:text-base">
                    {tile.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
