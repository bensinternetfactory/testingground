"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DevVariantPanelProps {
  currentHero: "quote-start" | "carousel";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DevVariantPanel({
  currentHero,
}: DevVariantPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* ------ Escape key dismiss ------ */
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isExpanded]);

  /* ------ Navigation ------ */
  function selectHero(hero: "quote-start" | "carousel") {
    startTransition(() => {
      if (hero === "quote-start") {
        router.replace(pathname);
      } else {
        router.replace(`${pathname}?hero=${hero}`);
      }
    });
  }

  /* ------ Collapsed pill ------ */
  if (!isExpanded) {
    return (
      <button
        ref={toggleRef}
        onClick={() => setIsExpanded(true)}
        className="fixed right-4 bottom-4 z-[9999] rounded-full bg-black px-4 py-2 text-xs font-medium text-white shadow-lg touch-action-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 motion-safe:transition-transform motion-safe:hover:scale-105"
      >
        DEV: Hero Layout
      </button>
    );
  }

  /* ------ Expanded panel ------ */
  return (
    <div className="fixed right-4 bottom-4 z-[9999] flex w-80 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl motion-safe:animate-in motion-safe:fade-in motion-reduce:animate-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Hero Layout
        </span>
        <button
          ref={toggleRef}
          onClick={() => setIsExpanded(false)}
          className="rounded p-1 text-gray-400 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Close panel"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>

      {/* Hero layout toggle */}
      <div className="px-4 py-3">
        <span className="mb-2 block text-xs text-gray-500">Layout</span>
        <div className="flex gap-1">
          {(["carousel", "quote-start"] as const).map((hero) => (
            <button
              key={hero}
              onClick={() => selectHero(hero)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                currentHero === hero
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } ${isPending ? "opacity-60" : ""}`}
            >
              {hero === "carousel" ? "Carousel" : "Quote Start"}
            </button>
          ))}
        </div>
      </div>

      {/* Pending indicator */}
      {isPending && (
        <div className="border-t border-gray-100 px-4 py-2 text-center text-xs text-gray-400">
          Loading\u2026
        </div>
      )}
    </div>
  );
}
