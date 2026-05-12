import { Note } from "@/features/notes/domain/note.model";
import { resolveServerCarveryApiUri } from "@/aspects/api/configuration/server-carvery-api-uri";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const apiBaseUrl = resolveServerCarveryApiUri();
    const response = await fetch(`${apiBaseUrl}/notes`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }

    return (await response.json()) as Note[];
  } catch {
    return [];
  }
};
