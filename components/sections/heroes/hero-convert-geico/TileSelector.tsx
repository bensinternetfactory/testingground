"use client";

import { useState } from "react";
import Link from "next/link";
import { SelectionTile } from "./SelectionTile";
import type { SelectionTileData } from "./config";

interface TileSelectorProps {
  tiles: SelectionTileData[];
  cta: { label: string; href: string };
  viewAllLink: string;
}

export function TileSelector({ tiles, cta, viewAllLink }: TileSelectorProps) {
  // Initial value MUST be null (not read from URL/localStorage) to avoid hydration mismatch
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const href = selectedTile
    ? `${cta.href}?equipment=${selectedTile}`
    : cta.href;

  return (
    <>
      <div
        role="group"
        aria-label="Equipment types"
        className="grid grid-cols-2 gap-3"
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

      {/* Screen reader announcement for tile selection */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selectedTile
          ? `${tiles.find((t) => t.id === selectedTile)?.label} selected. The Check Your Options button will include this equipment type.`
          : ""}
      </div>

      {/* View all link */}
      <div className="mt-3">
        <Link href="#" className="text-sm text-[#545454] underline">
          {viewAllLink}
        </Link>
      </div>

      {/* Primary CTA */}
      <Link
        href={href}
        className="mt-4 block w-full rounded-full bg-[#111111] px-8 py-4 text-center text-lg font-medium text-white transition-colors duration-200 hover:bg-[#111111]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 sm:w-auto sm:inline-block"
      >
        {cta.label}
      </Link>
    </>
  );
}
