using Api.Features.Home.GetWelcome.Configuration;
using Microsoft.Extensions.Configuration;


public static class LoadConfiguration
{
    private const string CONFIGURATION_KEY = "Carvery says welcome";

    public static CarveryConfiguration LoadCarveryConfiguration(this IConfiguration configuration)
    {
        var carveryConfiguration = configuration
            .GetSection(CONFIGURATION_KEY)
            .Get<CarveryConfiguration>();

        if (carveryConfiguration == null)
        {
            throw new CarveryConfigurationNotFoundException(
                $"Could not load a {nameof(CarveryConfiguration)} object at key {CONFIGURATION_KEY}"
            );
        }

        return carveryConfiguration;
    }
}
