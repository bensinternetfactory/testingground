import Image from "next/image";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { SidebarCtaConfig } from "../config";

export function SidebarCta({ config }: { config: SidebarCtaConfig }) {
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
