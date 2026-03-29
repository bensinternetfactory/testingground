"use client";

import { useState, useCallback } from "react";

function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
}

export function HeroInput({
  placeholder,
  ctaLabel,
}: {
  placeholder: string;
  ctaLabel: string;
}) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(formatCurrency(e.target.value));
    },
    [],
  );

  return (
    <div className="mx-auto flex w-full max-w-xl items-center rounded-full border border-gray-200 bg-white shadow-sm transition-shadow focus-within:shadow-md">
      {/* Dollar icon */}
      <div className="flex shrink-0 items-center pl-5 text-gray-400">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M14.5 9a3.5 3.5 0 0 0-5 0 2.5 2.5 0 0 0 0 3.5L12 15l2.5 2.5a2.5 2.5 0 0 1-3.5 3.5" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
        </svg>
      </div>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 py-4 text-base text-[#101820] outline-none placeholder:text-gray-400"
        aria-label={placeholder}
      />

      <button
        type="button"
        className="mr-1.5 shrink-0 rounded-full bg-[#22C55E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EA94E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
