using Microsoft.AspNetCore.Cors.Infrastructure;

public static class CarveryCorsPolicy
{
    private const string POLICY_NAME = "AllowLocal";
    private static Func<string, Action<CorsPolicyBuilder>> CONFIGURE_POLICY_FACTORY = (
        frontendUri
    ) =>
        (policy) =>
            policy
                .WithOrigins(frontendUri)
                .WithMethods(
                    HttpMethod.Get.ToString(),
                    HttpMethod.Post.ToString(),
                    HttpMethod.Delete.ToString(),
                    HttpMethod.Put.ToString(),
                    HttpMethod.Patch.ToString()
                )
                .WithHeaders("Authorization", "Content-Type", "Cookies")
                .AllowCredentials();

    public static CorsOptions AddCarveryCorsPolicy(
        this CorsOptions options,
        CarveryConfiguration carveryConfiguration
    )
    {
        options.AddPolicy(POLICY_NAME, CONFIGURE_POLICY_FACTORY(carveryConfiguration.FrontendUri));

        return options;
    }

    public static IApplicationBuilder UseCarveryCors(this IApplicationBuilder app)
    {
        return app.UseCors(POLICY_NAME);
    }
}
