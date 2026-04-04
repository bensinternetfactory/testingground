import type { ReactNode } from "react";

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#22C55E] ps-5 py-2 text-lg md:text-xl italic leading-relaxed text-[#111]">
      {children}
    </blockquote>
  );
}
