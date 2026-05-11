using Carvery.Database.Entities;

namespace Api.Features.Notes.UpdateNote.Domain;

public interface IUpdateNotePersistence
{
    Task<Note?> UpdateAsync(UpdateNoteCommand command, CancellationToken cancellationToken);
}