"use client";

import { useEffect, useState } from "react";
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
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A3A3A]">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const indexLabel = String(index + 1).padStart(2, "0");

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-3 rounded-sm py-1 pr-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] ${
                  isActive
                    ? "text-[#111] font-semibold"
                    : "text-[#3A3A3A] hover:text-[#111]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 flex-none items-center justify-center"
                >
                  {isActive ? (
                    <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                  ) : (
                    <span className="text-xs font-semibold tabular-nums text-[#3A3A3A]">
                      {indexLabel}
                    </span>
                  )}
                </span>
                <span className="min-w-0">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
