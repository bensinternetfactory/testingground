import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    quote:
      "Got pre-approved before last year's show. Found a rollback on the floor, negotiated $3K off because I could close same day. Seller didn't want to haul it back.",
    name: "Mike R.",
    location: "Tampa",
  },
  {
    quote:
      "I'd been to three shows just looking. Finally got smart, got pre-approved, and walked out with a medium-duty wrecker. Should've done it years ago.",
    name: "Carlos M.",
    location: "Orlando",
  },
  {
    quote:
      "The 180-day deferral was the difference. Used it all summer, had the money by the time payments started.",
    name: "James T.",
    location: "Jacksonville",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Operators Who Came Prepared
        </h2>
        <div className="mt-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-6"
            >
              <blockquote className="text-lg leading-8 text-zinc-600">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-4 font-medium text-black">
                — {testimonial.name}, {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
