import { Container } from "@/components/ui/Container";

export function RequirementsSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Private Party Tow Truck Financing Requirements
        </h2>
        <div className="mt-6 space-y-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              What you need
            </h3>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>
                <span className="font-medium text-black dark:text-zinc-200">Established towing business</span>
                —this isn&apos;t startup financing. You need operating history.
              </li>
              <li>
                <span className="font-medium text-black dark:text-zinc-200">Good credit history</span>
                —not perfect, but solid. We look at the business and personal credit.
              </li>
              <li>
                <span className="font-medium text-black dark:text-zinc-200">Minimum deal size: $20,000</span>
                —below that, the process doesn&apos;t make sense for either of us.
              </li>
              <li>
                <span className="font-medium text-black dark:text-zinc-200">No truck age or mileage restrictions</span>
                —early 2000s trucks, high-mileage workhorses, all fine. If it runs and has value, we can finance it.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              What the seller needs
            </h3>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>
                <span className="font-medium text-black dark:text-zinc-200">Title or e-title</span>
                —we verify ownership and check for liens.
              </li>
              <li>
                <span className="font-medium text-black dark:text-zinc-200">Willingness to sign electronic docs</span>
                —about 10-15 minutes of their time.
              </li>
              <li>
                <span className="font-medium text-black dark:text-zinc-200">If they have a loan: 10-15 day payoff letter</span>
                —from their lender showing exact payoff amount.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium text-black dark:text-zinc-100">
              Good fit for
            </h3>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>Heavy wreckers and rotators from other companies</li>
              <li>Older equipment that still runs great</li>
              <li>Auction purchases</li>
              <li>Retiring operator buyouts</li>
              <li>Fleet reduction sales from established companies</li>
            </ul>
            <p className="mt-4">
              The $20,000 minimum means this works especially well for higher-value equipment—heavy wreckers, rotators, well-equipped flatbeds. That&apos;s often where the best private party deals are anyway.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
