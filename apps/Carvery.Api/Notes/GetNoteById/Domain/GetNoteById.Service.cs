using Carvery.Database.Entities;

namespace Api.Features.Notes.GetNoteById.Domain;

public class GetNoteByIdService(IGetNoteByIdPersistence persistence)
{
    private readonly IGetNoteByIdPersistence _persistence = persistence;

    public Task<Note?> ExecuteAsync(GetNoteByIdCommand command, CancellationToken cancellationToken)
    {
        return _persistence.ReadAsync(command, cancellationToken);
    }
}