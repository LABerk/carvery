using Carvery.Database.Entities;

namespace Api.Features.Notes.CreateNote.Domain;

public class CreateNoteService(ICreateNotePersistence persistence)
{
    private readonly ICreateNotePersistence _persistence = persistence;

    public Task<Note> ExecuteAsync(CreateNoteCommand command, CancellationToken cancellationToken)
    {
        return _persistence.CreateAsync(command, cancellationToken);
    }
}