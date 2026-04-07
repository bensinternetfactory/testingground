import Image from "next/image";
import { CtaLink, LeadCta } from "@/features/cta/client";
import type { PreApprovalEntry } from "@/features/cta/lead-entry";
import type { EquipmentClosingCtaConfig } from "./config";

export function EquipmentClosingCta({
  config,
}: {
  config: EquipmentClosingCtaConfig;
}) {
  const primaryEntry: PreApprovalEntry | null = config.cta?.preApprovalTrigger
    ? {
        kind: "pre-approval",
        href: config.cta.href,
        trigger: config.cta.preApprovalTrigger,
      }
    : null;

  return (
    <section className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {config.iconSrc ? (
          <Image
            src={config.iconSrc}
            alt={config.iconAlt ?? ""}
            width={48}
            height={48}
            className="mx-auto mb-5 h-12 w-12"
          />
        ) : null}
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
          {config.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {config.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
          {config.body}
        </p>

        {config.cta ? (
          <div className="mt-12">
            {primaryEntry ? (
              <LeadCta
                copy={{ label: config.cta.label }}
                entry={primaryEntry}
                appearance={{
                  size: "lg",
                  className:
                    "!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]",
                }}
              />
            ) : (
              <CtaLink
                href={config.cta.href}
                copy={{ label: config.cta.label }}
                appearance={{
                  size: "lg",
                  className:
                    "!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]",
                }}
              />
            )}
          </div>
        ) : null}

        {config.contactBlock ? (
          <p className="mt-8 text-sm text-white/60">
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
    </section>
  );
}
