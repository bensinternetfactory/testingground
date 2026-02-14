const valueProps = [
  {
    iconPath:
      "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    title: "Built for Tow Operators",
    description:
      "We don\u2019t do semis, box trucks, or dump trailers. Every deal we close is a tow truck. Our lender relationships, our underwriting knowledge, and our approval rates are built around your industry. When you call us, you don\u2019t have to explain what a wheel-lift is.",
  },
  {
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Pre-Approved in 30 Seconds. No Credit Check.",
    description:
      "Fill out one short form. Get a real pre-approval in under 30\u00a0seconds \u2014 no credit inquiry, no strings. When you\u2019re ready to move forward, we run a soft pull. Not a hard inquiry. You get a full decision within one business day.",
  },
  {
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "We Know What Your Truck Is Worth \u2014 To You",
    description:
      "A bank sees a depreciating commercial vehicle. We see a truck that generates $800\u2013$1,200 per day on a busy rotation. We underwrite based on what the truck earns, not just what NADA says it\u2019s worth. That\u2019s why we approve deals banks won\u2019t touch.",
  },
];

export function FinalCTA() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 md:py-28"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl [text-wrap:balance]">
            Tow Truck Financing.{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              That&rsquo;s All We Do.
            </span>
          </h2>
        </div>

        {/* Value props */}
        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {valueProps.map((prop) => (
            <li key={prop.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10">
                <svg
                  className="h-7 w-7 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={prop.iconPath}
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-bold text-white">
                {prop.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-400">
                {prop.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <a
            href="#pre-approve"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <span className="relative z-10">
              Get Pre-Approved &mdash; 30&nbsp;Seconds, No&nbsp;Credit Check
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
          <p className="mt-4 text-sm text-slate-500">
            No obligation. No credit impact. Straight answers from people who
            know towing.
          </p>
        </div>
      </div>
    </section>
  );
}
