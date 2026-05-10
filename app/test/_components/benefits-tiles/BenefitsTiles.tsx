import {
  SlidersHorizontal,
  Headset,
  BadgePercent,
  Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";

type Tile = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

const TILES: Tile[] = [
  { label: "Choose your own payment", href: "#", Icon: SlidersHorizontal },
  { label: "Best in class customer service", href: "#", Icon: Headset },
  { label: "Early Payoff Options", href: "#", Icon: BadgePercent },
  { label: "Dealership partner program", href: "#", Icon: Handshake },
];

export function BenefitsTiles() {
  return (
    <SectionShell outerClassName="bg-white" innerClassName="py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--t-ink)] mb-6 md:mb-8">
        Tow truck financing made easy
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {TILES.map(({ label, href, Icon }) => (
          <li key={label}>
            <a href={href} className="block group focus:outline-none">
              <div className="aspect-square w-full rounded-2xl bg-[#dcfce7] grid place-items-center transition-colors group-hover:bg-[#bbf7d0]">
                <Icon
                  aria-hidden="true"
                  className="h-12 w-12 md:h-16 md:w-16 text-[var(--t-blue-ink)]"
                />
              </div>
              <span className="mt-3 block text-center text-sm md:text-base font-medium text-[var(--t-ink)] group-hover:underline">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
