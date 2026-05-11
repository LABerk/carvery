using Carvery.Database.Context;
using Api.Features.Notes.DeleteNote.Domain;

namespace Api.Features.Notes.DeleteNote.Persistence;

public class DeleteNoteDataAccess(AppDbContext dbContext) : IDeleteNotePersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<bool> DeleteAsync(DeleteNoteCommand command, CancellationToken cancellationToken)
    {
        var note = await _dbContext.Notes.FindAsync(new object[] { command.Id }, cancellationToken);
        if (note is null)
        {
            return false;
        }

        _dbContext.Notes.Remove(note);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}