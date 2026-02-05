const features = [
  {
    iconPath:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "$0 Down",
    description:
      "Keep your cash for equipment, insurance, or working capital. No large upfront payment required.",
  },
  {
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "No Payments for 180 Days",
    description:
      "Buy in April, first payment in October. Let the truck earn before you pay.",
  },
  {
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Pre-Approval in Hand",
    description:
      "Walk the floor ready to negotiate and close. Know exactly what you can spend.",
  },
  {
    iconPath:
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Finance Anything You Find",
    description:
      "Dealer floor, auction, or private party sale. We finance tow trucks from any source.",
  },
];

export function OfferSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            Get Pre-Approved{" "}
            <span className="text-amber-600">Before April&nbsp;9th</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
            Know exactly what you can spend before you shake a single hand.
          </p>
        </div>

        {/* Feature cards grid */}
        <ul className="mt-16 grid gap-8 sm:grid-cols-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/25">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.iconPath}
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>

        {/* The Math callout */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-cyan-800 p-1">
          <div className="rounded-xl bg-gradient-to-r from-blue-900 to-cyan-800 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white">The Math</h3>
            <p className="mt-4 text-lg leading-relaxed text-blue-100">
              Florida&apos;s busiest towing season runs June through November.
              Summer breakdowns. Hurricane season. That&apos;s 6&nbsp;months of peak
              revenue before you make a single payment.
            </p>
            <p className="mt-6 text-2xl font-bold text-amber-400">
              The truck pays for itself.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/25 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            Get Your Pre-Approval
          </a>
        </div>
      </div>
    </section>
  );
}
