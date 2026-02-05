import { Container } from "@/components/ui/Container";

export function ExampleSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          What a Private Party Deal Actually Looks Like
        </h2>
        <div className="mt-6 space-y-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              The $57,000 Ram 5500 Rollback
            </h3>
            <p className="mt-4">
              Customer found a Ram 5500 rollback on Facebook Marketplace. Seller was a towing operator scaling down his fleet. Price was fair, truck was solid, but no dealer meant most lenders wouldn&apos;t touch it.
            </p>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>Customer sent us the listing and seller info</li>
              <li>Seller had clear title—no existing loan</li>
              <li>Customer signed docs electronically</li>
              <li>Seller completed his paperwork in about 10 minutes</li>
              <li>We wired $57,000 to the seller</li>
              <li>Seller mailed the title, customer picked up the truck</li>
            </ul>
            <p className="mt-4">
              Total time from first contact to funding: 4 days. Would have been faster, but the seller was out of town for a day.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              When the seller has a loan
            </h3>
            <p className="mt-4">
              Different deal, same process—with an extra step. Buyer found a heavy wrecker from another company. Seller still owed $40,000 on it. Agreed price was $75,000.
            </p>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>Seller got a 10-15 day payoff letter from their lender</li>
              <li>We verified the payoff amount and lien position</li>
              <li>At closing, we wired $40,000 to the seller&apos;s bank</li>
              <li>We sent the remaining $35,000 equity to the seller</li>
              <li>Bank released the title once payoff cleared</li>
              <li>Deal done, buyer picked up the truck</li>
            </ul>
            <p className="mt-4">
              Added about a week for the payoff process. But the buyer got the wrecker he wanted at a price that worked.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
