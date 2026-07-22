"use client";

import { ComponentProps, useState } from "react";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { Project } from "@/features/projects/domain/project.model";

type UseCreateProjectFormOptions = {
  onCreated: (project: Project) => void;
};

type UseCreateProjectForm = {
  content: string;
  error: string | null;
  isCreating: boolean;
  name: string;
  onSubmit: ComponentProps<"form">["onSubmit"];
  setContent: (content: string) => void;
  setName: (name: string) => void;
  setStatus: (status: string) => void;
  setWood: (wood: string) => void;
  status: string;
  wood: string;
};

export const useCreateProjectForm = ({ onCreated }: UseCreateProjectFormOptions): UseCreateProjectForm => {
  const { create, error: createError, isLoading: isCreating } = useCreateProject();
  const [name, setName] = useState("");
  const [wood, setWood] = useState("Basswood");
  const [status, setStatus] = useState("Planned");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setValidationError("Project name is required.");
      return;
    }

    setValidationError(null);

    try {
      const project = await create({
        name: name.trim(),
        wood,
        status,
        description: content.trim() || null,
      });

      setName("");
      setWood("Basswood");
      setStatus("Planned");
      setContent("");
      onCreated(project);
    } catch {
      // useCreateProject exposes the request error for rendering.
    }
  };

  return {
    content,
    error: validationError ?? createError?.message ?? null,
    isCreating,
    name,
    onSubmit,
    setContent,
    setName,
    setStatus,
    setWood,
    status,
    wood,
  };
};
