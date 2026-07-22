import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/features/kop/ui/page-header";
import { routes } from "@/features/navigation/domain/routes";
import { getProject } from "@/features/projects/persistence/get-project";
import { EditProjectForm } from "@/features/projects/ui/edit-project-form";

export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const EditProjectPage = async ({ params }: EditProjectPageProps) => {
  const { projectId } = await params;
  const id = Number(projectId);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const project = await getProject(id);
  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <Link href={routes.projects.root} className="text-sm font-medium text-subtle hover:text-foreground">
        ← Back to projects
      </Link>
      <PageHeader title={project.name} description="Edit project details." className="mt-3" />
      <EditProjectForm project={project} />
    </div>
  );
};

export default EditProjectPage;
