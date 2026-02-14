export function CalculatorCTA() {
  return (
    <section id="calculator" className="bg-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Know What a Truck Costs{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Before You Walk Into the Dealer
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 [text-wrap:pretty]">
                Our payment calculator is built for tow trucks, not sedans.
                Enter the truck price, your down payment, and your estimated
                credit range &mdash; get a real monthly number based on tow
                truck financing rates. No bait-and-switch. Just the math.
              </p>

              {/* Visual: monthly payment breakdown */}
              <div className="mt-10 w-full max-w-md">
                <div className="rounded-xl bg-slate-950/50 p-6">
                  <p className="mb-4 text-sm font-semibold tracking-wide text-slate-400 uppercase">
                    Typical Month for a Working Tow Truck
                  </p>
                  <div
                    className="grid grid-cols-7 gap-1.5"
                    role="img"
                    aria-label="Calendar showing truck payment covered in first 5 days, remaining 25 days are profit"
                  >
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className={`flex h-8 items-center justify-center rounded text-xs font-bold ${
                          i < 5
                            ? "bg-amber-500/30 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded bg-amber-500/30"
                        aria-hidden="true"
                      />
                      <span className="text-slate-400">Payment Covered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded bg-emerald-500/20"
                        aria-hidden="true"
                      />
                      <span className="text-slate-400">Profit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <a
                  href="#pre-approve"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none motion-reduce:hover:scale-100"
                >
                  Calculate Your Payment
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Want real numbers? Get pre-approved in 30&nbsp;seconds and
                we&rsquo;ll show you actual payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
