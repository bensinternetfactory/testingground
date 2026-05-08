import Link from "next/link";
import { PROMO_STRIP } from "../../_lib/content";

export function PromoStrip() {
  return (
    <div className="bg-white pt-3">
      <div className="2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#dcfce7] text-[var(--t-ink)] rounded-lg py-2 px-4 text-xs sm:text-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <span className="font-medium">{PROMO_STRIP.copy}</span>
            <Link
              href={PROMO_STRIP.ctaHref}
              className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-[var(--t-blue)] hover:bg-[var(--t-blue-hover)] text-white text-xs font-semibold whitespace-nowrap transition-colors"
            >
              {PROMO_STRIP.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
