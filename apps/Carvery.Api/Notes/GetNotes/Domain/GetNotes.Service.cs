using Carvery.Database.Entities;

namespace Api.Features.Notes.GetNotes.Domain;

public class GetNotesService(IGetNotesPersistence persistence)
{
    private readonly IGetNotesPersistence _persistence = persistence;

    public Task<IReadOnlyList<Note>> ExecuteAsync(GetNotesCommand _command, CancellationToken cancellationToken)
    {
        return _persistence.ReadAsync(cancellationToken);
    }
}