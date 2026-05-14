using Api.Features.Notes.DeleteNote.Domain;
using Api.Features.Notes.DeleteNote.Persistence;

namespace Api.Features.Notes.DeleteNote;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddDeleteNoteSlice(this IServiceCollection services)
    {
        services.AddScoped<IDeleteNotePersistence, DeleteNoteDataAccess>();
        services.AddScoped<DeleteNoteService>();
        services.AddScoped<DeleteNoteFacade>();

        return services;
    }
}