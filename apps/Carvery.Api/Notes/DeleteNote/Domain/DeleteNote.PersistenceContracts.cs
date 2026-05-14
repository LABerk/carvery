namespace Api.Features.Notes.DeleteNote.Domain;

public interface IDeleteNotePersistence
{
    Task<bool> DeleteAsync(DeleteNoteCommand command, CancellationToken cancellationToken);
}