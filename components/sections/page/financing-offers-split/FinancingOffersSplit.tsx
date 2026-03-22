import Image from "next/image";
import type { FinancingOffersSplitConfig } from "@/app/_shared/equipment-financing/equipment-page-config";

function OfferHalf({
  offer,
}: {
  offer: FinancingOffersSplitConfig["left"];
}) {
  return (
    <div className="flex flex-col gap-5 py-10 md:py-16">
      <Image
        src={offer.iconSrc}
        alt={offer.iconAlt}
        width={offer.iconWidth}
        height={offer.iconHeight}
        className="h-14 w-14 sm:h-16 sm:w-16"
      />
      <h2 className="text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl lg:text-4xl">
        {offer.headline}
      </h2>
      <p className="max-w-md text-base leading-relaxed text-[#545454] sm:text-lg">
        {offer.body}
      </p>
    </div>
  );
}

export function FinancingOffersSplit({
  config,
}: {
  config: FinancingOffersSplitConfig;
}) {
  return (
    <section className="bg-white 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Mobile: stacked with horizontal divider */}
        <div className="md:hidden">
          <OfferHalf offer={config.left} />
          <div className="border-t border-gray-200" />
          <OfferHalf offer={config.right} />
        </div>

        {/* Desktop: side by side with vertical divider */}
        <div className="hidden md:grid md:grid-cols-[1fr_1px_1fr] md:gap-0">
          <div className="pr-10 lg:pr-14">
            <OfferHalf offer={config.left} />
          </div>
          <div className="bg-gray-200" />
          <div className="pl-10 lg:pl-14">
            <OfferHalf offer={config.right} />
          </div>
        </div>
      </div>
    </section>
  );
}
