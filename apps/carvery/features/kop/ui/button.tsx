"use client";

import { cn } from "@/aspects/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "accent";
export type ButtonSize = "small" | "medium" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
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

export const Button = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center transition-opacity disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
