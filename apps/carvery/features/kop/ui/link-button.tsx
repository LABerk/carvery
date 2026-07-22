import Link from "next/link";
import { cn } from "@/aspects/utils/cn";
import { ComponentProps, ReactNode } from "react";
import { ButtonSize, ButtonVariant } from "@/features/kop/ui/button";

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg hover:opacity-90",
  secondary: "border border-border bg-surface text-foreground hover:bg-muted",
  danger: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
  accent: "bg-accent text-accent-fg hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "rounded-xl px-3 py-1.5 text-xs font-semibold",
  medium: "rounded-lg px-4 py-2 text-sm font-medium",
  large: "rounded-lg px-6 py-3 text-lg font-medium",
};

export const LinkButton = ({
  variant = "secondary",
  size = "medium",
  className,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center transition-opacity",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Link>
  );
};
