using Carvery.Database.Context;
using Carvery.Database.Entities;
using Api.Features.Notes.GetNoteById.Domain;

namespace Api.Features.Notes.GetNoteById.Persistence;

public class GetNoteByIdDataAccess(AppDbContext dbContext) : IGetNoteByIdPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Note?> ReadAsync(GetNoteByIdCommand command, CancellationToken cancellationToken)
    {
        return await _dbContext.Notes.FindAsync(new object[] { command.Id }, cancellationToken);
    }
}