import { PurchaseSourceStack } from "@/components/sections/page/purchase-source-stack";
import { TermLengthSlider } from "@/components/sections/page/term-length-slider";
import type { PurchaseAndTermsConfig } from "@/app/_shared/equipment-financing/equipment-page-config";

export function PurchaseAndTermsSection({
  config,
}: {
  config: PurchaseAndTermsConfig;
}) {
  return (
    <section className="bg-white py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Mobile: stacked with horizontal divider */}
        <div className="lg:hidden">
          <PurchaseSourceStack config={config.purchaseStack} />
          <div className="my-16 border-t border-gray-200" />
          <TermLengthSlider config={config.termSlider} />
        </div>

        {/* Desktop: side by side with vertical divider */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
          <div className="pr-10 xl:pr-14">
            <PurchaseSourceStack config={config.purchaseStack} />
          </div>
          <div className="self-stretch bg-gray-200" />
          <div className="pl-10 xl:pl-14">
            <TermLengthSlider config={config.termSlider} />
          </div>
        </div>
      </div>
    </section>
  );
}
