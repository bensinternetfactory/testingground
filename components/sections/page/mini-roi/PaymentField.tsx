"use client";

import { formatUSD, parseCurrencyInput } from "./currency";
import { useInlineEditableNumber } from "./useInlineEditableNumber";

interface PaymentFieldProps {
  value: number;
  onCommit: (value: number) => void;
}

function parseDollars(raw: string, fallback: number): number {
  const parsed = parseCurrencyInput(raw);
  if (parsed === null || parsed < 0) return fallback;
  return Math.min(Math.max(parsed, 30), 5000);
}

export function PaymentField({
  value,
  onCommit,
}: PaymentFieldProps) {
  const {
    editing,
    draft,
    inputRef,
    setDraft,
    openEdit,
    commitDraft,
    cancelEdit,
  } = useInlineEditableNumber({ value, onCommit, parse: parseDollars });

  return (
    <div className="flex min-w-[170px] flex-col items-start gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-[#545454]">Payment:</span>
        <div className="relative min-h-8">
          <button
            type="button"
            className={`inline-flex min-h-8 cursor-pointer items-center rounded-md px-1 ${
              editing ? "pointer-events-none opacity-0" : "opacity-100"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]/40`}
            onClick={openEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEdit();
              }
            }}
            aria-label={`Monthly payment ${formatUSD(value)}. Click to edit.`}
          >
            <span className="border-b border-dashed border-gray-400 text-sm font-semibold text-[#101820] [font-variant-numeric:tabular-nums] hover:border-[#22C55E] hover:text-[#15803D]">
              {formatUSD(value)}/mo
            </span>
          </button>

          <form
            className={`absolute inset-0 flex items-center px-1 ${
              editing ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              commitDraft();
              inputRef.current?.blur();
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-semibold leading-none text-[#101820]">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoCorrect="off"
                name="monthlyPayment"
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
                className="w-24 rounded-lg border border-gray-300 bg-white px-2 py-1 text-center text-base font-semibold text-[#101820] [font-variant-numeric:tabular-nums] focus-visible:border-[#22C55E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]/30 md:w-20 md:py-0.5 md:text-sm"
                aria-label="Monthly payment amount"
              />
              <span className="text-sm text-[#545454]">/mo</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { parseDollars };
