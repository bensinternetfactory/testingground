import { Container } from "@/components/ui/Container";

export const faqs = [
  {
    question: "How fast can I get pre-approved for tow truck financing?",
    answer:
      "Most approvals come back same day. Apply now, know your number before the show.",
  },
  {
    question: "What credit score do I need for tow truck financing?",
    answer:
      "We work with a range of credit profiles. Startups, established operators, challenging credit — apply and we'll find the right program.",
  },
  {
    question: "Can I finance a used truck from a private seller?",
    answer:
      "Yes. Dealer, auction, or private party — we finance tow trucks from any source.",
  },
  {
    question: "What if I don't find anything at the show?",
    answer:
      "Pre-approval is good for 90 days. Use it at the show, after the show, or not at all. No obligation.",
  },
  {
    question: "Is this really $0 down tow truck financing?",
    answer:
      "For qualified buyers, yes. $0 down, no payments for up to 180 days. The full offer, not a bait-and-switch.",
  },
  {
    question: "What types of tow trucks do you finance?",
    answer:
      "Wreckers, rollbacks, flatbeds, rotators — light duty, medium duty, and heavy duty. New truck financing and used tow truck financing available.",
  },
  {
    question: "Do you finance startup tow truck businesses?",
    answer:
      "Yes. We have programs for new operators. Credit history matters more than time in business for most of our programs.",
  },
];

export function FAQSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Florida Tow Show Financing Questions
        </h2>
        <div className="mt-8 space-y-8">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-xl font-medium text-black">{faq.question}</h3>
              <p className="mt-3 text-lg leading-8 text-zinc-600">
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
