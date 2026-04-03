import { PurchaseSourceGrid } from "@/components/sections/page/purchase-source-grid";
import { TermLengthSlider } from "@/components/sections/page/term-length-slider";
import type { PurchaseAndTermsConfig } from "./config";

export function PurchaseAndTermsSection({
  config,
}: {
  config: PurchaseAndTermsConfig;
}) {
  const hasHeading = !!config.sectionHeading;

  return (
    <section
      className={`${hasHeading ? "bg-[#F8FAFC] pt-20 md:pt-28" : "bg-white"} 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {config.sectionHeading ? (
          <div className="max-w-3xl px-2">
            {config.sectionHeading.eyebrow ? (
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
                {config.sectionHeading.eyebrow}
              </p>
            ) : null}
            <h2
              className={`text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl ${
                config.sectionHeading.eyebrow ? "mt-4" : ""
              }`}
            >
              {config.sectionHeading.heading}
            </h2>
            {config.sectionHeading.intro ? (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#545454]">
                {config.sectionHeading.intro}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Mobile: stacked with horizontal divider */}
        <div className="md:hidden">
          <div className="py-10">
            <PurchaseSourceGrid config={config.purchaseStack} />
          </div>
          <div className="border-t border-gray-200" />
          <div className="py-10">
            <TermLengthSlider config={config.termSlider} />
          </div>
        </div>

        {/* Desktop: side by side with vertical divider */}
        <div className="hidden md:grid md:grid-cols-[1fr_1px_1fr] md:gap-0">
          <div className="py-10 pr-10 md:py-16 lg:pr-14">
            <PurchaseSourceGrid config={config.purchaseStack} />
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
