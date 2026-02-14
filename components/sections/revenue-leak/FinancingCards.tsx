const programs = [
  {
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Pre-Approved by Tomorrow",
    description:
      "You found the truck. The seller\u2019s got other calls coming in. Get pre-approved in 30\u00a0seconds, see your estimated payment, and if the numbers work \u2014 we move. Full approval typically back within 24\u00a0hours.",
    cta: "Get pre-approved now",
    href: "#pre-approve",
  },
  {
    iconPath:
      "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    title: "New & Used Equipment",
    description:
      "Rollbacks, flatbeds, wreckers, rotators. New off the lot or a solid used unit with years of life left. Dealer purchases or private-party sales. We finance the iron that actually works in this industry.",
    cta: "See what we finance",
    href: "#programs",
  },
  {
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Fleet Growth Programs",
    description:
      "Running 3\u00a0trucks and need 5? Running 8 and ready for 12? We structure deals for operators who are scaling. The demand is already sitting on your dispatch board. You just need the capacity to answer it.",
    cta: "Talk to us about fleet growth",
    href: "#programs",
  },
];

export function FinancingCards() {
  return (
    <section id="financing" className="bg-[#F7F7F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
            Financing built for towing.{" "}
            <span className="text-[#DE3341]">
              Not a side hustle for a big bank.
            </span>
          </h2>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {programs.map((program, index) => (
            <li
              key={index}
              className="group flex flex-col rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBF0F6] text-[#111111]">
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
              <h3 className="mt-6 text-xl font-medium text-[#111111]">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
