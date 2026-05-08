import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { CtaVariant } from "../../_lib/types";

type Size = "sm" | "md" | "lg";

type CtaButtonProps = {
  href: string;
  variant?: CtaVariant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

const VARIANT_CLASSES: Record<CtaVariant, string> = {
  primary:
    "bg-[var(--t-blue)] hover:bg-[var(--t-blue-hover)] text-white border border-transparent",
  secondary:
    "bg-white hover:bg-[var(--t-bg-soft)] text-[var(--t-blue-ink)] border border-[var(--t-card-border)]",
  ghost:
    "bg-transparent hover:bg-[var(--t-bg-soft)] text-[var(--t-blue-ink)] border border-transparent",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function CtaButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CtaButtonProps) {
  return (
    <a
      {...rest}
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
