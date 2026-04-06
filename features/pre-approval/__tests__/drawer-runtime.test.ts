import { describe, expect, it } from "vitest";
import { buildDrawerContinueHref } from "@/components/ui/pre-approval-drawer/triggers";
import {
  createHashOpenPreApprovalTrigger,
  parsePreApprovalTriggerDataset,
} from "@/features/pre-approval/drawer/runtime/parser";
import { createPreApprovalDrawerSession } from "@/features/pre-approval/drawer/runtime/session";

describe("pre-approval drawer runtime compatibility", () => {
  it("normalizes legacy trigger attributes into the canonical trigger contract", () => {
    expect(
      parsePreApprovalTriggerDataset(
        {
          drawerSource: "hero",
          drawerTitle: "Pick your truck",
          drawerTruckType: "heavy-wrecker",
        },
        { pathname: "/wrecker-financing" },
      ),
    ).toEqual({
      compatibilitySource: "hero",
      schema: "legacy",
      trigger: {
        drawer: {
          title: "Pick your truck",
        },
        handoff: {
          truckType: "heavy-wrecker",
        },
        origin: {
          ctaId: "legacy-cta",
          pageId: "wrecker-financing",
          placement: "inline",
          sectionId: "legacy-section",
        },
      },
    });
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
      parsePreApprovalTriggerDataset(
        {
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
        },
        { pathname: "/wrecker-financing" },
      ),
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

  it("keeps malformed legacy data inert while still supporting partial legacy titles", () => {
    expect(
      parsePreApprovalTriggerDataset(
        {
          drawerSource: "invalid",
          drawerTitle: "   ",
          drawerTruckType: "rotator",
        },
        { pathname: "/rollback-financing" },
      ),
    ).toBeUndefined();

    expect(
      parsePreApprovalTriggerDataset(
        {
          drawerTitle: "Estimate your buying power",
        },
        { pathname: "/rollback-financing" },
      ),
    ).toEqual({
      schema: "legacy",
      trigger: {
        drawer: {
          title: "Estimate your buying power",
        },
        origin: {
          ctaId: "legacy-cta",
          pageId: "rollback-financing",
          placement: "inline",
          sectionId: "legacy-section",
        },
      },
    });
  });

  it("preserves the legacy hero truck handoff exactly in the normalized session", () => {
    const session = createPreApprovalDrawerSession(
      {
        source: "hero",
        title: "How much is the truck you found?",
        truckType: "heavy-wrecker",
      },
      { pathname: "/wrecker-financing" },
    );

    expect(session.source).toBe("hero");
    expect(session.heroTruckType).toBe("heavy-wrecker");
    expect(session.truckType).toBe("heavy-wrecker");
    expect(
      buildDrawerContinueHref({
        amount: 155_000,
        heroTruckType: session.heroTruckType,
        source: session.source,
        truckType: session.truckType,
      }),
    ).toBe("/pre-approval?amount=155000&trucktype=heavy-wrecker");
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
