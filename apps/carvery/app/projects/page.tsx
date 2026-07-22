import { getProjects } from "@/features/projects/persistence/get-projects";
import { ProjectsSection } from "@/features/projects/ui/projects-section";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <div className="max-w-2xl">
      <ProjectsSection initialProjects={projects} />
    </div>
  );
};

export default ProjectsPage;
