const testimonials = [
  {
    quote:
      "I\u2019d been running two flatbeds and turning down accident calls every weekend. Got pre-approved in about 30 seconds \u2014 no credit check \u2014 and had a full approval the next day. My third truck was on the road by Monday. My bank told me they \u2018don\u2019t finance that type of equipment.\u2019 Tow Loans does nothing else.",
    name: "Marcus T.",
    detail: "Owner, M&T Towing (5 trucks)",
    type: "Flatbed financing",
    location: "Atlanta, GA",
  },
  {
    quote:
      "We needed a rotator to stay on the state police rotation. Every lender I talked to either didn\u2019t know what a rotator was or wanted 40% down. Tow Loans got us into a 75-ton unit with 15% down because they understood the contract revenue backing it.",
    name: "Jennifer R.",
    detail: "Operations Manager, Crossroads Recovery (12 trucks)",
    type: "Rotator financing",
    location: "Columbus, OH",
  },
  {
    quote:
      "I\u2019ve financed six trucks through Tow Loans over three years. They know the truck is worth more than book value because of the revenue it generates. The pre-approval took less time than a dispatch call. No credit hit.",
    name: "Darren W.",
    detail: "Owner-Operator, Darren\u2019s Towing (8 trucks)",
    type: "Multiple units",
    location: "Phoenix, AZ",
  },
];

const stats = [
  { value: "3,000+", label: "Tow trucks financed" },
  { value: "30 sec", label: "Pre-approval time" },
  { value: "50", label: "States covered" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          className="h-5 w-5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="reviews" className="bg-slate-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header + Testimonials */}
        <div className="grid items-start gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Trusted by Towing Companies in All{" "}
              <span className="text-amber-400">50 States</span>
            </h2>
          </div>

          <ul className="grid gap-6 md:col-span-2">
            {testimonials.map((t) => (
              <li
                key={t.name}
                className="relative rounded-2xl border border-slate-800 bg-slate-900 p-8"
              >
                {/* Quote mark */}
                <div
                  className="absolute -top-3 left-6 font-serif text-5xl text-amber-500/20"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <StarRating count={5} />

                <blockquote className="mt-4 text-lg leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <footer className="mt-6 flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-base font-bold text-white">
                      {t.name}
                    </cite>
                    <p className="text-sm text-slate-500">
                      {t.detail} | {t.type} | {t.location}
                    </p>
                  </div>
                </footer>
              </li>
            ))}
          </ul>
        </div>

        {/* Stat blocks */}
        <ul className="mt-16 grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-amber-400 [font-variant-numeric:tabular-nums]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
