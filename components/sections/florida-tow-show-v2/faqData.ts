// FAQ data for schema (without JSX) - separate file for server component compatibility
export const faqData = [
  {
    question: "How fast can I get pre-approved for tow truck financing?",
    answer:
      "Most approvals come back same day. Apply now, know your number before the show.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    question: "What credit score do I need for tow truck financing?",
    answer:
      "We work with a range of credit profiles. Startups, established operators, challenging credit — apply and we'll find the right program.",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    question: "Can I finance a used truck from a private seller?",
    answer:
      "Yes. Dealer, auction, or private party — we finance tow trucks from any source.",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    question: "What if I don't find anything at the show?",
    answer:
      "Pre-approval is good for 90 days. Use it at the show, after the show, or not at all. No obligation.",
    iconPath:
      "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    question: "Is this really $0 down tow truck financing?",
    answer:
      "For qualified buyers, yes. $0 down, no payments for up to 180 days. The full offer, not a bait-and-switch.",
    iconPath:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    question: "What types of tow trucks do you finance?",
    answer:
      "Wreckers, rollbacks, flatbeds, rotators — light duty, medium duty, and heavy duty. New truck financing and used tow truck financing available.",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    question: "Do you finance startup tow truck businesses?",
    answer:
      "Yes. We have programs for new operators. Credit history matters more than time in business for most of our programs.",
    iconPath:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
