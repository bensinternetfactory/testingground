import { Container } from "@/components/ui/Container";

export function ProcessSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          How Private Party Tow Truck Financing Works
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p>
            The process is straightforward once you understand the steps. Here&apos;s what happens from finding a truck to driving it away:
          </p>
          <ol className="ml-6 list-decimal space-y-4">
            <li>
              <span className="font-medium text-black dark:text-zinc-100">You find the truck</span>
              <p className="mt-1">FB Marketplace, auction, another operator, wherever. The truck has to be worth at least $20,000.</p>
            </li>
            <li>
              <span className="font-medium text-black dark:text-zinc-100">Send us the truck info</span>
              <p className="mt-1">Year, make, model, VIN, agreed price, seller contact. We draft the bill of sale.</p>
            </li>
            <li>
              <span className="font-medium text-black dark:text-zinc-100">Provide title or e-title copy</span>
              <p className="mt-1">Seller needs to show proof they own the truck. We verify it&apos;s clear or identify any existing liens.</p>
            </li>
            <li>
              <span className="font-medium text-black dark:text-zinc-100">Credit decision</span>
              <p className="mt-1">Same day possible. We look at your business, credit history, and the deal itself.</p>
            </li>
            <li>
              <span className="font-medium text-black dark:text-zinc-100">Electronic docs</span>
              <p className="mt-1">Both buyer and seller sign electronically. Seller paperwork takes about 10 minutes.</p>
            </li>
            <li>
              <span className="font-medium text-black dark:text-zinc-100">We wire the funds</span>
              <p className="mt-1">Either direct to seller, or to their payoff bank plus equity to the seller if they still owe money.</p>
            </li>
            <li>
              <span className="font-medium text-black dark:text-zinc-100">Seller mails title, you pick up the truck</span>
              <p className="mt-1">Deal done. You&apos;ve got your equipment.</p>
            </li>
          </ol>

          <h3 className="mt-10 text-xl font-medium text-black dark:text-zinc-100">
            Same-day closing is possible
          </h3>
          <p>
            If your docs and insurance are ready, and the seller is cooperative with a clear title, we can fund same day. Most deals close within a few days. The variable is usually the seller&apos;s responsiveness, not our process.
          </p>

          <h3 className="mt-10 text-xl font-medium text-black dark:text-zinc-100">
            Bank payoffs handled
          </h3>
          <p>
            Seller still owes money on the truck? No problem. They get a 10-15 day payoff letter from their lender. We wire the payoff amount directly to that bank, then send the remaining equity to the seller. Title gets released, deal closes. Adds time but it&apos;s routine.
          </p>

          <h3 className="mt-10 text-xl font-medium text-black dark:text-zinc-100">
            Seller involvement is minimal
          </h3>
          <p>
            A few electronic signatures. Maybe 15 minutes of their time total. They don&apos;t need to come to an office, meet with anyone, or deal with paperwork stacks. Everything&apos;s electronic.
          </p>
        </div>
      </Container>
    </section>
  );
}
