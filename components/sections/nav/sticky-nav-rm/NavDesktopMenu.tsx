import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavItemVisual } from "./NavItemVisual";
import type { NavCardItem, NavSection } from "./nav-data";

function DropdownItem({ item }: { item: NavCardItem }) {
  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-150"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white transition-colors duration-150 group-hover:border-[#D4D4D4] group-hover:bg-[#F5F5F5]">
        <NavItemVisual item={item} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#111111]">{item.title}</p>
        <p className="text-sm text-[#545454]">{item.description}</p>
      </div>
    </Link>
  );
}

export function NavDesktopMenu({
  sections,
}: {
  sections: readonly NavSection[];
}) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-0.5 xl:gap-1">
        {sections.map((section) => (
          <NavigationMenuItem key={section.value}>
            <NavigationMenuTrigger className="bg-transparent px-3 text-sm font-medium text-[#111111] hover:bg-transparent hover:text-[#111111]/70 focus:bg-transparent data-[state=open]:bg-[#F5F5F5] lg:text-base xl:px-4">
              {section.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-0">
              <div className="relative">
                <div
                  className="absolute top-0 left-6 -translate-y-full"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderBottom: "8px solid white",
                  }}
                />
                <ul className="w-[320px] p-2">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild className="hover:bg-transparent focus:bg-transparent">
                        <DropdownItem item={item} />
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
