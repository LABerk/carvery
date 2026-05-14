using Carvery.Database.Entities;

namespace Api.Features.Notes.UpdateNote.Domain;

public class UpdateNoteService(IUpdateNotePersistence persistence)
{
    private readonly IUpdateNotePersistence _persistence = persistence;

    public Task<Note?> ExecuteAsync(UpdateNoteCommand command, CancellationToken cancellationToken)
    {
        return _persistence.UpdateAsync(command, cancellationToken);
    }
}