import { FAQ } from "./FAQ";
import type { FaqSectionConfig } from "./config";

export function FaqSection({ config }: { config: FaqSectionConfig }) {
  return (
    <section
      id="faq"
      className="bg-[#F5F5F5] py-20 md:py-28 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          {config.eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#15803D]">
              {config.eyebrow}
            </p>
          ) : null}
          <h2
            className={`text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl ${
              config.eyebrow ? "mt-4" : ""
            }`}
          >
            {config.heading}
          </h2>
        </div>
        <FAQ faqs={config.faqs} />
      </div>
    </section>
  );
}
