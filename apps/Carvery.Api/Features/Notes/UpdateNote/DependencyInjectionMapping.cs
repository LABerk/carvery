using Api.Features.Notes.UpdateNote.Domain;
using Api.Features.Notes.UpdateNote.Persistence;

namespace Api.Features.Notes.UpdateNote;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddUpdateNoteSlice(this IServiceCollection services)
    {
        services.AddScoped<IUpdateNotePersistence, UpdateNoteDataAccess>();
        services.AddScoped<UpdateNoteService>();
        services.AddScoped<UpdateNoteFacade>();

        return services;
    }
}