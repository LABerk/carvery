using Api.Features.Health;
using Api.Features.Home;
using Api.Features.Notes;
using Api.Features.Projects;
using Carvery.Database;

namespace Carvery.Api;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddDependencyInjection(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        return services
            .AddPersistence(configuration)
            .AddHttp()
            .AddFeatures(configuration)
            .AddCorsPolicy(configuration);
    }

    private static IServiceCollection AddFeatures(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        return services.AddHomeFeature(configuration).AddHealthFeature().AddNotesFeature().AddProjectsFeature();
    }

    private static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        return services.AddCarveryDatabase(configuration);
    }

    private static IServiceCollection AddHttp(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddHttpContextAccessor();

        return services;
    }

    private static IServiceCollection AddCorsPolicy(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        var carveryConfiguration = configuration.LoadCarveryConfiguration();
        services.AddCors(options => options.AddCarveryCorsPolicy(carveryConfiguration));

        return services;
    }
}
