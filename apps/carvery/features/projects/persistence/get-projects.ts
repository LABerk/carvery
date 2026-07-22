import { resolveServerCarveryApiUri } from "@/aspects/api/configuration/server-carvery-api-uri";
import { Project } from "@/features/projects/domain/project.model";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const apiBaseUrl = resolveServerCarveryApiUri();
    const response = await fetch(`${apiBaseUrl}/projects`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }

    return (await response.json()) as Project[];
  } catch {
    return [];
  }
};
