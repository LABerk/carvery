using Api.Features.Notes.CreateNote;
using Api.Features.Notes.DeleteNote;
using Api.Features.Notes.GetNoteById;
using Api.Features.Notes.GetNotes;
using Api.Features.Notes.UpdateNote;

namespace Api.Features.Notes;

public static class DependencyInjectionMapping
{
    public static IServiceCollection AddNotesFeature(this IServiceCollection services)
    {
        return services
            .AddCreateNoteSlice()
            .AddGetNotesSlice()
            .AddGetNoteByIdSlice()
            .AddUpdateNoteSlice()
            .AddDeleteNoteSlice();
    }
}