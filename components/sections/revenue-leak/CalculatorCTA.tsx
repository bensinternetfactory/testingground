export function CalculatorCTA() {
  return (
    <section id="calculator" className="bg-[#F7F7F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl bg-[#F3EEE7]">
          <div className="grid items-center gap-12 p-8 md:grid-cols-2 md:p-12 lg:p-16">
            {/* Left: copy */}
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
                See how fast the truck{" "}
                <span className="text-[#DE3341]">pays for itself</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#545454]">
                Plug in the price of the truck you&rsquo;re looking at.
                We&rsquo;ll show you the monthly payment &mdash; and how many
                tow calls it takes to cover it.
              </p>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#pre-approve"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#111111] bg-transparent px-8 text-base font-medium text-[#111111] transition-colors duration-200 hover:bg-[#111111] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  Run the numbers
                </a>
              </div>

              <p className="mt-4 text-sm text-[#545454]">
                Want real numbers, not estimates? Get pre-approved in
                30&nbsp;seconds and we&rsquo;ll show you actual payments.
              </p>
            </div>

            {/* Right: calendar visual */}
            <div className="rounded-2xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9]">
              <p className="mb-4 text-sm font-medium tracking-wide text-[#545454] uppercase">
                Typical Month
              </p>
              <div
                className="grid grid-cols-7 gap-1.5"
                role="img"
                aria-label="Calendar showing truck payment covered in first 5 days, remaining 25 days are profit"
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`flex h-8 items-center justify-center rounded-lg text-xs font-medium ${
                      i < 5
                        ? "bg-[#FBF0F6] text-[#DE3341]"
                        : "bg-[#EFF7F3] text-[#0B5E36]"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded bg-[#FBF0F6]"
                    aria-hidden="true"
                  />
                  <span className="text-[#545454]">Payment Covered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded bg-[#EFF7F3]"
                    aria-hidden="true"
                  />
                  <span className="text-[#545454]">Profit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
