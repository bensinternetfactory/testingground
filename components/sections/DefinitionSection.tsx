import { Container } from "@/components/ui/Container";

export function DefinitionSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          What Is Private Party Tow Truck Financing?
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            Private party tow truck financing lets you finance a truck purchased directly from another person or business—not a dealer. This includes trucks from Facebook Marketplace, auctions, retiring operators, or other towing companies selling equipment.
          </p>
          <p>What qualifies as a private party purchase:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Trucks from Facebook Marketplace or Craigslist</li>
            <li>Auction purchases</li>
            <li>Buying from a retiring operator</li>
            <li>Purchasing from another towing company</li>
            <li>Any non-dealer transaction</li>
          </ul>
          <p>
            If there&apos;s no dealer involved, it&apos;s private party. Simple as that.
          </p>
        </div>
      </Container>
    </section>
  );
}
