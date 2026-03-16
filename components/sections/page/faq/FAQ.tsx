"use client";

import Link from "next/link";
import { useState } from "react";
import type { FaqContentPart, FaqItemData } from "./config";

function InlineLink({ href, children }: { href: string; children: string }) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        prefetch={false}
        className="rounded-sm font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className="rounded-sm font-medium text-[#101820] underline underline-offset-4 transition-colors hover:text-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

function RichAnswer({ content }: { content: FaqContentPart[] }) {
  return (
    <>
      {content.map((part, index) => {
        if (part.type === "link") {
          return (
            <InlineLink key={`${part.href}-${index}`} href={part.href}>
              {part.value}
            </InlineLink>
          );
        }

        return <span key={`${part.value}-${index}`}>{part.value}</span>;
      })}
    </>
  );
}

function AccordionItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: FaqItemData;
  isOpen: boolean;
  onClick: () => void;
}) {
  const buttonId = `${faq.id}-button`;
  const panelId = `${faq.id}-panel`;

  return (
    <div className="border-b border-[#E9E9E9] last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        onClick={onClick}
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="min-w-0 pr-4 text-lg font-medium text-[#101820]">
          {faq.question}
        </span>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? "bg-[#22C55E] text-white" : "bg-[#F5F5F5] text-[#545454]"
          }`}
          aria-hidden="true"
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
        className={`grid overflow-hidden transition-[grid-template-rows,padding-bottom] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          id={panelId}
          role={isOpen ? "region" : undefined}
          aria-labelledby={isOpen ? buttonId : undefined}
          className="min-h-0"
          inert={!isOpen}
        >
          <p className="text-base leading-relaxed text-[#545454]">
            <RichAnswer content={faq.answerContent} />
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ faqs }: { faqs: FaqItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-12 rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#E9E9E9] md:p-8">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={faq.id}
          faq={faq}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
