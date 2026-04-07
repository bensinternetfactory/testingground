import Image from "next/image";
import { CtaLink, LeadCta } from "@/features/cta/client";
import type { PreApprovalEntry } from "@/features/cta/lead-entry";
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
            {tiles.map((tile) => {
              const tileEntry: PreApprovalEntry | null = tile.preApprovalTrigger
                ? {
                    kind: "pre-approval",
                    href: tile.href,
                    trigger: tile.preApprovalTrigger,
                  }
                : null;

              const tileContent = (
                <>
                  <Image
                    src={tile.iconSrc}
                    alt={tile.iconAlt ?? ""}
                    width={151}
                    height={43}
                    className="h-10 w-auto transition-transform duration-200 group-hover/cta:scale-105 md:h-12"
                  />
                  <span className="text-sm font-medium text-white md:text-base">
                    {tile.label}
                  </span>
                </>
              );

              const tileClassName =
                "!flex !h-full !w-full !flex-col !items-center !justify-center !gap-3 !rounded-2xl focus-visible:!rounded-2xl !border-2 !border-white/15 !bg-white/5 !p-4 hover:!-translate-y-0.5 hover:!border-[#22C55E] hover:!bg-white/10 focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820] md:!p-6";

              return (
                <li key={tile.label}>
                  {tileEntry ? (
                    <LeadCta
                      copy={{
                        label: tile.label,
                        ariaLabel: `Get pre-approved for a ${tile.label.toLowerCase()}`,
                      }}
                      entry={tileEntry}
                      appearance={{
                        tone: "inverse",
                        size: "sm",
                        fullWidth: true,
                        className: tileClassName,
                      }}
                    >
                      {tileContent}
                    </LeadCta>
                  ) : (
                    <CtaLink
                      href={tile.href}
                      copy={{
                        label: tile.label,
                        ariaLabel: `Get pre-approved for a ${tile.label.toLowerCase()}`,
                      }}
                      appearance={{
                        tone: "inverse",
                        size: "sm",
                        fullWidth: true,
                        className: tileClassName,
                      }}
                    >
                      {tileContent}
                    </CtaLink>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
