import { clientDeleteApi } from "@/aspects/api/client-delete-api";

export interface DeleteProjectRequest {
  id: number;
}

export const deleteProject = async (request: DeleteProjectRequest): Promise<void> => {
  await clientDeleteApi(`/projects/${request.id}`);
};
