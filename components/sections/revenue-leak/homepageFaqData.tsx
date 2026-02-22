import type { ReactNode } from "react";

export interface HomepageFaq {
  question: string;
  answer: ReactNode;
}

export const homepageFaqs: HomepageFaq[] = [
  {
    question: "What credit score do I need for tow truck financing?",
    answer:
      "There\u2019s no hard minimum. We look at the full picture\u00a0\u2014 time in business, revenue, call volume, and how you run your operation. Most of our operators didn\u2019t start with perfect credit. If you\u2019ve got 2+ years and steady work, you\u2019ve got a real shot.",
  },
  {
    question: "Can I finance a used tow truck?",
    answer: (
      <>
        Yes. No age or mileage restrictions. Early 2000s trucks, high-mileage
        equipment\u00a0\u2014 if it runs and has value, we can finance it. Learn
        more about{" "}
        <a
          href="/used-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          used tow truck financing
        </a>
        .
      </>
    ),
  },
  {
    question: "How fast can I get approved?",
    answer:
      "Pre-approval takes about 30\u00a0seconds\u00a0\u2014 soft pull only, no impact to your credit. From there, full approval is typically back within 24\u00a0hours. Same-day funding is possible with signed docs, proof of insurance, and a clear title.",
  },
  {
    question: "Can I buy from a private seller or auction?",
    answer: (
      <>
        Yes\u00a0\u2014 this is one of our biggest differentiators. Facebook
        Marketplace, Craigslist, auction houses, direct from another operator.
        We handle the payoff, title transfer, and wiring. See how{" "}
        <a
          href="/private-party-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          private party tow truck financing
        </a>{" "}
        works.
      </>
    ),
  },
  {
    question:
      "What\u2019s the difference between leasing and financing a tow truck?",
    answer:
      "Financing means you own the truck at the end of the term. Leasing means lower monthly payments but you return or buy out the equipment at the end. Most towing operators prefer financing because the trucks hold value and you want to own your iron. We offer both options.",
  },
  {
    question: "Do you require a down payment?",
    answer: (
      <>
        Not always.{" "}
        <a
          href="/zero-down-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          Zero down tow truck financing
        </a>{" "}
        is available for qualified operators. A down payment can lower your
        monthly payment, but it\u2019s not required to get started.
      </>
    ),
  },
  {
    question: "What types of tow trucks do you finance?",
    answer: (
      <>
        All of them.{" "}
        <a
          href="/rollback-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          Rollback financing
        </a>
        , wheel-lift wreckers, integrated wreckers,{" "}
        <a
          href="/rotator-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          rotator financing
        </a>
        , Landoll trailers, and specialty equipment. New or used, any
        manufacturer.
      </>
    ),
  },
  {
    question: "Can I finance a truck that\u2019s more than 10 years old?",
    answer:
      "Yes. We have no age or mileage cutoffs. If the truck has value and you have a solid operation, we can work with it. We\u2019ve financed trucks from the early 2000s.",
  },
  {
    question: "How do deferred payments work?",
    answer: (
      <>
        With our{" "}
        <a
          href="/deferred-payment-tow-truck-financing"
          className="font-medium text-[#111111] underline underline-offset-4 transition-colors hover:text-[#DE3341]"
        >
          deferred payment financing
        </a>
        , you make $99 touch payments for up to 180&nbsp;days while your new
        truck ramps up and starts generating revenue. After the deferral period,
        regular payments begin.
      </>
    ),
  },
  {
    question: "Does pre-approval affect my credit score?",
    answer:
      "No. Pre-approval is a soft pull only\u00a0\u2014 it does not appear on your credit report and has zero impact on your score. A hard pull only happens if you decide to move forward with a full application.",
  },
];

export const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: typeof faq.answer === "string" ? faq.answer : faq.question,
    },
  })),
};
