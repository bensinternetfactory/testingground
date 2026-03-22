import { PurchaseSourceStack } from "@/components/sections/page/purchase-source-stack";
import { TermLengthSlider } from "@/components/sections/page/term-length-slider";
import type { PurchaseAndTermsConfig } from "./config";

export function PurchaseAndTermsSection({
  config,
}: {
  config: PurchaseAndTermsConfig;
}) {
  return (
    <section className="bg-white 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Mobile: stacked with horizontal divider */}
        <div className="md:hidden">
          <div className="py-10">
            <PurchaseSourceStack config={config.purchaseStack} />
          </div>
          <div className="border-t border-gray-200" />
          <div className="py-10">
            <TermLengthSlider config={config.termSlider} />
          </div>
        </div>

        {/* Desktop: side by side with vertical divider */}
        <div className="hidden md:grid md:grid-cols-[1fr_1px_1fr] md:gap-0">
          <div className="py-10 pr-10 md:py-16 lg:pr-14">
            <PurchaseSourceStack config={config.purchaseStack} />
          </div>
          <div className="bg-gray-200" />
          <div className="py-10 pl-10 md:py-16 lg:pl-14">
            <TermLengthSlider config={config.termSlider} />
          </div>
        </div>
      </div>
    </section>
  );
}
