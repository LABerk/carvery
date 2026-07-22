"use client";

import Link from "next/link";
import { Badge } from "@/features/kop/ui/badge";
import { Button } from "@/features/kop/ui/button";
import { EmptyState } from "@/features/kop/ui/empty-state";
import { LinkButton } from "@/features/kop/ui/link-button";
import { ListRow } from "@/features/kop/ui/list-row";
import { PageHeader } from "@/features/kop/ui/page-header";
import { PastelTone } from "@/features/kop/ui/pastel-card";
import { routes } from "@/features/navigation/domain/routes";
import { useProjectsSection } from "@/features/projects/api/use-projects-section";
import { Project } from "@/features/projects/domain/project.model";
import { CreateProjectForm } from "@/features/projects/ui/create-project-form";
import { DeleteProjectConfirmationModal } from "@/features/projects/ui/delete-project-confirmation-modal";

interface ProjectsSectionProps {
  initialProjects: Project[];
}

const projectTones: PastelTone[] = ["peach", "lemon", "lavender", "mint", "sky", "blush"];

export const ProjectsSection = ({ initialProjects }: ProjectsSectionProps) => {
  const {
    confirmDeleteProject,
    deleteError,
    isDeleting,
    onProjectCreated,
    projectPendingDelete,
    projects,
    requestDeleteProject,
    resetDeleteProject,
  } = useProjectsSection(initialProjects);

  return (
    <>
      <PageHeader title="Projects" description="Your 3D whittling projects." />

      <CreateProjectForm onCreated={onProjectCreated} />

      {projects.length === 0 ? (
        <EmptyState>No projects yet. Create one through the API to see it here.</EmptyState>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => {
            const editHref = routes.projects.edit.resolveRoute({
              projectId: project.id.toString(),
            });

            return (
              <ListRow
                key={project.id}
                tone={projectTones[index % projectTones.length]}
                title={
                  <Link href={editHref} className="hover:opacity-90 transition-opacity">
                    {project.name}
                  </Link>
                }
                subtitle={project.wood}
                trailing={
                  <>
                    <Badge>{project.status}</Badge>
                    <LinkButton href={editHref} variant="secondary" size="small">
                      Edit
                    </LinkButton>
                    <Button
                      type="button"
                      variant="danger"
                      size="small"
                      onClick={() => requestDeleteProject(project)}
                    >
                      Delete
                    </Button>
                  </>
                }
              />
            );
          })}
        </div>
      )}

      <DeleteProjectConfirmationModal
        error={deleteError}
        isDeleting={isDeleting}
        onCancel={resetDeleteProject}
        onConfirm={confirmDeleteProject}
        project={projectPendingDelete}
      />
    </>
  );
};
