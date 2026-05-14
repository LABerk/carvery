using Api.Features.Notes.UpdateNote.Domain;
using Carvery.Database.Context;
using Carvery.Database.Entities;

namespace Api.Features.Notes.UpdateNote.Persistence;

public class UpdateNoteDataAccess(AppDbContext dbContext) : IUpdateNotePersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Note?> UpdateAsync(UpdateNoteCommand command, CancellationToken cancellationToken)
    {
        var note = await _dbContext.Notes.FindAsync(new object[] { command.Id }, cancellationToken);
        if (note is null)
        {
            return null;
        }

        note.Title = command.Title;
        note.Content = command.Content;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return note;
    }
}