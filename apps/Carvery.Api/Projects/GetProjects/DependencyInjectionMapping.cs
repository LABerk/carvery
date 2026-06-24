using Api.Features.Projects.GetProjects.Domain;
using Api.Features.Projects.GetProjects.Persistence;

namespace Api.Features.Projects.GetProjects;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddGetProjectsSlice(this IServiceCollection services)
    {
        services.AddScoped<IGetProjectsPersistence, GetProjectsDataAccess>();
        services.AddScoped<GetProjectsService>();
        services.AddScoped<GetProjectsFacade>();
        return services;
    }
}
