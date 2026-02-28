"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { brandSections } from "./brand-data";

// ── Dev Details Context ──────────────────────────────────────────────────────

const DevDetailsContext = createContext(false);
export const useDevDetails = () => useContext(DevDetailsContext);

// ── Copy Button ──────────────────────────────────────────────────────────────

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  return (
    <button
      onClick={copy}
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#737373] transition-colors hover:bg-[#F5F5F5] hover:text-[#101820]"
      aria-label={`Copy ${value}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ── Dev Detail Row ───────────────────────────────────────────────────────────

export function DevDetail({ label, value }: { label: string; value: string }) {
  const show = useDevDetails();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="mt-1 flex items-center gap-2 text-xs text-[#737373]">
            <span className="font-medium">{label}:</span>
            <code className="rounded bg-[#F5F5F5] px-1.5 py-0.5 font-mono text-[11px]">
              {value}
            </code>
            <CopyButton value={value} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Brand Client Wrapper ─────────────────────────────────────────────────────

export function BrandClient({ children }: { children: ReactNode }) {
  const [showDev, setShowDev] = useState(false);
  const [activeSection, setActiveSection] = useState("logo");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const section of brandSections) {
      const el = document.getElementById(section.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <DevDetailsContext.Provider value={showDev}>
      {/* Sticky Section Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {brandSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeSection === s.id
                    ? "bg-[#101820] text-white"
                    : "text-[#545454] hover:bg-[#F5F5F5] hover:text-[#101820]"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setShowDev((v) => !v)}
            className={`ml-4 shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              showDev
                ? "border-[#22C55E] bg-[#F0FDF4] text-[#15803D]"
                : "border-[#E5E5E5] text-[#737373] hover:border-[#D4D4D4]"
            }`}
          >
            {showDev ? "Dev Details On" : "Show Dev Details"}
          </button>
        </div>
      </nav>

      {children}
    </DevDetailsContext.Provider>
  );
}
