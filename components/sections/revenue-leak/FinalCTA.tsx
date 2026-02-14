const valueProps = [
  {
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "30 Seconds to Pre-Approval",
    description:
      "Quick form. No hard credit pull. You\u2019ll know where you stand before your next call comes in. From there, see your estimated payment. If the numbers work, apply \u2014 and we\u2019ll have a full decision back within 24\u00a0hours.",
  },
  {
    iconPath:
      "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    title: "Built for Towing. That\u2019s All We Do.",
    description:
      "We know the difference between a Jerr-Dan and a Century. We understand seasonal call volume, motor club contracts, and municipal rotation lists. Your financing is built by people who speak your language.",
  },
  {
    iconPath:
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    title: "Terms That Match How Towing Actually Works",
    description:
      "Slow month in January? Growth phase in spring? We build payment structures around how towing revenue actually flows. 36 to 84\u00a0month terms. Competitive rates. No prepayment penalties.",
  },
];

export function FinalCTA() {
  return (
    <section id="about" className="bg-[#FBF0F6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
            Your next truck should already be{" "}
            <span className="text-[#DE3341]">on the road</span>
          </h2>
        </div>

        {/* Value props */}
        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {valueProps.map((prop, index) => (
            <li key={index} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111111] shadow-[inset_0_0_0_1px_#E9E9E9]">
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
                    d={prop.iconPath}
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-[#111111]">
                {prop.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#545454]">
                {prop.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <a
            href="#pre-approve"
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#111111] px-10 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            Get pre-approved &mdash; 30&nbsp;seconds, no&nbsp;commitment
          </a>
          <p className="mt-4 text-sm text-[#545454]">
            See your estimated payment right after. No surprises.
          </p>
        </div>
      </div>
    </section>
  );
}
