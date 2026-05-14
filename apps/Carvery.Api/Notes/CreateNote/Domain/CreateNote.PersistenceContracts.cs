using Carvery.Database.Entities;

namespace Api.Features.Notes.CreateNote.Domain;

public interface ICreateNotePersistence
{
    Task<Note> CreateAsync(CreateNoteCommand command, CancellationToken cancellationToken);
}