import Image from "next/image";
import { SectionShell } from "../primitives/SectionShell";
import { CtaButton } from "../primitives/CtaButton";
import { FEATURED_BANNER } from "../../_lib/content";

export function FeaturedBanner() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] items-stretch overflow-hidden rounded-xl bg-[var(--t-blue-ink)] text-white">
        <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#ffd84d] mb-3">
            {FEATURED_BANNER.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
            {FEATURED_BANNER.headline}
          </h2>
          <p className="mt-3 text-[15px] md:text-base text-white/80 max-w-xl">
            {FEATURED_BANNER.body}
          </p>
          <div className="mt-5">
            <CtaButton href={FEATURED_BANNER.ctaHref} variant="secondary" size="lg">
              {FEATURED_BANNER.ctaLabel}
            </CtaButton>
          </div>
        </div>
        <div className="relative min-h-56 md:min-h-72">
          <Image
            src={FEATURED_BANNER.imageSrc}
            alt={FEATURED_BANNER.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </SectionShell>
  );
}
