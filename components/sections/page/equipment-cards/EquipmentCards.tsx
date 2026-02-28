import type { EquipmentCardsConfig } from "./config";

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

export function EquipmentCards({ config }: { config: EquipmentCardsConfig }) {
  return (
    <section id="equipment" className="bg-[#F5F5F5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            {config.headline}
          </h2>
          <p className="mt-4 text-lg text-[#545454]">{config.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.cards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col rounded-3xl bg-white p-6 min-[321px]:p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className={`flex h-16 w-16 shrink-0 items-center sm:h-16 sm:w-auto ${card.iconClassName ?? ""}`}>
                  {card.icon}
                </div>
                <h3 className="text-base min-[321px]:text-xl font-medium tracking-tight min-[321px]:tracking-normal text-[#101820] sm:mt-3">
                  {card.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#545454]">
                {card.description}
              </p>
              <a
                href={card.linkHref}
                className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#101820] transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820] focus-visible:ring-offset-2"
              >
                {card.linkText}
                {ArrowIcon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
