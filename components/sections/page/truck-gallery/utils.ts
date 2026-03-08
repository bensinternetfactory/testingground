import type { TruckGalleryImage } from "./config";

export const MAX_GRID_IMAGES = 4;

function isTruckGalleryImage(value: unknown): value is TruckGalleryImage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const image = value as Partial<TruckGalleryImage>;
  return typeof image.src === "string" && typeof image.alt === "string";
}

export function normalizeGridImages(grid: unknown): TruckGalleryImage[] {
  if (!Array.isArray(grid)) {
    return [];
  }

  return grid.filter(isTruckGalleryImage).slice(0, MAX_GRID_IMAGES);
}
