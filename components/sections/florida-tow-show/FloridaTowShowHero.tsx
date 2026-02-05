import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FloridaTowShowHero() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black sm:text-4xl">
          $0 Down. No Payments for 180 Days.
        </h1>
        <p className="mt-6 text-xl leading-8 text-zinc-600">
          Get pre-approved for tow truck financing before the Florida Tow Show (April 9-11, 2026)
        </p>
        <div className="mt-8 space-y-4 text-lg leading-8 text-zinc-600">
          <p>
            Buy in April. Work it all summer. First payment in October.
          </p>
          <p>
            Dealer, auction, or another operator&apos;s rig — we finance what you find.
          </p>
        </div>
        <div className="mt-10">
          <Button href="#">Get Pre-Approved Now</Button>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Takes 5 minutes. No obligation. Know your number before you go.
        </p>
      </Container>
    </section>
  );
}
