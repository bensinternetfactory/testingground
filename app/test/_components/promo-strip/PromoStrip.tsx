import { PROMO_STRIP } from "../../_lib/content";

export function PromoStrip() {
  return (
    <div className="bg-[var(--t-blue-ink)] text-white text-xs sm:text-sm">
      <div className="2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center text-center gap-3">
          <span className="truncate">{PROMO_STRIP.copy}</span>
          <a
            href={PROMO_STRIP.ctaHref}
            className="hidden sm:inline-flex items-center font-semibold underline-offset-2 hover:underline whitespace-nowrap"
          >
            {PROMO_STRIP.ctaLabel} →
          </a>
        </div>
      </div>
    </div>
  );
}
