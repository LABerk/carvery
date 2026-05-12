import { clientCreateApi } from "@/aspects/api/client-create-api";
import { Note } from "@/features/notes/domain/note.model";

export interface CreateNoteRequest {
  title: string;
  content?: string | null;
}

export const createNote = async (request: CreateNoteRequest): Promise<Note> => {
  if (request.content?.length === 0) {
    request.content = undefined;
  }

  return await clientCreateApi<Note, CreateNoteRequest>("/notes", request);
};
