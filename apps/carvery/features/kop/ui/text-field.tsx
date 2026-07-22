import { cn } from "@/aspects/utils/cn";
import { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
  hint?: ReactNode;
};

export const TextField = ({ label, error, hint, className, id, ...props }: TextFieldProps) => {
  const fieldId = id ?? props.name;

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="text-sm text-subtle">{label}</span>
      <input
        id={fieldId}
        className={cn(
          "mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground disabled:opacity-60",
          className,
        )}
        {...props}
      />
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
      {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
    </label>
  );
};
