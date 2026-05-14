using Carvery.Database.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Carvery.Database;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddCarveryDatabase(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        return services.AddContext(configuration);
    }

    private static IServiceCollection AddContext(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' is not configured."
            );

        return services.AddDbContextFactory<AppDbContext>(options =>
            options.UseSqlServer(connectionString)
        );
    }
}
