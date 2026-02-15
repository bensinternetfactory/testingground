import { NavClient } from "./NavClient";
import { NAV_SECTIONS } from "./nav-data";

export function StickyNav() {
  return <NavClient sections={NAV_SECTIONS} />;
}
