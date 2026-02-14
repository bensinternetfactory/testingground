const testimonials = [
  {
    quote:
      "I was turning down 10\u201315 calls a week because I only had two trucks on the road. Pre-approved on a Monday, had the truck by Thursday. Covered the payment in the first 12\u00a0days. Looking at truck four now.",
    name: "Marcus T.",
    fleet: "3-truck fleet",
    state: "Georgia",
  },
  {
    quote:
      "My competitor across town added two trucks and started pulling my motor club calls. I needed to move fast. Pre-approved in under a minute, picked up the truck that same week. That truck has been running ever since.",
    name: "Dana R.",
    fleet: "6-truck fleet",
    state: "Texas",
  },
  {
    quote:
      "I\u2019d been putting off the rotator for two years because the price tag scared me. They showed me what the heavy calls would actually bring in. Paid for itself faster than I expected. Should\u2019ve done it sooner.",
    name: "James W.",
    fleet: "9-truck fleet",
    state: "Ohio",
  },
];

const stats = [
  { value: "$2.8M+", label: "in towing equipment financed this year" },
  {
    value: "24 hrs",
    label: "average time from pre-approval to full approval",
  },
  { value: "340+", label: "towing operators funded" },
  { value: "4.9/5", label: "average operator rating" },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="grid items-start gap-12 md:grid-cols-3">
          {/* Left: heading in maroon box */}
          <div className="flex items-center justify-center rounded-3xl bg-[#590213] p-12 md:col-span-1 md:min-h-[400px]">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
              They stopped turning down{" "}
              <span className="text-[#DE3341]">calls.</span>
            </h2>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-6 md:col-span-2">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="rounded-3xl bg-[#F7F7F7] p-8 shadow-[inset_0_0_0_1px_#E9E9E9]"
              >
                {/* Quote mark */}
                <div
                  className="font-serif text-5xl leading-none text-[#DE3341]/20"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <blockquote className="mt-2 text-lg font-medium leading-relaxed text-[#111111]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <footer className="mt-6 flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-sm font-medium text-white"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-base font-medium text-[#111111]">
                      {t.name}
                    </cite>
                    <p className="text-sm text-[#545454]">
                      {t.fleet} | {t.state}
                    </p>
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <ul className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <li key={index} className="text-center">
              <p className="text-3xl font-medium text-[#111111] [font-variant-numeric:tabular-nums]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[#545454]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
