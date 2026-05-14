using Api.Features.Health.GetHealthCheck.Domain;

namespace Api.Features.Health.GetHealthCheck;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddGetHealthCheckSlice(this IServiceCollection services)
    {
        services.AddScoped<GetHealthCheckService>();
        services.AddScoped<GetHealthCheckFacade>();
        return services;
    }
}