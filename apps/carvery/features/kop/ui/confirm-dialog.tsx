"use client";

import { ReactNode } from "react";
import { Button } from "@/features/kop/ui/button";

type ConfirmDialogProps = {
  title: string;
  description: ReactNode;
  error?: string | null;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmDialog = ({
  title,
  description,
  error,
  isLoading = false,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <div className="mt-2 text-sm text-subtle">{description}</div>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" size="medium" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="danger"
            size="medium"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
