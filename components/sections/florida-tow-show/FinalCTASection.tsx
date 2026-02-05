import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-2xl bg-zinc-100 p-8 md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            The Show Is April 9-11. Get Your Number Now.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-600">
            <p>
              Don&apos;t walk the Florida Tow Show wondering if you can afford what you&apos;re looking at.
            </p>
            <p>
              Get pre-approved. Know your budget. Negotiate from strength. Close deals others can&apos;t.
            </p>
            <p className="font-medium text-black">
              $0 down. No payments for 180 days.
            </p>
          </div>
          <div className="mt-8">
            <Button href="#">Get Pre-Approved for the Florida Tow Show</Button>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            5-minute application. Same-day decisions. No obligation until you buy.
          </p>
        </div>
      </Container>
    </section>
  );
}
