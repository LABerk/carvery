import { clientUpdateApi } from "@/aspects/api/client-update-api";
import { Note } from "@/features/notes/domain/note.model";

export interface UpdateNoteRequest {
  id: number;
  title: string;
  content?: string | null;
}

type UpdateNoteBody = {
  title: string;
  content?: string | null;
};

export const updateNote = async (request: UpdateNoteRequest): Promise<Note> => {
  const body: UpdateNoteBody = {
    title: request.title,
    content: request.content,
  };

  if (body.content?.length === 0) {
    body.content = undefined;
  }

  return await clientUpdateApi<Note, UpdateNoteBody>(`/notes/${request.id}`, body);
};
