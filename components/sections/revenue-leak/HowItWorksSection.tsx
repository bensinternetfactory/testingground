const steps = [
  {
    number: "01",
    title: "Tell us what you\u2019re looking for",
    description:
      "Select your equipment type and answer a few quick questions. Takes about 30\u00a0seconds. No hard credit pull.",
  },
  {
    number: "02",
    title: "See your options",
    description:
      "Get a preliminary estimate\u00a0\u2014 monthly payment range, term options, and down payment requirements. Instantly.",
  },
  {
    number: "03",
    title: "Talk to a specialist",
    description: (
      <>
        A financing advisor who knows the towing industry reviews your deal.
        They&rsquo;ll call within 2&nbsp;business hours. Works for dealer
        purchases,{" "}
        <a
          href="/private-party-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          private party tow truck financing
        </a>
        , and auction buys.
      </>
    ),
  },
  {
    number: "04",
    title: "Get funded",
    description:
      "Full approval typically back within 24\u00a0hours. We handle title, payoff, and wiring\u00a0\u2014 dealer, private party, or auction.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#111111] sm:text-5xl">
            How tow truck financing{" "}
            <span className="text-[#DE3341]">works</span>
          </h2>
          <p className="mt-4 text-lg text-[#545454]">
            Four steps. The first one takes 30&nbsp;seconds.
          </p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]"
            >
              <span className="text-sm font-medium text-[#DE3341]">
                Step {step.number}
              </span>
              <h3 className="mt-3 text-xl font-medium text-[#111111]">
                {step.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-[#545454]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a
            href="#pre-approve"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#111111] bg-transparent px-8 text-base font-medium text-[#111111] transition-colors duration-200 hover:bg-[#111111] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            See what you qualify for
          </a>
        </div>
      </div>
    </section>
  );
}
