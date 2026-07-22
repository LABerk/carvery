"use client";

import { Button } from "@/features/kop/ui/button";
import { FormPanel } from "@/features/kop/ui/form-panel";
import { TextArea } from "@/features/kop/ui/text-area";
import { TextField } from "@/features/kop/ui/text-field";
import { useCreateNoteForm } from "@/features/notes/api/use-create-note-form";
import { Note } from "@/features/notes/domain/note.model";

interface CreateNoteFormProps {
  onCreated?: (note: Note) => void;
}

export const CreateNoteForm = ({ onCreated }: CreateNoteFormProps) => {
  const { content, error, isCreating, onSubmit, setContent, setTitle, title } = useCreateNoteForm({
    onCreated,
  });

  return (
    <FormPanel onSubmit={onSubmit} className="mb-4" title="Add Note">
      <TextField
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={120}
        disabled={isCreating}
        required
      />
      <TextArea
        label="Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        disabled={isCreating}
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <Button type="submit" variant="primary" size="medium" isLoading={isCreating}>
        Save note
      </Button>
    </FormPanel>
  );
};
