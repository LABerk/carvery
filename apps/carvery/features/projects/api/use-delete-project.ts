"use client";

import { useState } from "react";
import { deleteProject } from "@/features/projects/api/delete-project";

type UseDeleteProject = {
  error?: Error;
  isLoading: boolean;
  remove: (id: number) => Promise<void>;
};

export const useDeleteProject = (): UseDeleteProject => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const remove = async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      await deleteProject({ id });
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, remove };
};
