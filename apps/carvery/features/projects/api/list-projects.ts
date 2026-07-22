import { clientGetApi } from "@/aspects/api/client-get-api";
import { Project } from "@/features/projects/domain/project.model";

export type ListProjectsResponse = Project[];

export const listProjects = async (): Promise<ListProjectsResponse> => {
  return await clientGetApi<ListProjectsResponse>("/projects");
};
