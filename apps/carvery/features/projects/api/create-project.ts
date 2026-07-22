import { clientCreateApi } from "@/aspects/api/client-create-api";
import { Project } from "@/features/projects/domain/project.model";

export interface CreateProjectRequest {
  name: string;
  wood: string;
  status: string;
  description?: string | null;
}

export const createProject = async (request: CreateProjectRequest): Promise<Project> => {
  if (request.description?.length === 0) {
    request.description = undefined;
  }

  return await clientCreateApi<Project, CreateProjectRequest>("/projects", request);
};
