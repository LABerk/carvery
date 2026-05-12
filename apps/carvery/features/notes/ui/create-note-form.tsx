"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateNote } from "@/features/notes/api/use-create-note";

export const CreateNoteForm = () => {
  const router = useRouter();
  const { error: createError, isLoading: isCreating, create } = useCreateNote();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setError(null);

    try {
      await create(title.trim(), content.trim() || null);

      setTitle("");
      setContent("");
      router.refresh();
    } catch (e) {
      setError((e as Error).message || "Could not reach the server.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-subtle/20 bg-white/60 p-4 mb-4 space-y-3">
      <h3 className="font-semibold text-foreground">Add Note</h3>

      <label className="block">
        <span className="text-sm text-subtle">Title</span>
        <input
          className="mt-1 w-full rounded-xl border border-subtle/30 bg-white px-3 py-2 text-sm text-foreground"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={120}
          disabled={isCreating}
          required
        />
      </label>

      <label className="block">
        <span className="text-sm text-subtle">Content</span>
        <textarea
          className="mt-1 w-full rounded-xl border border-subtle/30 bg-white px-3 py-2 text-sm text-foreground"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={3}
          disabled={isCreating}
        />
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {createError ? <p className="text-sm text-red-700">{createError.message}</p> : null}

      <button
        type="submit"
        className="rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        disabled={isCreating}
      >
        {isCreating ? "Saving..." : "Save note"}
      </button>
    </form>
  );
};