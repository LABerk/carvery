using Api.Features.Projects.CreateProject;
using Api.Features.Projects.DeleteProject;
using Api.Features.Projects.GetProjectById;
using Api.Features.Projects.GetProjects;
using Api.Features.Projects.UpdateProject;

namespace Api.Features.Projects;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddProjectsFeature(this IServiceCollection services)
    {
        return services
            .AddCreateProjectSlice()
            .AddGetProjectsSlice()
            .AddGetProjectByIdSlice()
            .AddUpdateProjectSlice()
            .AddDeleteProjectSlice();
    }
}
