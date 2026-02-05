import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
          Private Party Tow Truck Financing
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <p>
            Found a truck from another towing company? A retiring operator? Facebook Marketplace? You can finance it.
          </p>
          <p>
            Private party tow truck financing lets you buy equipment directly from sellers—no dealer required. That $57,000 Ram 5500 flatbed you spotted on Marketplace? The heavy wrecker a competitor is selling? The rotator from a retiring owner? All financeable.
          </p>
          <p>
            The problem: Most lenders refuse private party deals. They only work with dealers because it&apos;s easier. No dealer invoice? No financing.
          </p>
          <p>
            We built our process around private party transactions. We verify titles, handle bank payoffs when sellers still owe money, and wire funds directly. You find the truck. We finance it.
          </p>
          <p>
            This guide covers exactly how private party financing works, what you need, what makes deals fall through, and how to know if it&apos;s right for your situation.
          </p>
        </div>
        <div className="mt-10">
          <Button href="#cta">See What You Qualify For</Button>
        </div>
      </Container>
    </section>
  );
}
