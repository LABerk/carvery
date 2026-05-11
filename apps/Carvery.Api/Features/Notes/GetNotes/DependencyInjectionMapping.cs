using Api.Features.Notes.GetNotes.Domain;
using Api.Features.Notes.GetNotes.Persistence;

namespace Api.Features.Notes.GetNotes;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddGetNotesSlice(this IServiceCollection services)
    {
        services.AddScoped<IGetNotesPersistence, GetNotesDataAccess>();
        services.AddScoped<GetNotesService>();
        services.AddScoped<GetNotesFacade>();

        return services;
    }
}