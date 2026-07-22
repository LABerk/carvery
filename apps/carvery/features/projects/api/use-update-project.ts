"use client";

import { useState } from "react";
import { updateProject, UpdateProjectRequest } from "@/features/projects/api/update-project";
import { Project } from "@/features/projects/domain/project.model";

type UseUpdateProject = {
  error?: Error;
  isLoading: boolean;
  update: (request: UpdateProjectRequest) => Promise<Project>;
};

export const useUpdateProject = (): UseUpdateProject => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const update = async (request: UpdateProjectRequest): Promise<Project> => {
    setIsLoading(true);
    setError(undefined);

    try {
      return await updateProject(request);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, update };
};
