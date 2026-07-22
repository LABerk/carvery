import { ReactNode } from "react";
import { cn } from "@/aspects/utils/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-6 gap-4", className)}>
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description ? <p className="text-subtle mt-1">{description}</p> : null}
      </div>
      {actions}
    </div>
  );
};
