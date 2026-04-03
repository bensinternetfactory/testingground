import type { StaticImageData } from "next/image";

export interface ContentImageSplitConfig {
  eyebrow: string;
  headline: string;
  body: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  /** @default "gray" */
  background?: "gray" | "white";
}
