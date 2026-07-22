"use client";

import { Button } from "@/features/kop/ui/button";
import { FormPanel } from "@/features/kop/ui/form-panel";
import { Select } from "@/features/kop/ui/select";
import { TextArea } from "@/features/kop/ui/text-area";
import { TextField } from "@/features/kop/ui/text-field";
import { useCreateProjectForm } from "@/features/projects/api/use-create-project-form";
import {
  projectStatusOptions,
  projectWoodOptions,
} from "@/features/projects/domain/project-form-options";
import { Project } from "@/features/projects/domain/project.model";

interface CreateProjectFormProps {
  onCreated: (project: Project) => void;
}

export const CreateProjectForm = ({ onCreated }: CreateProjectFormProps) => {
  const {
    content,
    error,
    isCreating,
    name,
    onSubmit,
    setContent,
    setName,
    setStatus,
    setWood,
    status,
    wood,
  } = useCreateProjectForm({ onCreated });

  return (
    <FormPanel
      onSubmit={onSubmit}
      className="mb-6"
      title="Create Project"
      description="Name the project and choose the starting wood details."
    >
      <TextField
        label="Project name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={120}
        disabled={isCreating}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Wood"
          value={wood}
          onChange={(event) => setWood(event.target.value)}
          disabled={isCreating}
          options={projectWoodOptions}
        />
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          disabled={isCreating}
          options={projectStatusOptions}
        />
      </div>

      <TextArea
        label="Description"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        disabled={isCreating}
      />

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <Button type="submit" variant="primary" size="medium" isLoading={isCreating}>
        Create project
      </Button>
    </FormPanel>
  );
};
