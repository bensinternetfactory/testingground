const programs = [
  {
    title: "Your Credit Score Isn\u2019t the Whole Story",
    description:
      "Most of our operators didn\u2019t start with perfect credit. Here\u2019s what we actually look at: time in business, call volume, and how you run your operation. If you\u2019ve got a year under your belt and steady work, let\u2019s talk.",
    cta: "Check your pre-approval",
    href: "#pre-approve",
    surface: "bg-[#EDF1FF]",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Already Running Trucks? The Next One\u2019s Faster.",
    description:
      "Operators who finance through us get faster approvals on truck number two, three, and beyond. Your track record with us counts. Build the fleet at the pace the work demands \u2014 not the pace a bank allows.",
    cta: "See fleet programs",
    href: "#programs",
    surface: "bg-[#F3EEE7]",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Rotator Financing. No Runaround.",
    description:
      "A rotator is a six-figure investment. Most lenders don\u2019t understand why you need one. We do. Heavy recoveries, police contracts, highway rotation work \u2014 a rotator opens doors that nothing else can.",
    cta: "Talk to a rotator specialist",
    href: "#pre-approve",
    surface: "bg-[#FBF0F6]",
    iconPath:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export function FeaturedPrograms() {
  return (
    <section id="programs" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
            More trucks on the road.{" "}
            <span className="text-[#DE3341]">More calls answered.</span>
          </h2>
          <p className="mt-4 text-lg text-[#545454]">
            Here&rsquo;s how we handle the objections you haven&rsquo;t said out
            loud yet.
          </p>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {programs.map((program, index) => (
            <li
              key={index}
              className="group flex flex-col overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            >
              {/* Tinted header */}
              <div
                className={`flex h-32 items-center justify-center ${program.surface}`}
              >
                <svg
                  className="h-12 w-12 text-[#111111]/60"
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
              <div className="flex flex-1 flex-col bg-white p-8">
                <h3 className="text-xl font-medium text-[#111111]">
                  {program.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                  {program.description}
                </p>
                <a
                  href={program.href}
                  className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#111111] transition-colors hover:text-[#111111]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                >
                  {program.cta}
                  <svg
                    className="h-5 w-5"
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
