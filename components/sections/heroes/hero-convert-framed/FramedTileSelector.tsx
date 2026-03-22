"use client";

import { useState } from "react";
import Link from "next/link";
import { DRAWER_HASH } from "@/components/ui/pre-approval-drawer";
import { RippleCtaLink } from "@/components/ui/ripple-cta-link";
import { FramedSelectionTile } from "./FramedSelectionTile";

export interface FramedHeroTileData {
  id: string;
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
}

interface FramedTileSelectorProps {
  tiles: FramedHeroTileData[];
  cta: { label: string; href: string };
  selectionPrompt: string;
  selectionRequiredMessage: string;
  viewAllLink?: { label: string; href: string };
  section?: string;
}

export function FramedTileSelector({
  tiles,
  cta,
  selectionPrompt,
  selectionRequiredMessage,
  viewAllLink,
  section = "equipment-hero",
}: FramedTileSelectorProps) {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const selectedLabel = tiles.find((tile) => tile.id === selectedTile)?.label;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#E9E9E9] bg-white p-5 shadow-sm sm:gap-5 sm:p-8">
      <p className="text-base font-semibold leading-6 text-[#101820] sm:text-[1.0625rem]">
        {selectionPrompt}
      </p>

      <div
        role="group"
        aria-label="Equipment types"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
      >
        {tiles.map((tile) => (
          <FramedSelectionTile
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
        <div>
          <Link
            href={viewAllLink.href}
            prefetch={false}
            className="rounded-sm text-sm text-[#545454] underline underline-offset-4 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            {viewAllLink.label}
          </Link>
        </div>
      ) : null}

      <RippleCtaLink
        href={cta.href === DRAWER_HASH ? DRAWER_HASH : cta.href}
        label={cta.label}
        size="md"
        disabled={!selectedTile}
        section={section}
        ariaLabel={cta.label}
        className="mt-1 w-full justify-center sm:mt-1 sm:w-auto"
      />
    </div>
  );
}
