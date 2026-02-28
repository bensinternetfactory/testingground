import type { TrustBadgeData } from "./config";

const CheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5 text-[#22C55E]"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export function TrustBadge({ label, icon }: TrustBadgeData) {
  return (
    <div className="flex items-center gap-2">
      {icon ?? <CheckCircle />}
      <span className="text-sm font-medium text-[#101820]">{label}</span>
    </div>
  );
}
