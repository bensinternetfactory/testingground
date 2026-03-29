"use client";

import { useState, useCallback } from "react";
import { CircleDollarSign } from "lucide-react";

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
      <div className="flex shrink-0 items-center pl-5 text-gray-400">
        <CircleDollarSign className="h-5 w-5" aria-hidden="true" />
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
        className="mr-1.5 shrink-0 cursor-pointer rounded-full bg-[#22C55E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EA94E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
