using Api.Features.Notes.CreateNote.Domain;
using Carvery.Database.Context;
using Carvery.Database.Entities;

namespace Api.Features.Notes.CreateNote.Persistence;

public class CreateNoteDataAccess(AppDbContext dbContext) : ICreateNotePersistence
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<Note> CreateAsync(CreateNoteCommand command, CancellationToken cancellationToken)
    {
        var note = new Note
        {
            Title = command.Title,
            Content = command.Content
        };

        _dbContext.Notes.Add(note);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return note;
    }
}