"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "../config";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="rounded-3xl bg-white p-5 text-sm shadow-[inset_0_0_0_1px_#E9E9E9]"
    >
      <p className="mb-4 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#545454]">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const indexLabel = String(index + 1).padStart(2, "0");

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  isActive
                    ? "bg-[#F5F5F5] text-[#111] shadow-[inset_0_0_0_1px_#E9E9E9]"
                    : "text-[#3A3A3A] hover:bg-[#F5F5F5] hover:text-[#111]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 flex-none items-center justify-center rounded-full text-[11px] font-semibold tabular-nums transition-colors",
                    isActive
                      ? "bg-[#22C55E] text-white"
                      : "bg-[#F5F5F5] text-[#545454] shadow-[inset_0_0_0_1px_#E9E9E9]",
                  )}
                >
                  {indexLabel}
                </span>
                <span className="min-w-0 text-[15px] font-medium leading-snug">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
