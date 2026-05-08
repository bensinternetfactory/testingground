import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  as?: ElementType;
  outerClassName?: string;
  innerClassName?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function SectionShell({
  as: Tag = "section",
  outerClassName,
  innerClassName,
  children,
  ...rest
}: SectionShellProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        "2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x 2xl:border-gray-200 2xl:overflow-hidden",
        outerClassName,
      )}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
