import Link from "next/link";
import type { ProgramCardsConfig } from "./config";

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

export function ProgramCards({ config }: { config: ProgramCardsConfig }) {
  return (
    <section id="programs" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {config.headline}
          </h2>
          {config.subtitle && (
            <p className="mt-4 text-lg text-[#545454]">{config.subtitle}</p>
          )}
        </div>

        <div className="-mx-6 px-6 mt-16 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none scroll-pl-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:scroll-pl-0 lg:grid-cols-4">
          {config.cards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col rounded-3xl bg-white p-6 min-[321px]:p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] w-[72vw] min-w-[220px] max-w-[340px] shrink-0 snap-start min-[425px]:w-[80vw] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink sm:snap-align-none"
            >
              <div className="flex flex-col items-start">
                <div className={`flex h-10 w-auto shrink-0 items-center sm:h-12 ${card.iconClassName ?? ""}`}>
                  {card.icon}
                </div>
                <h3 className="text-base min-[321px]:text-xl font-medium tracking-tight min-[321px]:tracking-normal text-[#101820] mt-4">
                  {card.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#545454]">
                {card.description}
              </p>
              <Link
                href={card.linkHref}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#101820] transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
              >
                {card.linkText}
                {ArrowIcon}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
