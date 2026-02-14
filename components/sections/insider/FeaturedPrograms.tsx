const programs = [
  {
    title: "Fleet Expansion Financing",
    description:
      "Adding your 4th truck? Your 10th? We structure tow truck financing for multi-unit operators who are scaling \u2014 with terms that account for seasonal swings, per-truck revenue, and the reality that your best months fund your slowest ones.",
    cta: "See fleet options",
    href: "#pre-approve",
    gradient: "from-blue-900 to-cyan-900",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Owner-Operator Upgrade",
    description:
      "Running one truck and ready to step up \u2014 maybe from a wheel-lift to a rollback, or from a light-duty to a medium. We\u2019ve helped thousands of single-truck operators make the upgrade that doubles their call volume.",
    cta: "Plan your upgrade",
    href: "#pre-approve",
    gradient: "from-slate-800 to-slate-700",
    iconPath:
      "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
  },
  {
    title: "Rotator & Specialty Financing",
    description:
      "Rotators are the highest-revenue asset in towing. We structure rotator financing around utilization rates, contract revenue, and the competitive advantage of being one of the only operators in your market with heavy-lift capability.",
    cta: "Explore rotator financing",
    href: "#pre-approve",
    gradient: "from-amber-900 to-orange-900",
    iconPath:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export function FeaturedPrograms() {
  return (
    <section id="programs" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            Tow Truck Financing Programs That Fit{" "}
            <span className="text-amber-600">How You Operate</span>
          </h2>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <li
              key={program.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {/* Colored header */}
              <div
                className={`flex h-32 items-center justify-center bg-gradient-to-r ${program.gradient}`}
              >
                <svg
                  className="h-12 w-12 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={program.iconPath}
                  />
                </svg>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {program.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">
                  {program.description}
                </p>
                <a
                  href={program.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  {program.cta}
                  <svg
                    className="h-4 w-4"
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
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
