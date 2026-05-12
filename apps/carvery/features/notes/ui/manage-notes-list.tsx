"use client";

import { useState } from "react";
import { Note } from "@/features/notes/domain/note.model";
import { useUpdateNote } from "@/features/notes/api/use-update-note";
import { useDeleteNote } from "@/features/notes/api/use-delete-note";

type ManageNotesListProps = {
  initialNotes: Note[];
};

export const ManageNotesList = ({ initialNotes }: ManageNotesListProps) => {
  const { error: updateError, isLoading: isUpdating, update } = useUpdateNote();
  const { error: deleteError, isLoading: isDeleting, remove } = useDeleteNote();
  const [notes, setNotes] = useState(initialNotes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (note: Note): void => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content ?? "");
    setError(null);
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setError(null);
  };

  const saveEdit = async (id: number): Promise<void> => {
    if (!editTitle.trim()) {
      setError("Title is required.");
      return;
    }

    setError(null);

    try {
      const updated = await update(id, editTitle.trim(), editContent.trim() || null);
      setNotes((currentNotes) =>
        currentNotes.map((note) => {
          if (note.id === id) {
            return updated;
          }

          return note;
        })
      );

      cancelEdit();
    } catch (e) {
      setError((e as Error).message || "Could not reach the server.");
    }
  };

  const deleteNote = async (id: number): Promise<void> => {
    setIsDeletingId(id);
    setError(null);

    try {
      await remove(id);

      setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
      if (editingId === id) {
        cancelEdit();
      }
    } catch (e) {
      setError((e as Error).message || "Could not reach the server.");
    } finally {
      setIsDeletingId(null);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-subtle/40 p-4 text-sm text-subtle">
        No notes yet. Add your first note above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {updateError ? <p className="text-sm text-red-700">{updateError.message}</p> : null}
      {deleteError ? <p className="text-sm text-red-700">{deleteError.message}</p> : null}

      {notes.slice(0, 8).map((note) => (
        <article key={note.id} className="rounded-2xl border border-subtle/20 bg-white/60 p-4">
          {editingId === note.id ? (
            <div className="space-y-2">
              <input
                className="w-full rounded-xl border border-subtle/30 bg-white px-3 py-2 text-sm text-foreground"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                maxLength={120}
                disabled={isUpdating}
              />
              <textarea
                className="w-full rounded-xl border border-subtle/30 bg-white px-3 py-2 text-sm text-foreground"
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
                rows={3}
                disabled={isUpdating}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-xl bg-foreground px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  onClick={() => saveEdit(note.id)}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-subtle/30 px-3 py-1.5 text-xs font-semibold text-foreground"
                  onClick={cancelEdit}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-foreground">{note.title}</h3>
              {note.content ? <p className="text-sm text-subtle mt-1">{note.content}</p> : null}
              <p className="text-xs text-subtle mt-2">{new Date(note.createdAtUtc).toLocaleString()}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-subtle/30 px-3 py-1.5 text-xs font-semibold text-foreground"
                  onClick={() => startEdit(note)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-60"
                  onClick={() => deleteNote(note.id)}
                  disabled={isDeletingId === note.id || isDeleting}
                >
                  {isDeletingId === note.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
};