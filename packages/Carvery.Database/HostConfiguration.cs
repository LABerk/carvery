using Microsoft.Extensions.Configuration;

namespace Carvery.Database;

public static class HostConfiguration
{
    public static string ResolveDefaultConnectionString(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException("Connection string 'DefaultConnection' was not found.");
        }

        return connectionString;
    }
}