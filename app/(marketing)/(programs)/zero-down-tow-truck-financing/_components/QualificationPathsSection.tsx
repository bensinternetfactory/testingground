import type { ReactNode } from "react";

interface QualificationPath {
  chip: string;
  title: string;
  items: { label: string; body: string }[];
  explanation: ReactNode;
}

const paths: QualificationPath[] = [
  {
    chip: "PATH A",
    title: "Credit and Comparable Debt",
    items: [
      {
        label: "640+ credit score",
        body: "Not perfect credit. Not 700. Just 640.",
      },
      {
        label: "2 years in business",
        body: "You've survived the hardest part. That matters.",
      },
      {
        label: "Comparable debt",
        body: "At least 12 payments on an auto or installment loan worth half the amount you're borrowing.",
      },
    ],
    explanation: (
      <>
        That last one trips people up, so here&apos;s what it means in plain
        terms: if you&apos;re financing a $100,000 truck, we want to see that
        you&apos;ve made 12 consecutive payments on a loan of $50,000 or more.
        Could be a truck you already own. Could be equipment. Could be a
        personal vehicle loan. It proves you can handle the payment &mdash; and
        that&apos;s what lets us drop the down payment to zero.
      </>
    ),
  },
  {
    chip: "PATH B",
    title: "Fleet Operator",
    items: [
      { label: "640+ credit score", body: "Same bar." },
      { label: "2 years in business", body: "Same bar." },
      {
        label: "3+ tow trucks in your fleet",
        body: "You're already running an operation. The fleet itself is the proof.",
      },
    ],
    explanation: (
      <>
        If you&apos;re running three trucks, you know how to manage payments,
        insurance, maintenance, and drivers. That track record replaces the
        need for comparable debt.
      </>
    ),
  },
];

export function QualificationPathsSection() {
  return (
    <section
      id="how-to-qualify"
      className="scroll-mt-[calc(var(--nav-height)+24px)] pt-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        How to Qualify for $0 Down
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-[#111] md:text-lg">
        <p>
          No guesswork. There are two paths. You probably already fit one of
          them.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {paths.map((path) => (
          <div
            key={path.chip}
            className="rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-8"
          >
            <div className="inline-flex items-center rounded-full bg-[#15803D] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {path.chip}
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#111] md:text-[1.75rem]">
              {path.title}
            </h3>
            <ol className="mt-5 space-y-4">
              {path.items.map((item, i) => (
                <li key={item.label} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#F5F5F5] text-sm font-semibold text-[#111]"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[#111] md:text-lg">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-[#3A3A3A]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-[#E9E9E9] pt-5 text-base leading-relaxed text-[#111] md:text-lg">
              {path.explanation}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-base leading-relaxed text-[#111] md:text-lg">
        <span className="font-semibold text-[#111]">
          Don&apos;t fit either path exactly?
        </span>{" "}
        Apply anyway. These are the two fastest routes to $0 down, but we
        structure every deal individually. Your situation might qualify through
        a different combination.
      </p>
    </section>
  );
}
