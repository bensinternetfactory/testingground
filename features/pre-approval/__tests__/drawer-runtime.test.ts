import { describe, expect, it } from "vitest";
import { buildPreApprovalHref } from "@/features/pre-approval/routes";
import {
  createHashOpenPreApprovalTrigger,
  parsePreApprovalTriggerDataset,
} from "@/features/pre-approval/drawer/runtime/parser";
import { createPreApprovalDrawerSession } from "@/features/pre-approval/drawer/runtime/session";

describe("pre-approval drawer runtime", () => {
  it("ignores legacy trigger attributes once the canonical-only parser is active", () => {
    expect(
      parsePreApprovalTriggerDataset({
        drawerSource: "hero",
        drawerTitle: "Pick your truck",
        drawerTruckType: "heavy-wrecker",
      }),
    ).toBeUndefined();
  });

  it("normalizes the new production trigger attributes into the canonical trigger contract", () => {
    expect(
      parsePreApprovalTriggerDataset({
        preApprovalVersion: "2",
        preApprovalOriginPageId: "rollback-financing",
        preApprovalOriginSectionId: "hero-primary",
        preApprovalOriginCtaId: "hero-main-cta",
        preApprovalOriginPlacement: "hero",
        preApprovalDrawerTitle: "How much financing do you need?",
        preApprovalHandoffTruckType: "rollback",
      }),
    ).toEqual({
      schema: "production",
      trigger: {
        drawer: {
          title: "How much financing do you need?",
        },
        handoff: {
          truckType: "rollback",
        },
        origin: {
          ctaId: "hero-main-cta",
          pageId: "rollback-financing",
          placement: "hero",
          sectionId: "hero-primary",
        },
      },
    });
  });

  it("gives the new schema precedence when both schemas are present", () => {
    expect(
      parsePreApprovalTriggerDataset({
        drawerSource: "hero",
        drawerTitle: "Legacy Title",
        drawerTruckType: "wrecker",
        preApprovalVersion: "2",
        preApprovalOriginPageId: "rollback-financing",
        preApprovalOriginSectionId: "hero-primary",
        preApprovalOriginCtaId: "hero-main-cta",
        preApprovalOriginPlacement: "section",
        preApprovalDrawerTitle: "Production Title",
        preApprovalHandoffTruckType: "rollback",
      }),
    ).toEqual({
      schema: "production",
      trigger: {
        drawer: {
          title: "Production Title",
        },
        handoff: {
          truckType: "rollback",
        },
        origin: {
          ctaId: "hero-main-cta",
          pageId: "rollback-financing",
          placement: "section",
          sectionId: "hero-primary",
        },
      },
    });
  });

  it("keeps malformed or legacy-only datasets inert", () => {
    expect(
      parsePreApprovalTriggerDataset({
        drawerSource: "invalid",
        drawerTitle: "   ",
        drawerTruckType: "rotator",
      }),
    ).toBeUndefined();

    expect(
      parsePreApprovalTriggerDataset({
        drawerTitle: "Estimate your buying power",
      }),
    ).toBeUndefined();
  });

  it("builds canonical session state directly from a production trigger", () => {
    const session = createPreApprovalDrawerSession(
      {
        origin: {
          pageId: "wrecker-financing",
          sectionId: "hero-primary",
          ctaId: "hero-main-cta",
          placement: "hero",
        },
        drawer: {
          title: "How much is the truck you found?",
        },
        handoff: {
          truckType: "heavy-wrecker",
        },
      },
      { pathname: "/wrecker-financing" },
    );

    expect(session.origin).toEqual({
      ctaId: "hero-main-cta",
      pageId: "wrecker-financing",
      placement: "hero",
      sectionId: "hero-primary",
    });
    expect(session.title).toBe("How much is the truck you found?");
    expect(session.truckType).toBe("heavy-wrecker");
    expect(buildPreApprovalHref({ amount: 155_000, truckType: session.truckType })).toBe(
      "/pre-approval?amount=155000&trucktype=heavy-wrecker",
    );
  });

  it("creates the required compatibility origin for non-click hash opens", () => {
    expect(createHashOpenPreApprovalTrigger("/rollback-financing")).toEqual({
      schema: "hash",
      trigger: {
        origin: {
          ctaId: "direct-url",
          pageId: "rollback-financing",
          placement: "inline",
          sectionId: "hash-entry",
        },
      },
    });
  });
});
