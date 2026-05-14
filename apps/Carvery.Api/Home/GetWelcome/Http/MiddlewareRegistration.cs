using Microsoft.AspNetCore.Builder;

namespace Api.Features.Home.GetWelcome.Http;

public static class MiddlewareRegistration
{
    public static IApplicationBuilder UseHttp(this IApplicationBuilder app)
    {
        return app.UseCors();
    }

    private static IApplicationBuilder UseCors(this IApplicationBuilder app)
    {
        return app.UseCarveryCors();
    }
}
