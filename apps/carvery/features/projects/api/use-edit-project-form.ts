"use client";

import { ComponentProps, useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { Project } from "@/features/projects/domain/project.model";
import { routes } from "@/features/navigation/domain/routes";

type UseEditProjectFormOptions = {
  project: Project;
};

type UseEditProjectForm = {
  content: string;
  error: string | null;
  isUpdating: boolean;
  name: string;
  onSubmit: ComponentProps<"form">["onSubmit"];
  setContent: (content: string) => void;
  setName: (name: string) => void;
  setStatus: (status: string) => void;
  setWood: (wood: string) => void;
  status: string;
  wood: string;
};

export const useEditProjectForm = ({ project }: UseEditProjectFormOptions): UseEditProjectForm => {
  const router = useRouter();
  const { update, error: updateError, isLoading: isUpdating } = useUpdateProject();
  const [name, setName] = useState(project.name);
  const [wood, setWood] = useState(project.wood);
  const [status, setStatus] = useState(project.status);
  const [content, setContent] = useState(project.description ?? "");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setValidationError("Project name is required.");
      return;
    }

    setValidationError(null);

    try {
      await update({
        id: project.id,
        name: name.trim(),
        wood,
        status,
        description: content.trim() || null,
      });
      router.push(routes.projects.root);
    } catch {
      // useUpdateProject exposes the request error for rendering.
    }
  };

  return {
    content,
    error: validationError ?? updateError?.message ?? null,
    isUpdating,
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
