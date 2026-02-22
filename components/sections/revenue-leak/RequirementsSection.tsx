const weCheck = [
  "2+ years in the towing business",
  "Steady call volume and revenue",
  "How you run your operation",
  "Equipment condition and value",
];

const youDontNeed = [
  "Perfect credit score",
  <>
    Huge down payment \u2014{" "}
    <a
      href="/zero-down-tow-truck-financing"
      className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
    >
      zero down tow truck financing
    </a>{" "}
    available
  </>,
  <>
    Brand new equipment only \u2014 we finance{" "}
    <a
      href="/used-tow-truck-financing"
      className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
    >
      used tow truck financing
    </a>{" "}
    with no age limits
  </>,
  "A dealer \u2014 we finance private party, auction, and Marketplace",
];

export function RequirementsSection() {
  return (
    <section id="requirements" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
            What you need to{" "}
            <span className="text-[#DE3341]">qualify</span>
          </h2>
          <p className="mt-4 text-lg text-[#545454]">
            We look at your business, not just your credit report.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* What we look at */}
          <div className="rounded-3xl bg-[#EFF7F3] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
            <h3 className="text-lg font-medium text-[#0B5E36]">
              What we look at
            </h3>
            <ul className="mt-6 space-y-4">
              {weCheck.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0B5E36]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-base text-[#111111]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What you don't need */}
          <div className="rounded-3xl bg-[#FBF0F6] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
            <h3 className="text-lg font-medium text-[#DE3341]">
              What you DON&rsquo;T need
            </h3>
            <ul className="mt-6 space-y-4">
              {youDontNeed.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DE3341]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="text-base text-[#545454]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#pre-approve"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#111111] bg-transparent px-8 text-base font-medium text-[#111111] transition-colors duration-200 hover:bg-[#111111] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Check your pre-approval
          </a>
        </div>
      </div>
    </section>
  );
}
