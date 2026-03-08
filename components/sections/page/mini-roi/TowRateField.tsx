"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface TowRateFieldProps {
  value: number;
  onCommit: (value: number) => void;
}

function fmtDollars(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function parseTowRate(raw: string, fallback: number): number {
  const cleaned = raw.replace(/[$,\s]/g, "");
  const parsed = parseFloat(cleaned);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return parsed;
}

export function TowRateField({ value, onCommit }: TowRateFieldProps) {
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
    const parsed = parseTowRate(liveValue, value);
    onCommit(parsed);
    setEditing(false);
  }, [draft, value, onCommit]);

  const cancelEdit = useCallback(() => {
    committedRef.current = true; // prevent blur from committing
    setEditing(false);
  }, []);

  return (
    <div className="mx-auto mt-2 h-16 w-[230px]">
      <div className="relative h-full w-full">
        <button
          type="button"
          onClick={openEdit}
          className={`group absolute inset-0 flex items-center justify-center gap-2 ${
            editing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label={`Revenue per tow ${fmtDollars(value)}. Click to edit.`}
        >
          <span className="text-5xl font-semibold leading-none text-[#101820] [font-variant-numeric:tabular-nums]">
            {fmtDollars(value)}
          </span>
          <svg
            className="h-5 w-5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
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
              className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-center text-5xl font-semibold leading-none text-[#101820] [font-variant-numeric:tabular-nums] focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30"
              aria-label="Revenue per tow"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
