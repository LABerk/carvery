using Carvery.Database.Entities;

namespace Api.Features.Notes.GetNotes.Domain;

public interface IGetNotesPersistence
{
    Task<IReadOnlyList<Note>> ReadAsync(CancellationToken cancellationToken);
}