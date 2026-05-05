import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DotGrid({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <div className={cn("dot-grid", className)}>{children}</div>;
}
