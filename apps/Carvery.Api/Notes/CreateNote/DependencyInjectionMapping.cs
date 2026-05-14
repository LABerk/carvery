using Api.Features.Notes.CreateNote.Domain;
using Api.Features.Notes.CreateNote.Persistence;

namespace Api.Features.Notes.CreateNote;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddCreateNoteSlice(this IServiceCollection services)
    {
        services.AddScoped<ICreateNotePersistence, CreateNoteDataAccess>();
        services.AddScoped<CreateNoteService>();
        services.AddScoped<CreateNoteFacade>();

        return services;
    }
}