import { clientGetApi } from "@/aspects/api/client-get-api";
import { Note } from "@/features/notes/domain/note.model";

export type ListNotesResponse = Note[];

export const listNotes = async (): Promise<ListNotesResponse> => {
  return await clientGetApi<ListNotesResponse>("/notes");
};
