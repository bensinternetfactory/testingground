const painPoints = [
  "They don't know what they can actually spend",
  "They can't commit on the spot",
  "They're waiting on a bank that doesn't understand tow trucks",
];

const XIcon = () => (
  <svg
    className="h-5 w-5 text-red-400"
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

export function ProblemSection() {
  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              The Florida Tow Show Problem{" "}
              <span className="text-amber-400">Nobody Talks About</span>
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-slate-300">
              Most people at the show? Browsers. They&apos;ll see the truck they
              want. Talk to the seller. Say &quot;let me think about it&quot; —
              and watch someone else drive it away.
            </p>

            <ul className="mt-8 space-y-4">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                    <XIcon />
                  </div>
                  <p className="text-lg text-slate-300">{point}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/10 p-6">
              <p className="text-lg leading-relaxed text-slate-200">
                The prepared buyer already knows his number. He negotiates. He
                closes. He&apos;s loading his new wrecker while everyone else is
                still &quot;thinking about it.&quot;
              </p>
              <p className="mt-4 text-xl font-bold text-amber-400">
                Which one will you be?
              </p>
            </div>
          </div>

          {/* Right side - Big stat */}
          <div className="flex flex-col items-center justify-center text-center lg:items-end lg:text-right">
            <div className="rounded-2xl bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-12 backdrop-blur-sm">
              <div
                className="text-8xl font-black text-white md:text-9xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                5,000
              </div>
              <div className="mt-4 text-xl font-medium text-cyan-300">
                people will walk the floor
              </div>
              <div className="mt-2 text-lg text-slate-400">
                in Orlando this April
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
