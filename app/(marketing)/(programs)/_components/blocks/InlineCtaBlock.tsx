import Image from "next/image";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { InlineCtaSection } from "../page-config-types";

export function InlineCtaBlock({ section }: { section: InlineCtaSection }) {
  const { config } = section;

  return (
    <div className="-mx-6 my-14 bg-[#101820] px-6 py-8 text-white md:py-10 lg:mx-0 lg:rounded-2xl lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-center gap-5">
          {config.iconSrc ? (
            <Image
              src={config.iconSrc}
              alt={config.iconAlt ?? ""}
              width={40}
              height={40}
              className="h-10 w-auto flex-none"
            />
          ) : null}
          <div className="flex flex-col gap-2">
            {config.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22C55E]">
                {config.eyebrow}
              </p>
            ) : null}
            <p className="text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
              {config.message}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <RippleCtaLink
            href={config.ctaHref}
            label={config.ctaLabel}
            preApprovalTrigger={config.preApprovalTrigger}
            size="md"
            section="inline-cta-band"
            className="!bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]"
          />
        </div>
      </div>
    </div>
  );
}
