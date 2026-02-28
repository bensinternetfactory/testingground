import Link from "next/link";
import type { HowItWorksConfig } from "./config";

const ArrowIcon = (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export function HowItWorks({ config }: { config: HowItWorksConfig }) {
  return (
    <section id="how-it-works" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {config.headline}
          </h2>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {config.steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col rounded-3xl bg-[#F5F5F5] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]"
            >
              <span className="text-sm font-medium text-[#22C55E]">
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

        <div className="mt-12 text-center">
          <Link
            href={config.cta.href}
            className="inline-flex items-center gap-2 text-base font-medium text-[#101820] transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
          >
            {config.cta.label}
            {ArrowIcon}
          </Link>
        </div>
      </div>
    </section>
  );
}
