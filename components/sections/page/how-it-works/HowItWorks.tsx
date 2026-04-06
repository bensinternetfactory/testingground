import dynamic from "next/dynamic";
import type { HowItWorksConfig } from "./config";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";

const HowItWorksAccordion = dynamic(() =>
  import("./HowItWorksAccordion").then((m) => m.HowItWorksAccordion)
);

const ArrowIcon = (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

function HowToSchema({ config }: { config: HowItWorksConfig }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.headline,
    step: config.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function HowItWorks({ config }: { config: HowItWorksConfig }) {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-white py-20 md:py-28 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden"
    >
      <HowToSchema config={config} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#101820] min-[375px]:text-3xl sm:text-5xl">
            {config.headline}
          </h2>
        </div>

        <ol className="mt-16 hidden gap-6 md:grid md:grid-cols-3">
          {config.steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col rounded-3xl bg-[#F5F5F5] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]"
            >
              <span className="text-sm font-medium text-[#15803D]">
                {step.number}
              </span>
              <h3 className="mt-3 text-xl font-medium text-[#101820]">
                {step.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <HowItWorksAccordion steps={config.steps} />

        <div className="mt-12 text-center">
          <RippleCtaLink
            href={config.cta.href}
            label={config.cta.label}
            preApprovalTrigger={config.cta.preApprovalTrigger}
            drawer={config.cta.drawer}
            icon={ArrowIcon}
            section="how-it-works"
          />
        </div>
      </div>
    </section>
  );
}
