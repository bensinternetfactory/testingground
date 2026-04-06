import { describe, expect, it } from "vitest";
import {
  buildPreApprovalHref,
  DRAWER_DEFAULT_TITLE,
  DRAWER_FALLBACK_HREF,
  DRAWER_HASH,
  resolveDrawerTriggerHref,
  SLIDER_DEFAULT,
} from "@/components/ui/pre-approval-drawer/config";
import {
  buildDrawerContinueHref,
  buildDrawerTriggerDataAttributes,
  createDrawerSession,
  parseDrawerTriggerDataAttributes,
  resolveSelectionDrawerTrigger,
  ROLLBACK_HERO_DRAWER,
  ROTATOR_HERO_DRAWER,
  USED_TOW_TRUCK_HERO_DRAWER,
  WRECKER_HERO_DRAWER,
} from "@/components/ui/pre-approval-drawer/triggers";

describe("pre-approval drawer helpers", () => {
  it("keeps marketing routes on the same-page drawer hash", () => {
    expect(resolveDrawerTriggerHref("/")).toBe(DRAWER_HASH);
    expect(resolveDrawerTriggerHref("/rollback-financing")).toBe(DRAWER_HASH);
    expect(resolveDrawerTriggerHref("/used-tow-truck-financing")).toBe(
      DRAWER_HASH,
    );
    expect(resolveDrawerTriggerHref("/fleet-financing")).toBe(DRAWER_HASH);
  });

  it("falls back only when pathname is unavailable", () => {
    expect(resolveDrawerTriggerHref(null)).toBe(DRAWER_FALLBACK_HREF);
  });

  it("builds amount-only pre-approval URLs with normalized digits", () => {
    expect(buildPreApprovalHref({ amount: 20_000 })).toBe(
      "/pre-approval?amount=20000",
    );
    expect(buildPreApprovalHref({ amount: "$500,000" })).toBe(
      "/pre-approval?amount=500000",
    );
    expect(buildPreApprovalHref({ amount: "" })).toBe(
      `/pre-approval?amount=${SLIDER_DEFAULT}`,
    );
  });

  it("adds trucktype only for hero-originated drawer sessions", () => {
    expect(
      buildDrawerContinueHref({
        amount: 155_000,
        heroTruckType: "rotator",
        source: "hero",
      }),
    ).toBe("/pre-approval?amount=155000&trucktype=rotator");

    expect(
      buildDrawerContinueHref({
        amount: 155_000,
        heroTruckType: "rollback",
        source: "standard",
      }),
    ).toBe("/pre-approval?amount=155000");
  });

  it("creates a default session with title and amount state", () => {
    expect(createDrawerSession()).toEqual(
      expect.objectContaining({
        amount: SLIDER_DEFAULT,
        isOpen: true,
        origin: {
          ctaId: "legacy-cta",
          pageId: "unknown-page",
          placement: "inline",
          sectionId: "legacy-section",
        },
        source: "standard",
        title: DRAWER_DEFAULT_TITLE,
      }),
    );

    expect(
      createDrawerSession({
        source: "hero",
        title: "How much is the truck you found?",
        truckType: "wrecker",
      }),
    ).toEqual(
      expect.objectContaining({
        amount: SLIDER_DEFAULT,
        heroTruckType: "wrecker",
        isOpen: true,
        origin: {
          ctaId: "legacy-cta",
          pageId: "unknown-page",
          placement: "inline",
          sectionId: "legacy-section",
        },
        source: "hero",
        title: "How much is the truck you found?",
        truckType: "wrecker",
      }),
    );
  });

  it("round-trips drawer trigger metadata through data attributes", () => {
    const attributes = buildDrawerTriggerDataAttributes({
      source: "hero",
      title: "Estimate your buying power",
      truckType: "heavy-wrecker",
    });

    expect(attributes).toEqual({
      "data-drawer-source": "hero",
      "data-drawer-title": "Estimate your buying power",
      "data-drawer-truck-type": "heavy-wrecker",
    });

    expect(
      parseDrawerTriggerDataAttributes({
        drawerSource: attributes["data-drawer-source"],
        drawerTitle: attributes["data-drawer-title"],
        drawerTruckType: attributes["data-drawer-truck-type"],
      }),
    ).toEqual({
      source: "hero",
      title: "Estimate your buying power",
      truckType: "heavy-wrecker",
    });
  });

  it("resolves the approved hero trucktype mappings", () => {
    expect(resolveSelectionDrawerTrigger(ROLLBACK_HERO_DRAWER, "light-duty")).toEqual(
      {
        source: "hero",
        truckType: "rollback",
      },
    );

    expect(
      resolveSelectionDrawerTrigger(WRECKER_HERO_DRAWER, "light-duty"),
    ).toEqual({
      source: "hero",
      truckType: "wrecker",
    });

    expect(
      resolveSelectionDrawerTrigger(WRECKER_HERO_DRAWER, "heavy-wrecker"),
    ).toEqual({
      source: "hero",
      truckType: "heavy-wrecker",
    });

    expect(resolveSelectionDrawerTrigger(ROTATOR_HERO_DRAWER, null)).toEqual({
      source: "hero",
      truckType: "rotator",
    });

    expect(
      resolveSelectionDrawerTrigger(USED_TOW_TRUCK_HERO_DRAWER, "rollback"),
    ).toEqual({
      source: "hero",
      truckType: "rollback",
    });

    expect(
      resolveSelectionDrawerTrigger(USED_TOW_TRUCK_HERO_DRAWER, "wrecker"),
    ).toEqual({
      source: "hero",
      truckType: "wrecker",
    });

    expect(
      resolveSelectionDrawerTrigger(
        USED_TOW_TRUCK_HERO_DRAWER,
        "heavy-wrecker",
      ),
    ).toEqual({
      source: "hero",
      truckType: "heavy-wrecker",
    });

    expect(
      resolveSelectionDrawerTrigger(USED_TOW_TRUCK_HERO_DRAWER, "rotator"),
    ).toEqual({
      source: "hero",
      truckType: "rotator",
    });
  });

  it("keeps non-hero triggers amount-only even when title metadata is present", () => {
    expect(
      resolveSelectionDrawerTrigger(
        {
          title: "Estimate your buying power",
          truckType: "rollback",
        },
        "rollback",
      ),
    ).toEqual({
      title: "Estimate your buying power",
    });
  });
});
