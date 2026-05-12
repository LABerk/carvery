"use client";

import { useState } from "react";
import { updateNote } from "@/features/notes/api/update-note";
import { Note } from "@/features/notes/domain/note.model";

type UseUpdateNote = {
  error?: Error;
  isLoading: boolean;
  update: (id: number, title: string, content: string | null) => Promise<Note>;
};

export const useUpdateNote = (): UseUpdateNote => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const update = async (id: number, title: string, content: string | null): Promise<Note> => {
    setIsLoading(true);
    setError(undefined);
    try {
      return await updateNote({ id, title, content });
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, update };
};
