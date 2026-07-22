"use client";

import { useState } from "react";
import { Note } from "@/features/notes/domain/note.model";
import { CreateNoteForm } from "@/features/notes/ui/create-note-form";
import { ManageNotesList } from "@/features/notes/ui/manage-notes-list";

interface NotesSectionProps {
  initialNotes: Note[];
}

export const NotesSection = ({ initialNotes }: NotesSectionProps) => {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <>
      <CreateNoteForm onCreated={(note) => setNotes((currentNotes) => [note, ...currentNotes])} />
      <ManageNotesList notes={notes} setNotes={setNotes} />
    </>
  );
};
