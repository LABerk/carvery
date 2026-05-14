using Api.Features.Notes.GetNoteById.Domain;
using Api.Features.Notes.GetNoteById.Persistence;

namespace Api.Features.Notes.GetNoteById;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddGetNoteByIdSlice(this IServiceCollection services)
    {
        services.AddScoped<IGetNoteByIdPersistence, GetNoteByIdDataAccess>();
        services.AddScoped<GetNoteByIdService>();
        services.AddScoped<GetNoteByIdFacade>();

        return services;
    }
}