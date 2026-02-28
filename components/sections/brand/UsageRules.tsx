const rules = [
  {
    category: "Logo",
    items: [
      {
        type: "do" as const,
        text: "Use dark logo on white or light gray backgrounds",
      },
      {
        type: "do" as const,
        text: "Use light logo on #101820 or dark surfaces",
      },
      {
        type: "do" as const,
        text: "Maintain minimum clear space equal to the \"T\" height",
      },
      {
        type: "dont" as const,
        text: "Stretch, skew, or rotate the logo",
      },
      {
        type: "dont" as const,
        text: "Recolor the logo — use provided dark or light variants",
      },
      {
        type: "dont" as const,
        text: "Place dark logo on dark backgrounds or light on light",
      },
      {
        type: "dont" as const,
        text: "Add drop shadows, outlines, or effects to the logo",
      },
    ],
  },
  {
    category: "Color",
    items: [
      {
        type: "do" as const,
        text: "Use #22C55E (Green) as an accent color for CTAs and highlights",
      },
      {
        type: "do" as const,
        text: "Use #101820 (Black 6C) as the primary text color — never pure #000000",
      },
      {
        type: "do" as const,
        text: "Use the neutral gray scale for supporting text and borders",
      },
      {
        type: "dont" as const,
        text: "Use pure black (#000000) for text — always use #101820",
      },
      {
        type: "dont" as const,
        text: "Use green as a background for large areas — it is an accent only",
      },
      {
        type: "dont" as const,
        text: "Mix brand greens with off-brand greens or blues",
      },
    ],
  },
  {
    category: "Icons",
    items: [
      {
        type: "do" as const,
        text: "Use dark icons on light backgrounds (white, gray 50-200)",
      },
      {
        type: "do" as const,
        text: "Use light icons on dark backgrounds (#101820, gray 700-900)",
      },
      {
        type: "do" as const,
        text: "Use green icons on white backgrounds only",
      },
      {
        type: "dont" as const,
        text: "Recolor icons — always use the provided variant for each context",
      },
      {
        type: "dont" as const,
        text: "Place green icons on colored or dark backgrounds",
      },
      {
        type: "dont" as const,
        text: "Scale icons below their minimum size (40px for benefit, 80px for trucks)",
      },
    ],
  },
];

export function UsageRules() {
  return (
    <section id="rules" className="bg-[#F5F5F5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-[#101820]">
          Usage Rules
        </h2>
        <p className="mt-3 text-base text-[#545454]">
          Do and don&apos;t guidelines for consistent brand application.
        </p>

        {rules.map((section) => (
          <div key={section.category} className="mt-12">
            <h3 className="text-xl font-medium text-[#101820]">
              {section.category}
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#E9E9E9] ${
                    item.type === "do"
                      ? "border-l-4 border-l-[#22C55E]"
                      : "border-l-4 border-l-[#EF4444]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 text-sm font-semibold uppercase ${
                        item.type === "do"
                          ? "text-[#22C55E]"
                          : "text-[#EF4444]"
                      }`}
                    >
                      {item.type === "do" ? "Do" : "Don\u2019t"}
                    </span>
                    <p className="text-sm text-[#545454]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
