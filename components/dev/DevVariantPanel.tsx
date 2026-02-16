"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { heroVariantsByAngle } from "@/components/sections/revenue-leak/hero-variants";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type VariantsByAngle = typeof heroVariantsByAngle;

interface DevVariantPanelProps {
  variantsByAngle: VariantsByAngle;
  defaultHeadline: string;
  currentAngle: number | undefined;
  currentVariant: number | undefined;
  currentHero: "quote-start" | "carousel";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DevVariantPanel({
  variantsByAngle,
  defaultHeadline,
  currentAngle,
  currentVariant,
  currentHero,
}: DevVariantPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const angleIds = Object.keys(variantsByAngle).map(Number);
  const activeAngle = currentAngle ?? angleIds[0] ?? 2;
  const variants =
    variantsByAngle[activeAngle as keyof VariantsByAngle] ?? [];

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
      if (hero === "carousel") {
        router.replace(`${pathname}?hero=carousel`);
      } else {
        router.replace(pathname);
      }
    });
  }

  function selectVariant(angle: number, variant: number | null) {
    startTransition(() => {
      const params = new URLSearchParams();
      if (variant !== null) {
        params.set("angle", String(angle));
        params.set("variant", String(variant));
      }
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname);
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
        DEV: Hero Variants
      </button>
    );
  }

  /* ------ Expanded panel ------ */
  return (
    <div className="fixed right-4 bottom-4 z-[9999] flex w-80 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl motion-safe:animate-in motion-safe:fade-in motion-reduce:animate-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Hero Variants
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
      <div className="border-b border-gray-100 px-4 py-2">
        <span className="mb-1 block text-xs text-gray-500">Layout</span>
        <div className="flex gap-1">
          {(["quote-start", "carousel"] as const).map((hero) => (
            <button
              key={hero}
              onClick={() => selectHero(hero)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                currentHero === hero
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } ${isPending ? "opacity-60" : ""}`}
            >
              {hero === "quote-start" ? "Quote Start" : "Carousel"}
            </button>
          ))}
        </div>
      </div>

      {/* Angle selector */}
      {currentHero === "quote-start" && angleIds.length > 1 && (
        <div className="border-b border-gray-100 px-4 py-2">
          <label className="flex items-center gap-2 text-xs text-gray-500">
            Angle
            <select
              value={activeAngle}
              onChange={(e) => selectVariant(Number(e.target.value), null)}
              className="rounded border border-gray-200 bg-white px-2 py-1 text-xs focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {angleIds.map((id) => (
                <option key={id} value={id}>
                  Angle {id}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Variant list (quote-start only) */}
      {currentHero === "quote-start" && (
        <div
          role="radiogroup"
          aria-label="Hero copy variants"
          className="max-h-72 overflow-y-auto p-2"
        >
          {/* Default option */}
          <button
            role="radio"
            aria-checked={currentVariant === undefined}
            onClick={() => selectVariant(activeAngle, null)}
            className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left touch-action-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 ${
              currentVariant === undefined
                ? "bg-black text-white"
                : "hover:bg-gray-50"
            } ${isPending ? "opacity-60" : ""}`}
          >
            <span className="text-xs font-medium">Default (Current)</span>
            <span
              className={`min-w-0 truncate text-xs ${
                currentVariant === undefined ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {defaultHeadline}
            </span>
          </button>

          {/* Variant options */}
          {variants.map((v, i) => (
            <button
              key={i}
              role="radio"
              aria-checked={currentVariant === i}
              onClick={() => selectVariant(activeAngle, i)}
              className={`mt-1 flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left touch-action-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 ${
                currentVariant === i
                  ? "bg-black text-white"
                  : "hover:bg-gray-50"
              } ${isPending ? "opacity-60" : ""}`}
            >
              <span className="text-xs font-medium">{v.name}</span>
              <span
                className={`min-w-0 truncate text-xs ${
                  currentVariant === i ? "text-gray-300" : "text-gray-400"
                }`}
              >
                {v.headline}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Pending indicator */}
      {isPending && (
        <div className="border-t border-gray-100 px-4 py-2 text-center text-xs text-gray-400">
          Loading variant\u2026
        </div>
      )}
    </div>
  );
}
