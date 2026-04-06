import { describe, expect, it } from "vitest";
import {
  resolvePreApprovalSelectionTrigger,
  resolvePreApprovalSelectionTruckType,
  rollbackHeroPreApprovalSelectionTrigger,
  usedTowTruckHeroPreApprovalSelectionTrigger,
  wreckerHeroPreApprovalSelectionTrigger,
} from "@/features/pre-approval/selection";

describe("pre-approval tile-selection helpers", () => {
  it("resolves the rollback, wrecker, and used-truck hero mappings to canonical triggers", () => {
    expect(
      resolvePreApprovalSelectionTrigger(
        rollbackHeroPreApprovalSelectionTrigger,
        "light-duty",
      ),
    ).toEqual({
      origin: {
        pageId: "rollback-financing",
        sectionId: "hero-primary",
        ctaId: "hero-main-cta",
        placement: "hero",
      },
      drawer: undefined,
      handoff: {
        truckType: "rollback",
      },
    });

    expect(
      resolvePreApprovalSelectionTrigger(
        wreckerHeroPreApprovalSelectionTrigger,
        "heavy-wrecker",
      ),
    ).toEqual({
      origin: {
        pageId: "wrecker-financing",
        sectionId: "hero-primary",
        ctaId: "hero-main-cta",
        placement: "hero",
      },
      drawer: undefined,
      handoff: {
        truckType: "heavy-wrecker",
      },
    });

    expect(
      resolvePreApprovalSelectionTrigger(
        usedTowTruckHeroPreApprovalSelectionTrigger,
        "rotator",
      ),
    ).toEqual({
      origin: {
        pageId: "used-tow-truck-financing",
        sectionId: "hero-primary",
        ctaId: "hero-main-cta",
        placement: "hero",
      },
      drawer: undefined,
      handoff: {
        truckType: "rotator",
      },
    });
  });

  it("reuses the same tile-to-truck-type resolution rules for unmapped and mapped selections", () => {
    expect(
      resolvePreApprovalSelectionTruckType(
        {
          truckTypeByTileId: {
            "light-duty": "wrecker",
            "heavy-wrecker": "heavy-wrecker",
          },
        },
        "light-duty",
      ),
    ).toBe("wrecker");

    expect(
      resolvePreApprovalSelectionTruckType(
        {
          truckType: "rollback",
        },
        null,
      ),
    ).toBe("rollback");
  });
});
