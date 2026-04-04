import Image from "next/image";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { SidebarCtaConfig } from "../config";

export function SidebarCta({ config }: { config: SidebarCtaConfig }) {
  return (
    <div className="rounded-2xl bg-[#101820] p-6 text-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <Image
        src="/brand-assets/benefit-icons/fast/fast-funding-light.svg"
        alt=""
        width={36}
        height={36}
        className="mb-4 h-9 w-auto"
      />
      <h3 className="text-lg font-semibold tracking-tight">
        {config.headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        {config.subhead}
      </p>
      <div className="mt-5">
        <RippleCtaLink
          href={config.ctaHref}
          label={config.ctaLabel}
          size="sm"
          section="sidebar-cta"
          className="!w-full !bg-[#22C55E] !text-[#101820] hover:!bg-[#86EFAC] focus-visible:!ring-[#22C55E] focus-visible:!ring-offset-[#101820]"
        />
      </div>
    </div>
  );
}
