import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "You find the truck",
    description: "FB Marketplace, auction, another operator, wherever. The truck has to be worth at least $20,000.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Send us the truck info",
    description: "Year, make, model, VIN, agreed price, seller contact. We draft the bill of sale.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Provide title or e-title copy",
    description: "Seller needs to show proof they own the truck. We verify it's clear or identify any existing liens.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Credit decision",
    description: "Same day possible. We look at your business, credit history, and the deal itself.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Electronic docs",
    description: "Both buyer and seller sign electronically. Seller paperwork takes about 10 minutes.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "We wire the funds",
    description: "Either direct to seller, or to their payoff bank plus equity to the seller if they still owe money.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Seller mails title, you pick up the truck",
    description: "Deal done. You've got your equipment.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const additionalInfo = [
  {
    title: "Same-day closing is possible",
    description: "If your docs and insurance are ready, and the seller is cooperative with a clear title, we can fund same day. Most deals close within a few days. The variable is usually the seller's responsiveness, not our process.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Bank payoffs handled",
    description: "Seller still owes money on the truck? No problem. They get a 10-15 day payoff letter from their lender. We wire the payoff amount directly to that bank, then send the remaining equity to the seller. Title gets released, deal closes. Adds time but it's routine.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: "Seller involvement is minimal",
    description: "A few electronic signatures. Maybe 15 minutes of their time total. They don't need to come to an office, meet with anyone, or deal with paperwork stacks. Everything's electronic.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function ProcessSectionV2() {
  return (
    <section id="process" className="bg-white py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            How Private Party Tow Truck Financing Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            The process is straightforward once you understand the steps. Here&apos;s what happens from finding a truck to driving it away:
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300 md:left-1/2 md:block md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Step card */}
                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        {step.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900">{step.title}</h3>
                        <p className="mt-2 text-zinc-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Number circle */}
                <div className="absolute left-0 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-amber-600 text-xl font-bold text-white shadow-lg md:relative md:left-auto md:z-10">
                  {step.number}
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden flex-1 md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Additional info cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {additionalInfo.map((info, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 text-white">
                {info.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{info.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{info.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
