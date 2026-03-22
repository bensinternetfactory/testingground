"use client";

import { useMemo } from "react";
import type { CountdownConfig } from "./config";

function computeDaysRemaining(
  anchorDate: string,
  initialWindowDays: number,
  autoReset: boolean,
): number {
  const anchor = new Date(anchorDate);
  const now = new Date();

  const anchorMs = Date.UTC(
    anchor.getUTCFullYear(),
    anchor.getUTCMonth(),
    anchor.getUTCDate(),
  );
  const todayMs = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const diffDays = Math.floor((todayMs - anchorMs) / 86_400_000);

  if (diffDays < 0) return initialWindowDays;
  if (diffDays < initialWindowDays) return initialWindowDays - diffDays;
  if (!autoReset) return 0;

  // Auto-reset: 30-day cycles after the initial window expires
  const daysAfterInitial = diffDays - initialWindowDays;
  return 30 - (daysAfterInitial % 30);
}

export function CountdownChip({ config }: { config: CountdownConfig }) {
  const daysRemaining = useMemo(
    () =>
      computeDaysRemaining(
        config.anchorDate,
        config.initialWindowDays,
        config.autoReset,
      ),
    [config.anchorDate, config.initialWindowDays, config.autoReset],
  );

  if (daysRemaining <= 0) return null;

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs font-medium text-[#545454]">
      <span
        className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"
        aria-hidden="true"
      />
      Offer expires in {daysRemaining} day{daysRemaining === 1 ? "" : "s"}
    </span>
  );
}
