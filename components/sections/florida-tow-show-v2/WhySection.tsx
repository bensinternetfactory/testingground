const timeline = [
  {
    month: "April",
    title: "Buy at the Show",
    description: "Find your truck, negotiate from strength, close the deal.",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    month: "May – September",
    title: "Work It All Summer",
    description:
      "Summer breakdowns, hurricane season — 6 months of peak revenue.",
    iconPath:
      "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    month: "October",
    title: "First Payment",
    description: "Pay with money the truck already earned.",
    iconPath:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export function WhySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            Why <span className="text-amber-600">$0&nbsp;Down</span> and{" "}
            <span className="text-amber-600">180&nbsp;Days Deferred</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
            We&apos;ve been to the show. We know how it works. So we built an
            offer that removes the obstacle.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <div className="relative">
            {/* Connecting line - desktop */}
            <div
              className="absolute left-0 right-0 top-16 hidden h-1 bg-gradient-to-r from-blue-900 via-cyan-600 to-amber-500 md:block"
              aria-hidden="true"
            />

            <ol className="grid gap-8 md:grid-cols-3">
              {timeline.map((step, index) => (
                <li
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  {/* Circle */}
                  <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-cyan-700 text-white shadow-xl">
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
                        d={step.iconPath}
                      />
                    </svg>
                    <span className="mt-2 text-sm font-bold">{step.month}</span>
                  </div>

                  {/* Content */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Key points */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <span
                className="text-2xl font-bold text-amber-600"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                $0
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              $0&nbsp;down means you keep your capital
            </h3>
            <p className="mt-3 text-lg text-slate-600">
              You find the right truck. The price is good. But you&apos;re
              thinking about cash flow — the down payment, the monthly hit,
              whether you can swing it right now. $0&nbsp;down removes that obstacle.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <span
                className="text-lg font-bold text-amber-600"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                180
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              180&nbsp;days deferred means the truck works before you pay
            </h3>
            <p className="mt-3 text-lg text-slate-600">
              Buy it in April. Run calls all summer. Handle hurricane season.
              Build your revenue. Then start payments in October with money the
              truck already earned.
            </p>
          </div>
        </div>

        {/* Final statement */}
        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-slate-900 [text-wrap:balance]">
            This isn&apos;t a gimmick.{" "}
            <span className="text-amber-600">
              It&apos;s how smart operators think about equipment.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
