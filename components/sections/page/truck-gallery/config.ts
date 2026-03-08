export interface TruckGalleryImage {
  src: string;
  alt: string;
}

export interface TruckGalleryConfig {
  hero: TruckGalleryImage;
  grid: [TruckGalleryImage, TruckGalleryImage, TruckGalleryImage, TruckGalleryImage];
}

export const TRUCK_GALLERY_CONFIG: TruckGalleryConfig = {
  hero: {
    src: "/truck-6.jpg",
    alt: "Black rollback tow truck at a three-quarter angle",
  },
  grid: [
    {
      src: "/truck-3.jpg",
      alt: "Red wrecker tow truck",
    },
    {
      src: "/truck-9.jpg",
      alt: "Blue and green wrecker tow truck",
    },
    {
      src: "/truck-14.jpg",
      alt: "White wrecker tow truck at sunset",
    },
    {
      src: "/truck-15.jpg",
      alt: "Orange rollback tow truck at dusk",
    },
  ],
};

export const TRUCK_GALLERY_CONFIG_ALT: TruckGalleryConfig = {
  hero: {
    src: "/truck-12.jpg",
    alt: "White heavy wrecker parked near industrial bays",
  },
  grid: [
    {
      src: "/truck-1.jpg",
      alt: "Blue rollback tow truck parked at curbside",
    },
    {
      src: "/truck-4.jpg",
      alt: "Black rollback truck staged beside service building",
    },
    {
      src: "/truck-8.jpg",
      alt: "Dual-axle red-and-black wrecker in lot",
    },
    {
      src: "/truck-11.jpg",
      alt: "Blue rollback truck with loading deck raised",
    },
  ],
};
