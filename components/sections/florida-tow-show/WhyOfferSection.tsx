import { Container } from "@/components/ui/Container";

export function WhyOfferSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Why $0 Down and 180 Days Deferred?
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600">
          <p>
            We&apos;ve been to the show. We know how it works.
          </p>
          <p>
            You find the right truck. The price is good. But you&apos;re thinking about cash flow — the down payment, the monthly hit, whether you can swing it right now.
          </p>
          <p>
            So we built an offer that removes the obstacle:
          </p>
          <p>
            <span className="font-medium text-black">$0 down</span> means you keep your capital.
          </p>
          <p>
            <span className="font-medium text-black">180 days deferred</span> means the truck works before you pay.
          </p>
          <p>
            Buy it in April. Run calls all summer. Handle hurricane season. Build your revenue. Then start payments in October with money the truck already earned.
          </p>
          <p className="font-medium text-black">
            This isn&apos;t a gimmick. It&apos;s how smart operators think about equipment.
          </p>
        </div>
      </Container>
    </section>
  );
}
