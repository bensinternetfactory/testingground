import {
  preApprovalDefaultAmount,
  preApprovalMaxAmount,
  preApprovalMinAmount,
  type PreApprovalTruckType,
} from "./contract";

export const preApprovalPath = "/pre-approval";

export interface PreApprovalHandoffParams {
  amount: number | string;
  truckType?: PreApprovalTruckType;
}

export interface PreApprovalSearchParamsReader {
  get(name: string): string | null | undefined;
}

function clampPreApprovalAmount(value: number): number {
  return Math.min(preApprovalMaxAmount, Math.max(preApprovalMinAmount, value));
}

function isPreApprovalTruckType(
  value: string | null | undefined,
): value is PreApprovalTruckType {
  return (
    value === "rollback" ||
    value === "wrecker" ||
    value === "heavy-wrecker" ||
    value === "rotator"
  );
}

export function normalizePreApprovalAmount(value: number | string): string {
  const digits = String(value).replace(/\D/g, "");
  const normalized = digits ? Number(digits) : preApprovalDefaultAmount;
  return String(clampPreApprovalAmount(normalized));
}

export function buildPreApprovalHref({
  amount,
  truckType,
}: PreApprovalHandoffParams): string {
  const params = new URLSearchParams({
    amount: normalizePreApprovalAmount(amount),
  });

  if (truckType) {
    params.set("trucktype", truckType);
  }

  return `${preApprovalPath}?${params.toString()}`;
}

export function parsePreApprovalSearchParams(
  searchParams: URLSearchParams | PreApprovalSearchParamsReader,
): PreApprovalHandoffParams {
  const truckType = searchParams.get("trucktype");
  const parsed: PreApprovalHandoffParams = {
    amount: Number(normalizePreApprovalAmount(searchParams.get("amount") ?? "")),
  };

  if (isPreApprovalTruckType(truckType)) {
    parsed.truckType = truckType;
  }

  return parsed;
}
