"use client";

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
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white transition-colors duration-150 group-hover/nav-item:border-[#D4D4D4] group-hover/nav-item:bg-[#F5F5F5] group-focus/nav-item:border-[#D4D4D4] group-focus/nav-item:bg-[#F5F5F5] group-focus-visible/nav-item:border-[#D4D4D4] group-focus-visible/nav-item:bg-[#F5F5F5]">
        <NavItemVisual item={item} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#111111]">{item.title}</p>
        <p className="text-sm text-[#545454]">{item.description}</p>
      </div>
    </>
  );
}

export function NavDesktopMenu({
  sections,
}: {
  sections: readonly NavSection[];
}) {
  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList className="gap-0.5 xl:gap-1">
        {sections.map((section) => (
          <NavigationMenuItem key={section.value}>
            <NavigationMenuTrigger className="bg-transparent px-3 text-sm font-medium text-[#111111] hover:bg-[#F5F5F5] hover:text-[#111111] focus:bg-[#F5F5F5] data-[state=open]:bg-[#F5F5F5] lg:text-base xl:px-4">
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
                      <NavigationMenuLink
                        asChild
                        className="group/nav-item flex-row items-center justify-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-[#F5F5F5] hover:text-[#111111] focus:bg-[#F5F5F5] focus:text-[#111111] focus-visible:bg-[#F5F5F5]"
                      >
                        <Link href={item.href}>
                          <DropdownItem item={item} />
                        </Link>
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
