"use client";

import { useState } from "react";
import { createNote } from "@/features/notes/api/create-note";
import { Note } from "@/features/notes/domain/note.model";

type UseCreateNote = {
  error?: Error;
  isLoading: boolean;
  create: (title: string, content: string | null) => Promise<Note>;
};

export const useCreateNote = (): UseCreateNote => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = async (title: string, content: string | null): Promise<Note> => {
    setIsLoading(true);
    setError(undefined);
    try {
      return await createNote({ title, content });
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, create };
};
