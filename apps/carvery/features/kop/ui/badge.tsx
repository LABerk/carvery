import { cn } from "@/aspects/utils/cn";
import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface/60 px-3 py-1 text-xs font-medium text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
};
