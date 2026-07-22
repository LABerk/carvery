import { cn } from "@/aspects/utils/cn";
import { ReactNode, SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: readonly SelectOption[] | readonly string[];
  error?: string | null;
  hint?: ReactNode;
};

const toOption = (option: SelectOption | string): SelectOption =>
  typeof option === "string" ? { label: option, value: option } : option;

export const Select = ({ label, options, error, hint, className, id, ...props }: SelectProps) => {
  const fieldId = id ?? props.name;

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="text-sm text-subtle">{label}</span>
      <select
        id={fieldId}
        className={cn(
          "mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {options.map((option) => {
          const resolved = toOption(option);
          return (
            <option key={resolved.value} value={resolved.value}>
              {resolved.label}
            </option>
          );
        })}
      </select>
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
      {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
    </label>
  );
};
