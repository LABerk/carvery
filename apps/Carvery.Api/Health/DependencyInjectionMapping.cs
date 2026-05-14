using Api.Features.Health.GetHealthCheck;

namespace Api.Features.Health;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddHealthFeature(this IServiceCollection services)
    {
        services.AddGetHealthCheckSlice();
        return services;
    }
}