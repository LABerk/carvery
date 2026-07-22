import { cn } from "@/aspects/utils/cn";
import { FormHTMLAttributes, ReactNode } from "react";

type FormPanelProps = FormHTMLAttributes<HTMLFormElement> & {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export const FormPanel = ({ title, description, children, className, ...props }: FormPanelProps) => {
  return (
    <form
      className={cn("rounded-2xl border border-border bg-surface/80 p-4 space-y-4", className)}
      {...props}
    >
      {title || description ? (
        <div>
          {title ? <h2 className="font-semibold text-foreground">{title}</h2> : null}
          {description ? <p className="text-sm text-subtle mt-1">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </form>
  );
};
