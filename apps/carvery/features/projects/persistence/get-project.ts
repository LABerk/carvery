import { resolveServerCarveryApiUri } from "@/aspects/api/configuration/server-carvery-api-uri";
import { Project } from "@/features/projects/domain/project.model";

export const getProject = async (id: number): Promise<Project | null> => {
  try {
    const apiBaseUrl = resolveServerCarveryApiUri();
    const response = await fetch(`${apiBaseUrl}/projects/${id}`, { cache: "no-store" });
    if (response.status === 404 || !response.ok) {
      return null;
    }

    return (await response.json()) as Project;
  } catch {
    return null;
  }
};
