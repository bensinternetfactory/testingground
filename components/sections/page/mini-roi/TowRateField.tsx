"use client";

import { formatUSD, parseCurrencyInput } from "./currency";
import { useInlineEditableNumber } from "./useInlineEditableNumber";

interface TowRateFieldProps {
  value: number;
  onCommit: (value: number) => void;
}

function parseTowRate(raw: string, fallback: number): number {
  const parsed = parseCurrencyInput(raw);
  if (parsed === null || parsed < 1) return fallback;
  return parsed;
}

export function TowRateField({ value, onCommit }: TowRateFieldProps) {
  const {
    editing,
    draft,
    inputRef,
    setDraft,
    openEdit,
    commitDraft,
    cancelEdit,
  } = useInlineEditableNumber({ value, onCommit, parse: parseTowRate });

  return (
    <div className="mx-auto mt-2 h-16 w-[230px]">
      <div className="relative h-full w-full">
        <button
          type="button"
          onClick={openEdit}
          className={`group absolute inset-0 flex cursor-default items-center justify-center gap-2 rounded-lg md:cursor-pointer ${
            editing ? "pointer-events-none opacity-0" : "opacity-100"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]/40`}
          aria-label={`Revenue per tow ${formatUSD(value)}. Click to edit.`}
        >
          <span className="text-5xl font-semibold leading-none text-[#101820] [font-variant-numeric:tabular-nums]">
            {formatUSD(value)}
          </span>
          <svg
            className="h-4 w-4 text-gray-400 opacity-50 transition-opacity md:h-5 md:w-5 md:opacity-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        <form
          className={`absolute inset-0 flex items-center justify-center ${
            editing ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            commitDraft();
            inputRef.current?.blur();
          }}
        >
          <div className="flex items-center justify-center gap-1">
            <span className="text-5xl font-semibold leading-none text-[#101820]">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoCorrect="off"
              name="revenuePerTow"
              autoComplete="off"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBeforeInput={(e) => {
                const inputEvent = e.nativeEvent as InputEvent;
                if (inputEvent.inputType === "insertLineBreak") {
                  e.preventDefault();
                  commitDraft();
                  inputRef.current?.blur();
                }
              }}
              onBlur={commitDraft}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  e.preventDefault();
                  commitDraft();
                  inputRef.current?.blur();
                  return;
                }
                if (e.key === "Escape") cancelEdit();
              }}
              className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-center text-5xl font-semibold leading-none text-[#101820] [font-variant-numeric:tabular-nums] focus-visible:border-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]/30"
              aria-label="Revenue per tow"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export { parseTowRate };
