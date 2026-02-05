import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function OfferSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Walk the Florida Tow Show as a Buyer, Not a Browser
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600">
          <p>
            Get pre-approved for tow truck financing before April 9th. Know exactly what you can spend before you shake a single hand.
          </p>
          <p className="font-medium text-black">What you get:</p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <span className="font-medium text-black">$0 down</span> — Keep your cash for equipment, insurance, or working capital
            </li>
            <li>
              <span className="font-medium text-black">No payments for 180 days</span> — Buy in April, first payment in October
            </li>
            <li>
              <span className="font-medium text-black">Pre-approval in hand</span> — Walk the floor ready to negotiate and close
            </li>
            <li>
              <span className="font-medium text-black">Finance anything you find</span> — Dealer floor, auction, or private party sale
            </li>
          </ul>
        </div>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="text-xl font-medium text-black">The Math</h3>
          <div className="mt-4 space-y-4 text-lg leading-8 text-zinc-600">
            <p>
              Florida&apos;s busiest towing season runs June through November. Summer breakdowns. Hurricane season. That&apos;s 6 months of peak revenue before you make a single payment.
            </p>
            <p className="font-medium text-black">
              The truck pays for itself.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button href="#">Get Your Pre-Approval</Button>
        </div>
      </Container>
    </section>
  );
}
