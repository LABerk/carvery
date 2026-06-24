using Api.Features.Projects.CreateProject.Domain;
using Api.Features.Projects.CreateProject.Persistence;

namespace Api.Features.Projects.CreateProject;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddCreateProjectSlice(this IServiceCollection services)
    {
        services.AddScoped<ICreateProjectPersistence, CreateProjectDataAccess>();
        services.AddScoped<CreateProjectService>();
        services.AddScoped<CreateProjectFacade>();
        return services;
    }
}
