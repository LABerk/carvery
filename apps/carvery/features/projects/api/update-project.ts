import { clientUpdateApi } from "@/aspects/api/client-update-api";
import { Project } from "@/features/projects/domain/project.model";

export interface UpdateProjectRequest {
  id: number;
  name: string;
  wood: string;
  status: string;
  description?: string | null;
}

type UpdateProjectBody = {
  name: string;
  wood: string;
  status: string;
  description?: string | null;
};

export const updateProject = async (request: UpdateProjectRequest): Promise<Project> => {
  const body: UpdateProjectBody = {
    name: request.name,
    wood: request.wood,
    status: request.status,
    description: request.description,
  };

  if (body.description?.length === 0) {
    body.description = undefined;
  }

  return await clientUpdateApi<Project, UpdateProjectBody>(`/projects/${request.id}`, body);
};
