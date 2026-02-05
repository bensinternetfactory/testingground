import { Container } from "@/components/ui/Container";

export function WhyBanksRefuse() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Why Banks Won&apos;t Finance Private Party Tow Trucks
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p>
            Most lenders refuse private party deals. Not because they&apos;re bad deals, but because they require work that most lenders aren&apos;t set up to do.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                Title complexity
              </h3>
              <p className="mt-2">
                Every private party title needs verification. Is it clear? Are there liens? Is the seller actually the owner? With a dealer, that&apos;s the dealer&apos;s problem. With private party, the lender has to verify it. Most won&apos;t.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                Valuation difficulty
              </h3>
              <p className="mt-2">
                No dealer invoice means no automatic value. Lenders have to pull comps manually—similar trucks sold recently, current listings, auction data. It takes time and expertise. Easier to just say no.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                No dealer buffer
              </h3>
              <p className="mt-2">
                Dealers provide a buffer. Warranty, inspection, recourse if something&apos;s wrong. With private party, it&apos;s just buyer and seller. If the truck has problems, that&apos;s between them. Banks don&apos;t like that uncertainty.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                Manual process
              </h3>
              <p className="mt-2">
                Dealer financing is automated. Dealer sends docs, lender approves, done. Private party requires verification at every step. Title check, seller verification, payoff coordination if there&apos;s a loan. Most lenders aren&apos;t built for that kind of manual work.
              </p>
            </div>
          </div>

          <p className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            We built our process specifically for private party transactions. Title verification, bank payoffs, valuation—that&apos;s what we do. It&apos;s not a side offering. It&apos;s the core of how we operate.
          </p>
        </div>
      </Container>
    </section>
  );
}
