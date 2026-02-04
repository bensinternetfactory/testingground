import { Container } from "@/components/ui/Container";

const reasons = [
  {
    title: "Title complexity",
    description:
      "Every private party title needs verification. Is it clear? Are there liens? Is the seller actually the owner? With a dealer, that's the dealer's problem. With private party, the lender has to verify it. Most won't.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "red",
  },
  {
    title: "Valuation difficulty",
    description:
      "No dealer invoice means no automatic value. Lenders have to pull comps manually—similar trucks sold recently, current listings, auction data. It takes time and expertise. Easier to just say no.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "orange",
  },
  {
    title: "No dealer buffer",
    description:
      "Dealers provide a buffer. Warranty, inspection, recourse if something's wrong. With private party, it's just buyer and seller. If the truck has problems, that's between them. Banks don't like that uncertainty.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: "yellow",
  },
  {
    title: "Manual process",
    description:
      "Dealer financing is automated. Dealer sends docs, lender approves, done. Private party requires verification at every step. Title check, seller verification, payoff coordination if there's a loan. Most lenders aren't built for that kind of manual work.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "purple",
  },
];

const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
  red: { bg: "bg-red-50", icon: "bg-red-100 text-red-600", border: "border-red-200" },
  orange: { bg: "bg-orange-50", icon: "bg-orange-100 text-orange-600", border: "border-orange-200" },
  yellow: { bg: "bg-yellow-50", icon: "bg-yellow-100 text-yellow-600", border: "border-yellow-200" },
  purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", border: "border-purple-200" },
};

export function WhyBanksRefuseV2() {
  return (
    <section className="bg-zinc-100 py-16 md:py-24">
      <Container className="max-w-5xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Why Most Lenders Say No
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Why Banks Won&apos;t Finance Private Party Tow Trucks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Most lenders refuse private party deals. Not because they&apos;re bad deals, but because they require work that most lenders aren&apos;t set up to do.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`rounded-2xl border ${colorClasses[reason.color].border} ${colorClasses[reason.color].bg} p-6`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${colorClasses[reason.color].icon}`}
                >
                  {reason.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">{reason.title}</h3>
                  <p className="mt-2 text-zinc-600">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-12 overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 p-8 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/25">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">We&apos;re Different</h3>
              <p className="mt-2 text-lg text-zinc-700">
                We built our process specifically for private party transactions. Title verification, bank payoffs, valuation—that&apos;s what we do. It&apos;s not a side offering. It&apos;s the core of how we operate.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
