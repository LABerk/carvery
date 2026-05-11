namespace Api.Features.Notes.CreateNote.Domain;

public sealed record CreateNoteCommand(string Title, string? Content);