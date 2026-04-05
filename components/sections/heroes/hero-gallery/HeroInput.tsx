"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CircleDollarSign } from "lucide-react";
import { buildPreApprovalHref } from "@/components/ui/pre-approval-drawer";

function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return "$" + Number(digits).toLocaleString("en-US");
}

interface HeroInputProps {
  placeholder: string;
  ctaLabel: string;
  submitHref?: string;
  onSubmit?: (amount: string) => void;
}

export function HeroInput({
  placeholder,
  ctaLabel,
  submitHref,
  onSubmit,
}: HeroInputProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(formatCurrency(e.target.value));
    },
    [],
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const rawDigits = value.replace(/\D/g, "");
      if (!rawDigits) return;
      if (onSubmit) {
        onSubmit(rawDigits);
      } else if (submitHref) {
        router.push(buildPreApprovalHref({ amount: rawDigits }));
      }
    },
    [value, onSubmit, submitHref, router],
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto flex w-full max-w-xl items-center rounded-full border border-gray-200 bg-white shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-[#22C55E] focus-within:ring-offset-2"
    >
      <label htmlFor="hero-amount" className="sr-only">
        Loan amount
      </label>

      <div className="flex shrink-0 items-center pl-5 text-gray-400">
        <CircleDollarSign className="h-5 w-5" aria-hidden="true" />
      </div>

      <input
        id="hero-amount"
        name="amount"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 py-4 text-base text-[#101820] outline-none placeholder:text-gray-400"
        aria-label={placeholder}
      />

      <button
        type="submit"
        className="mr-1.5 shrink-0 cursor-pointer rounded-full bg-[#22C55E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EA94E] focus-visible:outline-none"
      >
        {ctaLabel}
      </button>
    </form>
  );
}
