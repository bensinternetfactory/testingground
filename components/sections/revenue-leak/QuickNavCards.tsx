const cards = [
  {
    label: "I need a truck on the road now",
    href: "#pre-approve",
    badge: "Most Popular",
  },
  {
    label: "I want to see what payments look like",
    href: "#calculator",
    badge: null,
  },
  {
    label: "I\u2019m growing my fleet this year",
    href: "#programs",
    badge: null,
  },
];

const ArrowIcon = () => (
  <svg
    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
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

export function QuickNavCards() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <li key={index}>
              <a
                href={card.href}
                className="group flex items-center justify-between rounded-2xl p-6 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                <div className="flex flex-col gap-2">
                  {card.badge && (
                    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#EFF7F3] px-3 py-1 text-xs font-medium text-[#0B5E36]">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {card.badge}
                    </span>
                  )}
                  <span className="text-xl font-medium text-[#111111]">
                    {card.label}
                  </span>
                </div>
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
