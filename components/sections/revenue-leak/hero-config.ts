import truck1 from "@/public/truck-1.jpg";
import truck2 from "@/public/truck-2.jpg";
import truck3 from "@/public/truck-3.jpg";
import truck4 from "@/public/truck-4.jpg";
import truck5 from "@/public/truck-5.jpg";
import truck6 from "@/public/truck-6.jpg";
import truck7 from "@/public/truck-7.jpg";
import truck8 from "@/public/truck-8.jpg";
import truck9 from "@/public/truck-9.jpg";
import truck10 from "@/public/truck-10.jpg";
import truck11 from "@/public/truck-11.jpg";
import truck12 from "@/public/truck-12.jpg";
import truck13 from "@/public/truck-13.jpg";
import truck14 from "@/public/truck-14.jpg";
import truck15 from "@/public/truck-15.jpg";

export const HERO_IMAGES = [
  truck1, truck2, truck3, truck4, truck5,
  truck6, truck7, truck8, truck9, truck10,
  truck11, truck12, truck13, truck14, truck15,
];

export const HERO_CONFIG = {
  images: HERO_IMAGES,
  headline: "Easy Tow Truck Financing",
  phrases: ["lower payments", "faster funding", "better experience"],
  cta: {
    label: "See my payment",
    href: "#pre-approve",
    subtext: "Get pre-approved in less than 30 seconds. No credit check",
  },
  tiles: [
    { label: "Rollback Financing", href: "/rollback" },
    { label: "Wrecker Financing", href: "/wrecker" },
    { label: "Rotator Financing", href: "/rotator" },
  ],
} as const;
