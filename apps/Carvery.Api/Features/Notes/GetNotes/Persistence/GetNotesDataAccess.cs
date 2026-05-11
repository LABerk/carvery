using Carvery.Database.Context;
using Carvery.Database.Entities;
using Api.Features.Notes.GetNotes.Domain;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Notes.GetNotes.Persistence;

public class GetNotesDataAccess(AppDbContext dbContext) : IGetNotesPersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<IReadOnlyList<Note>> ReadAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Notes
            .OrderByDescending(note => note.CreatedAtUtc)
            .ToListAsync(cancellationToken);
    }
}