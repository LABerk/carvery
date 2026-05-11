using Api.Features.Home.GetWelcome.Domain;

namespace Api.Features.Home.GetWelcome;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddGetWelcomeSlice(this IServiceCollection services)
    {
        services.AddScoped<GetWelcomeService>();
        services.AddScoped<GetWelcomeFacade>();
        return services;
    }
}