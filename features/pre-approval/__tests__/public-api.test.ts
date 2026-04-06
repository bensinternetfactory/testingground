import { describe, expect, it } from "vitest";
import {
  preApprovalAmountStep,
  preApprovalDefaultAmount,
  preApprovalDefaultTitle,
  preApprovalMaxAmount,
  preApprovalMinAmount,
  type PreApprovalTrigger,
} from "@/features/pre-approval/contract";
import {
  buildPreApprovalHref,
  normalizePreApprovalAmount,
  parsePreApprovalSearchParams,
  preApprovalPath,
} from "@/features/pre-approval/routes";
import {
  buildPreApprovalEntryHref,
  buildPreApprovalTriggerAttributes,
  preApprovalEntryHash,
  preApprovalFallbackEntryHref,
} from "@/features/pre-approval/drawer/server";

describe("pre-approval feature public modules", () => {
  it("preserves the current amount defaults and slider constraints", () => {
    expect(preApprovalMinAmount).toBe(20_000);
    expect(preApprovalMaxAmount).toBe(500_000);
    expect(preApprovalAmountStep).toBe(5_000);
    expect(preApprovalDefaultAmount).toBe(100_000);
    expect(preApprovalDefaultTitle).toBe(
      "Estimate how much financing you need.",
    );
  });

  it("builds and parses pre-approval hrefs with the current normalization rules", () => {
    expect(preApprovalPath).toBe("/pre-approval");
    expect(normalizePreApprovalAmount("$5,000")).toBe("20000");
    expect(normalizePreApprovalAmount("$500,000")).toBe("500000");
    expect(normalizePreApprovalAmount("$999,000")).toBe("500000");
    expect(normalizePreApprovalAmount("")).toBe("100000");
    expect(
      buildPreApprovalHref({ amount: "$155,000", truckType: "heavy-wrecker" }),
    ).toBe("/pre-approval?amount=155000&trucktype=heavy-wrecker");
    expect(buildPreApprovalHref({ amount: "$10,000" })).toBe(
      "/pre-approval?amount=20000",
    );
    expect(
      parsePreApprovalSearchParams(
        new URLSearchParams("amount=%24500%2C000&trucktype=rollback"),
      ),
    ).toEqual({
      amount: 500_000,
      truckType: "rollback",
    });
    expect(parsePreApprovalSearchParams(new URLSearchParams("amount="))).toEqual(
      {
        amount: 100_000,
      },
    );
    expect(
      parsePreApprovalSearchParams(new URLSearchParams("amount=1000")),
    ).toEqual({
      amount: 20_000,
    });
    expect(
      parsePreApprovalSearchParams(new URLSearchParams("amount=900000")),
    ).toEqual({
      amount: 500_000,
    });
  });

  it("keeps the entry hash behavior compatible with the legacy runtime", () => {
    expect(preApprovalEntryHash).toBe("#get-pre-approved");
    expect(buildPreApprovalEntryHref("/rollback-financing")).toBe(
      preApprovalEntryHash,
    );
    expect(buildPreApprovalEntryHref(null)).toBe(
      preApprovalFallbackEntryHref,
    );
  });

  it("emits the production trigger attribute schema", () => {
    const trigger: PreApprovalTrigger = {
      origin: {
        pageId: "rollback-financing",
        sectionId: "hero-primary",
        ctaId: "hero-main-cta",
        placement: "hero",
      },
      drawer: {
        title: "How much financing do you need?",
      },
      handoff: {
        truckType: "rollback",
      },
    };

    expect(buildPreApprovalTriggerAttributes(trigger)).toEqual({
      "data-pre-approval-version": "2",
      "data-pre-approval-origin-page-id": "rollback-financing",
      "data-pre-approval-origin-section-id": "hero-primary",
      "data-pre-approval-origin-cta-id": "hero-main-cta",
      "data-pre-approval-origin-placement": "hero",
      "data-pre-approval-drawer-title": "How much financing do you need?",
      "data-pre-approval-handoff-truck-type": "rollback",
    });
  });

});
