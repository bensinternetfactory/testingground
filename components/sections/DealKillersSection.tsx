import { Container } from "@/components/ui/Container";

export function DealKillersSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          What Makes Private Party Deals Fall Through
        </h2>
        <div className="mt-6 space-y-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p>
            Not every private party deal closes. Here&apos;s what kills them—so you can avoid these problems.
          </p>

          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              #1: Impatient sellers
            </h3>
            <p className="mt-2">
              This is the biggest deal killer. Seller wants cash today. Doesn&apos;t want to wait a few days for financing to process. Decides to take a lower cash offer instead.
            </p>
            <p className="mt-4">
              Financing takes time—not weeks, but not hours either. A cooperative seller with clear title can close same day. But if the seller needs a payoff or is slow to respond, it takes longer.
            </p>
            <p className="mt-4 font-medium text-black dark:text-zinc-200">
              Solution: Set expectations with the seller before you commit. Tell them you&apos;re financing, explain the timeline, make sure they&apos;re willing to wait. If they need cash today, this isn&apos;t the deal.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              #2: Hidden liens
            </h3>
            <p className="mt-2">
              Seller thinks the title is clear. Turns out their bank still has a claim. Or there&apos;s a mechanic&apos;s lien they forgot about. We discover it during verification.
            </p>
            <p className="mt-4">
              We can handle payoffs—that&apos;s routine. But surprise liens add time and sometimes kill the deal if the seller didn&apos;t budget for them.
            </p>
            <p className="mt-4 font-medium text-black dark:text-zinc-200">
              Solution: Ask the seller directly if there&apos;s any money owed on the truck. Get a copy of the title early. We&apos;ll verify everything, but knowing upfront helps.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              #3: Valuation gaps
            </h3>
            <p className="mt-2">
              Seller wants $80,000. Comps say $60,000. The bank runs approximately 5 comps on similar trucks—recently sold, currently listed. If the agreed price is way over market, the deal doesn&apos;t work.
            </p>
            <p className="mt-4 font-medium text-black dark:text-zinc-200">
              Solution: Know the market before you negotiate. Check what similar trucks are selling for. If the price is fair, financing works. If you&apos;re overpaying, we&apos;ll tell you—and you might want to renegotiate.
            </p>
          </div>

          <p className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            Most deals close fine. But the ones that don&apos;t usually fail for one of these three reasons. Knowing them helps you pick better deals and set them up right from the start.
          </p>
        </div>
      </Container>
    </section>
  );
}
