using Api.Features.Projects.UpdateProject.Domain;
using Api.Features.Projects.UpdateProject.Persistence;

namespace Api.Features.Projects.UpdateProject;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddUpdateProjectSlice(this IServiceCollection services)
    {
        services.AddScoped<IUpdateProjectPersistence, UpdateProjectDataAccess>();
        services.AddScoped<UpdateProjectService>();
        services.AddScoped<UpdateProjectFacade>();
        return services;
    }
}
