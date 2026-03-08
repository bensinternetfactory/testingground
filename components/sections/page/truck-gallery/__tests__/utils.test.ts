import { describe, expect, it } from "vitest";
import { MAX_GRID_IMAGES, normalizeGridImages } from "../utils";

describe("normalizeGridImages", () => {
  it("returns empty array for non-array input", () => {
    expect(normalizeGridImages(null)).toEqual([]);
    expect(normalizeGridImages(undefined)).toEqual([]);
    expect(normalizeGridImages({})).toEqual([]);
  });

  it("filters invalid entries and preserves valid entries", () => {
    const result = normalizeGridImages([
      { src: "/truck-1.jpg", alt: "Truck 1" },
      { src: "/truck-2.jpg" },
      "bad",
      { src: "/truck-3.jpg", alt: "Truck 3" },
    ]);

    expect(result).toEqual([
      { src: "/truck-1.jpg", alt: "Truck 1" },
      { src: "/truck-3.jpg", alt: "Truck 3" },
    ]);
  });

  it("clamps output to MAX_GRID_IMAGES", () => {
    const result = normalizeGridImages([
      { src: "/truck-1.jpg", alt: "Truck 1" },
      { src: "/truck-2.jpg", alt: "Truck 2" },
      { src: "/truck-3.jpg", alt: "Truck 3" },
      { src: "/truck-4.jpg", alt: "Truck 4" },
      { src: "/truck-5.jpg", alt: "Truck 5" },
    ]);

    expect(result).toHaveLength(MAX_GRID_IMAGES);
    expect(result.map((image) => image.src)).toEqual([
      "/truck-1.jpg",
      "/truck-2.jpg",
      "/truck-3.jpg",
      "/truck-4.jpg",
    ]);
  });
});
