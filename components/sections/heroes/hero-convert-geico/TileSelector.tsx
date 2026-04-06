"use client";

import { useState } from "react";
import Link from "next/link";
import { resolvePreApprovalSelectionTrigger } from "@/features/pre-approval/selection";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { SelectionTile } from "./SelectionTile";
import type { HeroConvertConfig, SelectionTileData } from "./config";

interface TileSelectorProps {
  tiles: SelectionTileData[];
  cta: HeroConvertConfig["cta"];
  selectionPrompt: string;
  selectionRequiredMessage: string;
  viewAllLink?: { label: string; href: string };
}

export function TileSelector({
  tiles,
  cta,
  selectionPrompt,
  selectionRequiredMessage,
  viewAllLink,
}: TileSelectorProps) {
  // Initial value MUST be null (not read from URL/localStorage) to avoid hydration mismatch
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const selectedLabel = tiles.find((tile) => tile.id === selectedTile)?.label;
  const preApprovalTrigger = resolvePreApprovalSelectionTrigger(
    cta.preApprovalSelectionTrigger,
    selectedTile,
  );

  return (
    <>
      <p className="text-base font-semibold leading-6 text-[#101820] sm:text-[1.0625rem]">
        {selectionPrompt}
      </p>

      <div
        role="group"
        aria-label="Equipment types"
        className="grid grid-cols-2 gap-2.5 sm:gap-3"
      >
        {tiles.map((tile) => (
          <SelectionTile
            key={tile.id}
            {...tile}
            selected={selectedTile === tile.id}
            onSelect={setSelectedTile}
          />
        ))}
      </div>

      <p
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {selectedLabel
          ? `${selectedLabel} selected. Continue to estimate your financing.`
          : selectionRequiredMessage}
      </p>

      {viewAllLink ? (
        <div className="mt-3">
          <Link
            href={viewAllLink.href}
            prefetch={false}
            className="rounded-sm text-sm text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            {viewAllLink.label}
          </Link>
        </div>
      ) : null}

      {/* Primary CTA */}
      <RippleCtaLink
        href={cta.href}
        label={cta.label}
        preApprovalTrigger={preApprovalTrigger}
        size="md"
        disabled={!selectedTile}
        section="rollback-hero"
        ariaLabel={cta.label}
        className="mt-3 w-full justify-center sm:mt-4 sm:w-auto"
      />
    </>
  );
}
