"use client";

import { useState } from "react";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import type { HeroConvertConfig } from "@/components/sections/heroes/hero-convert-geico";
import { cn } from "@/lib/utils";

interface RollbackFinancingPreviewHeroSelectorProps {
  tiles: HeroConvertConfig["tiles"];
  cta: HeroConvertConfig["cta"];
  selectionPrompt: HeroConvertConfig["selectionPrompt"];
  selectionRequiredMessage: HeroConvertConfig["selectionRequiredMessage"];
}

export function RollbackFinancingPreviewHeroSelector({
  tiles,
  cta,
  selectionPrompt,
  selectionRequiredMessage,
}: RollbackFinancingPreviewHeroSelectorProps) {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const selectedLabel = tiles.find((tile) => tile.id === selectedTile)?.label;

  return (
    <div className="rounded-[2rem] border border-[#D8E4DC] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(16,24,32,0.35)] sm:p-5">
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#1A7F4B]">
          Framed Selector Deck
        </p>
        <p className="text-sm font-medium leading-6 text-[#101820] sm:text-base">
          {selectionPrompt}
        </p>
      </div>

      <div
        role="group"
        aria-label="Equipment types"
        className="mt-4 grid gap-3 md:grid-cols-2"
      >
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            aria-pressed={selectedTile === tile.id}
            aria-label={tile.label}
            onClick={() => setSelectedTile(tile.id)}
            className={cn(
              "group flex min-h-[8.75rem] flex-col items-start justify-between rounded-[1.5rem] border p-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:min-h-[9.5rem] sm:p-5",
              selectedTile === tile.id
                ? "border-[#22C55E] bg-[#F2FBF5] shadow-[0_16px_35px_-28px_rgba(34,197,94,0.8)]"
                : "border-[#D8E4DC] bg-[#FCFDFC] hover:border-[#86D7A3] hover:bg-white hover:shadow-[0_18px_40px_-34px_rgba(16,24,32,0.45)]",
            )}
          >
            <span className="flex min-h-[4.75rem] w-full items-center justify-center rounded-[1.2rem] bg-[linear-gradient(180deg,#FFFFFF_0%,#F4FBF6_100%)] px-4 py-4">
              <span
                className={cn(
                  "pointer-events-none shrink-0 transition-transform duration-200",
                  selectedTile === tile.id ? "scale-[1.04]" : "group-hover:scale-[1.02]",
                )}
                aria-hidden="true"
              >
                {tile.icon}
              </span>
            </span>

            <span className="mt-4 text-pretty text-base font-semibold leading-5 text-[#101820] sm:text-[1.0625rem]">
              {tile.label}
            </span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {selectedLabel
          ? `${selectedLabel} selected. Continue to estimate your financing.`
          : selectionRequiredMessage}
      </p>

      <div className="mt-5">
        <RippleCtaLink
          href={cta.href === DRAWER_HASH ? DRAWER_HASH : cta.href}
          label={cta.label}
          size="md"
          disabled={!selectedTile}
          section="rollback-preview-hero"
          ariaLabel={cta.label}
          className="w-full justify-center md:w-auto"
        />
      </div>
    </div>
  );
}
