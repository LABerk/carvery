using Api.Features.Home.GetWelcome;

namespace Api.Features.Home;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddHomeFeature(this IServiceCollection services)
    {
        services.AddGetWelcomeSlice();
        return services;
    }
}