import Image from "next/image";
import { CtaLink, LeadCta } from "@/features/cta/client";
import type { PreApprovalEntry } from "@/features/cta/lead-entry";
import type { SidebarCtaConfig } from "./page-config-types";

export function SidebarCta({ config }: { config: SidebarCtaConfig }) {
  const entry: PreApprovalEntry | null = config.preApprovalTrigger
    ? {
        kind: "pre-approval",
        href: config.ctaHref,
        trigger: config.preApprovalTrigger,
      }
    : null;

  return (
    <div className="rounded-3xl bg-[#101820] p-6 text-white shadow-[0_18px_36px_rgba(16,24,32,0.18)] ring-1 ring-white/10">
      <Image
        src="/brand-assets/benefit-icons/fast/fast-funding-light.svg"
        alt=""
        width={36}
        height={36}
        className="mb-4 h-9 w-auto"
      />
      <h3 className="text-lg font-semibold tracking-tight text-white">
        {config.headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/72">
        {config.subhead}
      </p>
      <div className="mt-6">
        {entry ? (
          <LeadCta
            copy={{ label: config.ctaLabel }}
            entry={entry}
            appearance={{
              size: "sm",
              className:
                "!w-full !bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]",
            }}
            analytics={{ legacySection: "sidebar-cta" }}
          />
        ) : (
          <CtaLink
            href={config.ctaHref}
            copy={{ label: config.ctaLabel }}
            appearance={{
              size: "sm",
              className:
                "!w-full !bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]",
            }}
            analytics={{ legacySection: "sidebar-cta" }}
          />
        )}
      </div>
    </div>
  );
}
