"use client";

import { DevDetail } from "./BrandClient";

const buttons = [
  {
    label: "Primary",
    classes: "rounded-full bg-[#101820] text-white px-8 py-3 text-sm font-medium",
    tailwind: "rounded-full bg-[#101820] text-white px-8 py-3",
    usage: "Main CTAs",
  },
  {
    label: "Accent",
    classes: "rounded-full bg-[#22C55E] text-white px-8 py-3 text-sm font-medium",
    tailwind: "rounded-full bg-[#22C55E] text-white px-8 py-3",
    usage: "High-emphasis CTAs",
  },
  {
    label: "Outline",
    classes: "rounded-full border border-[#101820] text-[#101820] px-8 py-3 text-sm font-medium",
    tailwind: "rounded-full border border-[#101820] px-8 py-3",
    usage: "Secondary actions",
  },
  {
    label: "Ghost + Arrow",
    classes: "inline-flex items-center gap-2 text-sm font-medium text-[#101820]",
    tailwind: "inline-flex items-center gap-2 font-medium",
    usage: "Text links with arrow",
    isGhost: true,
  },
];

export function ButtonPatterns() {
  return (
    <section id="buttons" className="bg-[#F5F5F5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Button Patterns
        </h2>

        {/* Light background buttons */}
        <div className="mt-12 rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9]">
          <p className="text-sm font-medium uppercase tracking-wider text-[#737373]">
            On Light Background
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {buttons.map((b) => (
              <div key={b.label} className="flex flex-col items-start gap-2">
                <button className={b.classes}>
                  {b.label}
                  {b.isGhost && (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-xs text-[#A3A3A3]">{b.usage}</span>
                <DevDetail label="Classes" value={b.tailwind} />
              </div>
            ))}
          </div>
        </div>

        {/* Dark background buttons */}
        <div className="mt-6 rounded-3xl bg-[#101820] p-8 shadow-[inset_0_0_0_1px_#E5E5E5]">
          <p className="text-sm font-medium uppercase tracking-wider text-white/50">
            On Dark Background
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-start gap-2">
              <button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-[#101820]">
                Inverted
              </button>
              <span className="text-xs text-white/40">On dark backgrounds</span>
              <DevDetail
                label="Classes"
                value="rounded-full bg-white text-[#101820] px-8 py-3"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <button className="rounded-full bg-[#22C55E] px-8 py-3 text-sm font-medium text-white">
                Accent
              </button>
              <span className="text-xs text-white/40">
                Green on dark
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <button className="rounded-full border border-white/30 px-8 py-3 text-sm font-medium text-white">
                Outline
              </button>
              <span className="text-xs text-white/40">
                Outline on dark
              </span>
            </div>
          </div>
        </div>

        {/* Card Pattern Demo */}
        <h3 className="mt-16 text-xl font-medium text-[#101820]">
          Card Pattern
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {["Pre-Approved by Tomorrow", "New & Used Equipment", "Fleet Growth Programs"].map(
            (title) => (
              <div
                key={title}
                className="group rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FDF4] text-[#22C55E]">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="mt-6 text-xl font-medium text-[#101820]">
                  {title}
                </h4>
                <p className="mt-3 text-base leading-relaxed text-[#545454]">
                  Inset border card with hover shadow lift. Uses rounded-3xl and
                  consistent 32px padding.
                </p>
              </div>
            )
          )}
        </div>
        <DevDetail
          label="Card classes"
          value="rounded-3xl bg-white p-8 shadow-[inset_0_0_0_1px_#E9E9E9] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
        />
      </div>
    </section>
  );
}
