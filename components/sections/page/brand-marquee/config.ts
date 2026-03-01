export interface BrandLogo {
  name: string;
  src: string;
  width: number;        // desktop bounding-box width (px)
  height?: number;      // desktop bounding-box height (px); default 44
  filter?: "black";     // default is grayscale; "black" applies brightness-0
}

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "Jerr-Dan", src: "/brand-assets/manufacturers/jerrdan.svg", width: 180 },
  { name: "Ford", src: "/brand-assets/manufacturers/ford.svg", width: 176, height: 88 },
  { name: "Miller Industries", src: "/brand-assets/manufacturers/miller.svg", width: 140 },
  { name: "Peterbilt", src: "/brand-assets/manufacturers/peterbilt.svg", width: 110 },
  { name: "Century", src: "/brand-assets/manufacturers/century.svg", width: 140 },
  { name: "Chevrolet", src: "/brand-assets/manufacturers/chevrolet.svg", width: 160 },
  { name: "Vulcan", src: "/brand-assets/manufacturers/vulcan.svg", width: 110 },
  { name: "International", src: "/brand-assets/manufacturers/international.svg", width: 132, height: 66 },
  { name: "Chevron", src: "/brand-assets/manufacturers/chevron.svg", width: 150 },
  { name: "Western Star", src: "/brand-assets/manufacturers/westernstar.svg", width: 100 },
  { name: "Holmes", src: "/brand-assets/manufacturers/holmes.svg", width: 150 },
  { name: "NRC Industries", src: "/brand-assets/manufacturers/nrc.svg", width: 160, filter: "black" },
  { name: "B&B Industries", src: "/brand-assets/manufacturers/b-and-b.svg", width: 130 },
];
