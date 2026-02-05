import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "What if the seller has a loan on the truck?",
    answer:
      "We handle it. The seller gets a 10-15 day payoff letter from their lender. We wire the payoff amount to their bank, send the remaining equity to the seller. Title gets released, deal closes.",
  },
  {
    question: "How do you determine what the truck is worth?",
    answer:
      "The bank runs approximately 5 comps—similar trucks recently sold or currently listed. If the agreed price is within range, no issues. If it's way over market, we'll let you know.",
  },
  {
    question: "Does the seller need to be there or do a lot of paperwork?",
    answer:
      "Minimal involvement. Everything's electronic. They sign docs, we wire funds, they mail the title. Maybe 15 minutes of their time total.",
  },
  {
    question: "How fast can you close?",
    answer:
      "As fast as we get signed docs from you, signed docs from the seller, and proof of insurance. Same day is possible with a cooperative seller and clear title.",
  },
  {
    question: "Do you finance older trucks?",
    answer:
      "Yes. No age or mileage restrictions. Early 2000s trucks, high-mileage equipment—if it runs and has value, we can finance it.",
  },
  {
    question: "What about trucks from auctions?",
    answer:
      "Yes, we finance auction purchases. Same process—you provide the auction paperwork, we handle financing.",
  },
  {
    question: "Can I finance a heavy wrecker or rotator from a private seller?",
    answer:
      "Yes. Actually a great use case. The $20,000 minimum means this works well for higher-value equipment like heavy wreckers, rotators, and other specialty trucks.",
  },
  {
    question: "What states do you cover?",
    answer: "All 50 states.",
  },
];

export function FAQSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-8">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-xl font-medium text-black dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="mt-3 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
