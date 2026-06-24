using Api.Features.Projects.GetProjectById.Domain;
using Api.Features.Projects.GetProjectById.Persistence;

namespace Api.Features.Projects.GetProjectById;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddGetProjectByIdSlice(this IServiceCollection services)
    {
        services.AddScoped<IGetProjectByIdPersistence, GetProjectByIdDataAccess>();
        services.AddScoped<GetProjectByIdService>();
        services.AddScoped<GetProjectByIdFacade>();
        return services;
    }
}
