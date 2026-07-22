"use client";

import { ConfirmDialog } from "@/features/kop/ui/confirm-dialog";
import { Project } from "@/features/projects/domain/project.model";

interface DeleteProjectConfirmationModalProps {
  error: string | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  project: Project | null;
}

export const DeleteProjectConfirmationModal = ({
  error,
  isDeleting,
  onCancel,
  onConfirm,
  project,
}: DeleteProjectConfirmationModalProps) => {
  if (!project) {
    return null;
  }

  return (
    <ConfirmDialog
      title="Delete project?"
      description={
        <>
          This will permanently delete <span className="font-semibold text-foreground">{project.name}</span>.
        </>
      }
      error={error}
      isLoading={isDeleting}
      confirmLabel="Delete project"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
