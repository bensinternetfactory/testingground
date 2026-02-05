import { Container } from "@/components/ui/Container";

export function ProblemSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          The Florida Tow Show Problem Nobody Talks About
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600">
          <p>
            5,000 people will walk the floor in Orlando this April.
          </p>
          <p>
            Most of them? Browsers. They&apos;ll see the truck they want. Talk to the seller. Say &quot;let me think about it&quot; — and watch someone else drive it away.
          </p>
          <p>Here&apos;s why:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>They don&apos;t know what they can actually spend</li>
            <li>They can&apos;t commit on the spot</li>
            <li>They&apos;re waiting on a bank that doesn&apos;t understand tow trucks</li>
          </ul>
          <p>
            The prepared buyer already knows his number. He negotiates. He closes. He&apos;s loading his new wrecker while everyone else is still &quot;thinking about it.&quot;
          </p>
          <p className="font-medium text-black">
            Which one will you be?
          </p>
        </div>
      </Container>
    </section>
  );
}
