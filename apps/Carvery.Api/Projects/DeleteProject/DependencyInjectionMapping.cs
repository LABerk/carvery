using Api.Features.Projects.DeleteProject.Domain;
using Api.Features.Projects.DeleteProject.Persistence;

namespace Api.Features.Projects.DeleteProject;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddDeleteProjectSlice(this IServiceCollection services)
    {
        services.AddScoped<IDeleteProjectPersistence, DeleteProjectDataAccess>();
        services.AddScoped<DeleteProjectService>();
        services.AddScoped<DeleteProjectFacade>();
        return services;
    }
}
