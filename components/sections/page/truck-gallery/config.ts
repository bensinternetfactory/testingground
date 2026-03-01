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
