using Carvery.Database.Entities;

namespace Api.Features.Notes.GetNoteById.Domain;

public interface IGetNoteByIdPersistence
{
    Task<Note?> ReadAsync(GetNoteByIdCommand command, CancellationToken cancellationToken);
}