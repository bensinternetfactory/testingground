"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface FaqItem {
  question: string;
  answer: ReactNode;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#E9E9E9] last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-lg font-medium text-[#101820]">
          {question}
        </span>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? "bg-[#22C55E] text-white" : "bg-[#F5F5F5] text-[#545454]"
          }`}
        >
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-base leading-relaxed text-[#545454]">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-12 rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-8">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
