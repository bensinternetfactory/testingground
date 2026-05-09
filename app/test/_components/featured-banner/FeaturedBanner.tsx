import { SectionShell } from "../primitives/SectionShell";
import { FEATURED_BANNER } from "../../_lib/content";

export function FeaturedBanner() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-0">
      <div className="relative h-[128px] md:h-[168px] w-full overflow-hidden rounded-[8px] bg-stone-200">
        <div className="absolute inset-0 flex flex-col justify-center px-5 md:px-10">
          <p className="text-[11px] md:text-sm font-bold uppercase tracking-wider text-[var(--t-blue-ink)]">
            {FEATURED_BANNER.brand}
          </p>
          <h2 className="mt-1 text-base md:text-2xl font-extrabold leading-tight text-[var(--t-ink)]">
            {FEATURED_BANNER.headline}
          </h2>
          <p className="mt-1 text-[11px] md:text-sm text-[var(--t-text-muted)]">
            {FEATURED_BANNER.subhead}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
