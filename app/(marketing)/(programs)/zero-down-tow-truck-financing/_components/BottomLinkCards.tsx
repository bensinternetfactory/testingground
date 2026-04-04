import type { BottomLinkGroupsConfig } from "../config";
import { NavCardLink } from "./NavCardLink";

export function BottomLinkCards({ config }: { config: BottomLinkGroupsConfig }) {
  return (
    <section className="bg-white py-16 2xl:mx-auto 2xl:max-w-screen-2xl 2xl:overflow-hidden 2xl:border-x 2xl:border-gray-200">
      <div className="mx-auto max-w-7xl space-y-10 px-6">
        {config.groups.map((group) => (
          <div key={group.label}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A3A3A]">
              {group.label}
            </p>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <NavCardLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
