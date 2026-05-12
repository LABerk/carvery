import { clientDeleteApi } from "@/aspects/api/client-delete-api";

export interface DeleteNoteRequest {
  id: number;
}

export const deleteNote = async (request: DeleteNoteRequest): Promise<void> => {
  await clientDeleteApi(`/notes/${request.id}`);
};
