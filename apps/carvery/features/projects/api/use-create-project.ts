"use client";

import { useState } from "react";
import { createProject, CreateProjectRequest } from "@/features/projects/api/create-project";
import { Project } from "@/features/projects/domain/project.model";

type UseCreateProject = {
  create: (request: CreateProjectRequest) => Promise<Project>;
  error?: Error;
  isLoading: boolean;
};

export const useCreateProject = (): UseCreateProject => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (request: CreateProjectRequest): Promise<Project> => {
    setIsLoading(true);
    setError(undefined);

    try {
      return await createProject(request);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, error, isLoading };
};
