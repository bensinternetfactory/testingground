"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface PaymentFieldProps {
  value: number;
  onCommit: (value: number) => void;
}

function fmtDollars(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function parseDollars(raw: string, fallback: number): number {
  const cleaned = raw.replace(/[$,\s]/g, "");
  const parsed = parseFloat(cleaned);
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  return Math.min(Math.max(parsed, 30), 5000);
}

export function PaymentField({
  value,
  onCommit,
}: PaymentFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const committedRef = useRef(false);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      committedRef.current = false;
    }
  }, [editing]);

  const openEdit = useCallback(() => {
    setDraft(String(value));
    setEditing(true);
  }, [value]);

  const commitDraft = useCallback(() => {
    // Guard against double-commit (form submit + blur both fire)
    if (committedRef.current) return;
    committedRef.current = true;
    const liveValue = inputRef.current?.value ?? draft;
    const parsed = parseDollars(liveValue, value);
    onCommit(parsed);
    setEditing(false);
  }, [draft, value, onCommit]);

  const cancelEdit = useCallback(() => {
    committedRef.current = true; // prevent blur from committing
    setEditing(false);
  }, []);

  return (
    <div className="flex min-w-[170px] flex-col items-start gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-[#545454]">Payment:</span>
        <div className="relative min-h-8">
          <button
            type="button"
            className={`inline-flex min-h-8 cursor-pointer items-center px-1 ${
              editing ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            onClick={openEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEdit();
              }
            }}
            aria-label={`Monthly payment ${fmtDollars(value)}. Click to edit.`}
          >
            <span className="border-b border-dashed border-gray-400 text-sm font-semibold text-[#101820] [font-variant-numeric:tabular-nums] hover:border-[#22C55E] hover:text-[#15803D]">
              {fmtDollars(value)}/mo
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
                className="w-24 rounded-lg border border-gray-300 bg-white px-2 py-1 text-center text-base font-semibold text-[#101820] [font-variant-numeric:tabular-nums] focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 md:w-20 md:py-0.5 md:text-sm"
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
