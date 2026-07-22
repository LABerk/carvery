"use client";

import { ComponentProps, useState } from "react";
import { useCreateNote } from "@/features/notes/api/use-create-note";
import { Note } from "@/features/notes/domain/note.model";

type UseCreateNoteFormOptions = {
  onCreated?: (note: Note) => void;
};

type UseCreateNoteForm = {
  content: string;
  error: string | null;
  isCreating: boolean;
  onSubmit: ComponentProps<"form">["onSubmit"];
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  title: string;
};

export const useCreateNoteForm = ({ onCreated }: UseCreateNoteFormOptions): UseCreateNoteForm => {
  const { error: createError, isLoading: isCreating, create } = useCreateNote();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setValidationError("Title is required.");
      return;
    }

    setValidationError(null);

    try {
      const created = await create(title.trim(), content.trim() || null);
      setTitle("");
      setContent("");
      onCreated?.(created);
    } catch (e) {
      setValidationError((e as Error).message || "Could not reach the server.");
    }
  };

  return {
    content,
    error: validationError ?? createError?.message ?? null,
    isCreating,
    onSubmit,
    setContent,
    setTitle,
    title,
  };
};
