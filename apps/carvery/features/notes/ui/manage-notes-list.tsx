"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/features/kop/ui/button";
import { EmptyState } from "@/features/kop/ui/empty-state";
import { TextArea } from "@/features/kop/ui/text-area";
import { TextField } from "@/features/kop/ui/text-field";
import { Note } from "@/features/notes/domain/note.model";
import { useUpdateNote } from "@/features/notes/api/use-update-note";
import { useDeleteNote } from "@/features/notes/api/use-delete-note";

interface ManageNotesListProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export const ManageNotesList = ({ notes, setNotes }: ManageNotesListProps) => {
  const { error: updateError, isLoading: isUpdating, update } = useUpdateNote();
  const { error: deleteError, isLoading: isDeleting, remove } = useDeleteNote();
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
        }),
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
    return <EmptyState>No notes yet. Add your first note above.</EmptyState>;
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {updateError ? <p className="text-sm text-red-700">{updateError.message}</p> : null}
      {deleteError ? <p className="text-sm text-red-700">{deleteError.message}</p> : null}

      {notes.slice(0, 8).map((note) => (
        <article key={note.id} className="rounded-2xl border border-border bg-surface/80 p-4">
          {editingId === note.id ? (
            <div className="space-y-3">
              <TextField
                label="Title"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                maxLength={120}
                disabled={isUpdating}
              />
              <TextArea
                label="Content"
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
                rows={3}
                disabled={isUpdating}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="primary"
                  size="small"
                  onClick={() => saveEdit(note.id)}
                  isLoading={isUpdating}
                >
                  Save
                </Button>
                <Button type="button" variant="secondary" size="small" onClick={cancelEdit} disabled={isUpdating}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-foreground">{note.title}</h3>
              {note.content ? <p className="text-sm text-subtle mt-1">{note.content}</p> : null}
              <p className="text-xs text-subtle mt-2">{new Date(note.createdAtUtc).toLocaleString()}</p>
              <div className="mt-3 flex gap-2">
                <Button type="button" variant="secondary" size="small" onClick={() => startEdit(note)}>
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="small"
                  onClick={() => deleteNote(note.id)}
                  isLoading={isDeletingId === note.id}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
};
