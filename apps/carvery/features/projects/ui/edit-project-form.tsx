"use client";

import { Button } from "@/features/kop/ui/button";
import { FormPanel } from "@/features/kop/ui/form-panel";
import { LinkButton } from "@/features/kop/ui/link-button";
import { Select } from "@/features/kop/ui/select";
import { TextArea } from "@/features/kop/ui/text-area";
import { TextField } from "@/features/kop/ui/text-field";
import { useEditProjectForm } from "@/features/projects/api/use-edit-project-form";
import {
  projectStatusOptions,
  projectWoodOptions,
} from "@/features/projects/domain/project-form-options";
import { Project } from "@/features/projects/domain/project.model";
import { routes } from "@/features/navigation/domain/routes";

interface EditProjectFormProps {
  project: Project;
}

export const EditProjectForm = ({ project }: EditProjectFormProps) => {
  const {
    content,
    error,
    isUpdating,
    name,
    onSubmit,
    setContent,
    setName,
    setStatus,
    setWood,
    status,
    wood,
  } = useEditProjectForm({ project });

  return (
    <FormPanel
      onSubmit={onSubmit}
      title="Edit Project"
      description="Update the name, wood, status, or description."
    >
      <TextField
        label="Project name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={120}
        disabled={isUpdating}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Wood"
          value={wood}
          onChange={(event) => setWood(event.target.value)}
          disabled={isUpdating}
          options={projectWoodOptions}
        />
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          disabled={isUpdating}
          options={projectStatusOptions}
        />
      </div>

      <TextArea
        label="Description"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        disabled={isUpdating}
      />

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="medium" isLoading={isUpdating}>
          Save changes
        </Button>
        <LinkButton href={routes.projects.root} variant="secondary" size="medium">
          Cancel
        </LinkButton>
      </div>
    </FormPanel>
  );
};
