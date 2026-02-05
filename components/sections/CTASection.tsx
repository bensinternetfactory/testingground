import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section id="cta" className="py-16 md:py-24">
      <Container>
        <div className="rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-900 md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Found a Truck? See Your Payment in 30 Seconds
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              Got a truck in mind? Run the numbers. Our payment calculator shows your estimated monthly payment instantly—no credit check, no commitment.
            </p>
            <p>
              If you want to proceed, the credit application takes 30 seconds. Approval decision same day. We finance private party deals in all 50 states.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#">Check Your Payment</Button>
            <Button variant="secondary" href="#">
              See What You Qualify For
            </Button>
          </div>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
            No dealer required. We handle title verification and bank payoffs.
          </p>
        </div>
      </Container>
    </section>
  );
}
