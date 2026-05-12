"use client";

import { useState } from "react";
import { deleteNote } from "@/features/notes/api/delete-note";

type UseDeleteNote = {
  error?: Error;
  isLoading: boolean;
  remove: (id: number) => Promise<void>;
};

export const useDeleteNote = (): UseDeleteNote => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const remove = async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(undefined);
    try {
      await deleteNote({ id });
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, remove };
};
