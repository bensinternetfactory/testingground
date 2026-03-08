"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface PaymentFieldProps {
  value: number;
  isManual: boolean;
  onCommit: (value: number) => void;
  onReset: () => void;
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
  isManual,
  onCommit,
  onReset,
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
        <div className="relative h-6 min-w-[112px]">
          <span
            className={`absolute inset-0 cursor-pointer border-b border-dashed border-gray-400 text-sm font-semibold text-[#101820] [font-variant-numeric:tabular-nums] hover:border-[#22C55E] hover:text-[#15803D] ${
              editing ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            role="button"
            tabIndex={0}
            onClick={openEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEdit();
              }
            }}
            aria-label={`Monthly payment ${fmtDollars(value)}. Click to edit.`}
          >
            {fmtDollars(value)}/mo
          </span>

          <form
            className={`absolute inset-0 ${
              editing ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              commitDraft();
              inputRef.current?.blur();
            }}
          >
            <div className="flex items-center gap-1">
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
                className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-0.5 text-center text-sm font-semibold text-[#101820] [font-variant-numeric:tabular-nums] focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30"
                aria-label="Monthly payment amount"
              />
              <span className="text-sm text-[#545454]">/mo</span>
            </div>
          </form>
        </div>
      </div>

      <div className="h-4">
        <button
          type="button"
          onClick={onReset}
          className={`text-xs text-[#545454] underline decoration-dotted underline-offset-2 hover:text-[#101820] ${
            isManual ? "" : "pointer-events-none invisible"
          }`}
        >
          Use estimated payment
        </button>
      </div>
    </div>
  );
}
