import Image from "next/image";
import { NAV_ICON_MAP } from "./nav-icons";
import type { NavCardItem, NavImageCardItem } from "./nav-data";

function getImageClass(item: NavImageCardItem, mobile = false) {
  if (item.imageSrc.includes("truck-icons")) {
    return mobile ? "h-7 w-full px-0.5" : "h-auto w-full px-0.5";
  }

  return mobile ? "h-7 w-auto" : "h-5 w-auto";
}

export function NavItemVisual({
  item,
  mobile = false,
}: {
  item: NavCardItem;
  mobile?: boolean;
}) {
  if (item.kind === "image") {
    return (
      <Image
        src={item.imageSrc}
        alt=""
        width={36}
        height={36}
        className={`${getImageClass(item, mobile)} object-contain`}
      />
    );
  }

  return <span className="text-[#545454]">{NAV_ICON_MAP[item.icon]}</span>;
}
