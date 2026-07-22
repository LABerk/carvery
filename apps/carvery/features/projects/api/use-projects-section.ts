"use client";

import { useState } from "react";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { Project } from "@/features/projects/domain/project.model";

type UseProjectsSection = {
  confirmDeleteProject: () => Promise<void>;
  deleteError: string | null;
  isDeleting: boolean;
  onProjectCreated: (project: Project) => void;
  projectPendingDelete: Project | null;
  projects: Project[];
  requestDeleteProject: (project: Project) => void;
  resetDeleteProject: () => void;
};

export const useProjectsSection = (initialProjects: Project[]): UseProjectsSection => {
  const [projects, setProjects] = useState(initialProjects);
  const [projectPendingDelete, setProjectPendingDelete] = useState<Project | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { isLoading: isDeleting, remove } = useDeleteProject();

  const onProjectCreated = (project: Project): void => {
    setProjects((currentProjects) => [project, ...currentProjects]);
  };

  const requestDeleteProject = (project: Project): void => {
    setProjectPendingDelete(project);
    setDeleteError(null);
  };

  const resetDeleteProject = (): void => {
    setProjectPendingDelete(null);
    setDeleteError(null);
  };

  const confirmDeleteProject = async (): Promise<void> => {
    if (!projectPendingDelete) {
      return;
    }

    try {
      await remove(projectPendingDelete.id);
      setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectPendingDelete.id));
      resetDeleteProject();
    } catch (e) {
      setDeleteError((e as Error).message || "Could not delete the project.");
    }
  };

  return {
    confirmDeleteProject,
    deleteError,
    isDeleting,
    onProjectCreated,
    projectPendingDelete,
    projects,
    requestDeleteProject,
    resetDeleteProject,
  };
};
