import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { EquipmentClosingCtaConfig } from "./config";

export function EquipmentClosingCta({
  config,
}: {
  config: EquipmentClosingCtaConfig;
}) {
  return (
    <section className="bg-[#101820] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#22C55E]">
          {config.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {config.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
          {config.body}
        </p>

        <div className="mt-12">
          <RippleCtaLink
            href={config.cta.href}
            label={config.cta.label}
            size="lg"
            section="closing-cta"
            className="!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]"
          />
        </div>

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
