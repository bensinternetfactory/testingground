const cards = [
  {
    label: "Rollbacks & Flatbeds",
    subtext: "Car carriers, wheel-lift combos, and multi-car haulers",
    href: "#programs",
    badge: "Most Financed",
  },
  {
    label: "Wreckers & Integrated",
    subtext: "Light-duty, medium-duty, and heavy-duty wreckers",
    href: "#programs",
    badge: null,
  },
  {
    label: "Heavy-Duty Rotators",
    subtext: "50-ton and 75-ton rotators \u2014 new builds and pre-owned",
    href: "#programs",
    badge: null,
  },
];

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-amber-400 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
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
}

export function QuickNavCards() {
  return (
    <section id="truck-types" className="bg-slate-900 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.label}>
              <a
                href={card.href}
                className="group relative flex min-h-[120px] items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 transition-all duration-200 hover:border-amber-500/40 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none"
              >
                <div className="flex flex-col gap-2">
                  {card.badge && (
                    <span className="inline-flex w-fit rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-400 uppercase">
                      {card.badge}
                    </span>
                  )}
                  <span className="text-lg font-semibold text-white">
                    {card.label}
                  </span>
                  <span className="text-sm text-slate-400">{card.subtext}</span>
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
