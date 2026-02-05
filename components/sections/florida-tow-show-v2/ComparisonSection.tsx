const beforeItems = [
  '"I need to check with my bank"',
  "Loses deals to faster buyers",
  "Worries about approval",
  "Browses the show floor",
];

const afterItems = [
  '"I can spend up to $X"',
  "Negotiates from strength",
  "Approved and ready",
  "Buys at the show",
];

const XIcon = () => (
  <svg
    className="h-4 w-4 text-red-500"
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
);

const CheckIcon = () => (
  <svg
    className="h-4 w-4 text-green-500"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export function ComparisonSection() {
  return (
    <section className="bg-slate-100 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            Before vs. After{" "}
            <span className="text-amber-600">Pre-Approval</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Before card */}
          <div className="rounded-2xl border-2 border-red-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-500"
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
              </div>
              <h3 className="text-2xl font-bold text-red-600">Before</h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <XIcon />
                  </div>
                  <p className="text-lg text-slate-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* After card */}
          <div className="rounded-2xl border-2 border-green-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-600">After</h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon />
                  </div>
                  <p className="text-lg text-slate-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-900 to-cyan-800 p-8 text-center md:p-12">
          <p className="text-xl leading-relaxed text-blue-100 md:text-2xl">
            The best deals at the Florida Tow Show go fast. Rotators sell in
            hours, not days. That used heavy-duty wrecker priced right?{" "}
            <span className="font-bold text-white">Gone by lunch.</span>
          </p>
          <p className="mt-6 text-2xl font-bold text-amber-400">
            Pre-approved buyers don&apos;t miss out.
          </p>
        </div>
      </div>
    </section>
  );
}
