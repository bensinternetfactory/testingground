export interface BrandLogo {
  name: string;
  src: string;
  width: number;        // desktop bounding-box width (px)
  height?: number;      // desktop bounding-box height (px); default 66
  opacity?: number;     // 0–1, default 1; fine-tune visual weight at white
  native?: boolean;     // true = already white SVG, skip CSS filter
}

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "Jerr-Dan", src: "/brand-assets/manufacturers/jerrdan.svg", width: 270, height: 66 },
  { name: "Ford", src: "/brand-assets/manufacturers/ford.svg", width: 264, height: 132 },
  { name: "Miller Industries", src: "/brand-assets/manufacturers/miller.svg", width: 210, height: 66 },
  { name: "Peterbilt", src: "/brand-assets/manufacturers/peterbilt-white.svg", width: 165, height: 66, native: true },
  { name: "Century", src: "/brand-assets/manufacturers/century.svg", width: 210, height: 66 },
  { name: "Chevrolet", src: "/brand-assets/manufacturers/chevrolet.svg", width: 240, height: 66 },
  { name: "Vulcan", src: "/brand-assets/manufacturers/vulcan.svg", width: 165, height: 66 },
  { name: "International", src: "/brand-assets/manufacturers/international-white.svg", width: 198, height: 99, native: true },
  { name: "Chevron", src: "/brand-assets/manufacturers/chevron.svg", width: 225, height: 66 },
  { name: "Western Star", src: "/brand-assets/manufacturers/westernstar.svg", width: 150, height: 66 },
  { name: "Holmes", src: "/brand-assets/manufacturers/holmes.svg", width: 225, height: 66 },
  { name: "NRC Industries", src: "/brand-assets/manufacturers/nrc.svg", width: 240, height: 66 },
  { name: "B&B Industries", src: "/brand-assets/manufacturers/b-and-b.svg", width: 195, height: 66 },
];
