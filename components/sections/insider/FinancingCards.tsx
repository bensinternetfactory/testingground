const programs = [
  {
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Pre-Approved in 30 Seconds \u2014 On the Road in Days",
    description:
      "You\u2019re turning down calls. Motor clubs are rotating you out. We get it. Fill out a 30-second form, get pre-approved with no credit check, and we match you with the right lender. When you\u2019re ready to move forward, it\u2019s a soft credit pull \u2014 not a hard inquiry. You get a real decision within one business day.",
  },
  {
    iconPath:
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    title: "Used Tow Truck Financing That Makes Sense",
    description:
      "Banks don\u2019t want to touch a 2018 Kenworth with 120K on the clock. We do \u2014 because we know a well-maintained wrecker with highway miles has years of revenue left in it. We finance used rollbacks, flatbeds, wreckers, and rotators that traditional lenders won\u2019t look at. If the truck can work, we can finance it.",
  },
  {
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Rotator & Heavy-Duty Tow Truck Financing",
    description:
      "A 75-ton rotator is a $600K asset that generates $400/hour on a scene. But try explaining that to a bank. We structure heavy-duty tow truck financing around what the equipment actually earns \u2014 recovery revenue, government contracts, and the calls nobody else in your market can take.",
  },
];

export function FinancingCards() {
  return (
    <section id="financing" className="bg-slate-800 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Three Ways to Get Your Next Truck{" "}
            <span className="text-amber-400">on the Road</span>
          </h2>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <li
              key={program.title}
              className="group flex flex-col rounded-2xl border border-slate-700 bg-slate-900 p-8 transition-all duration-200 hover:border-amber-500/40 motion-reduce:transition-none"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/25">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={program.iconPath}
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                {program.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-slate-400">
                {program.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Section CTA */}
        <div className="mt-12 text-center">
          <a
            href="#pre-approve"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            Get Pre-Approved &mdash; 30 Seconds, No Credit Check
          </a>
        </div>
      </div>
    </section>
  );
}
