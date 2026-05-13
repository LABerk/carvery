using Api.Features.Home.GetWelcome;

namespace Api.Features.Home;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddHomeFeature(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddGetWelcomeSlice();
        return services;
    }
}