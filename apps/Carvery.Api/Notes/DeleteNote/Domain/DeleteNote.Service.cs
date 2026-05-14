namespace Api.Features.Notes.DeleteNote.Domain;

public class DeleteNoteService(IDeleteNotePersistence persistence)
{
    private readonly IDeleteNotePersistence _persistence = persistence;

    public Task<bool> ExecuteAsync(DeleteNoteCommand command, CancellationToken cancellationToken)
    {
        return _persistence.DeleteAsync(command, cancellationToken);
    }
}