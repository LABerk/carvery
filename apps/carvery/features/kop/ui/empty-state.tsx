import { cn } from "@/aspects/utils/cn";
import { ReactNode } from "react";

type EmptyStateProps = {
  children: ReactNode;
  className?: string;
};

export const EmptyState = ({ children, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-subtle/40 p-4 text-sm text-subtle",
        className,
      )}
    >
      {children}
    </div>
  );
};
