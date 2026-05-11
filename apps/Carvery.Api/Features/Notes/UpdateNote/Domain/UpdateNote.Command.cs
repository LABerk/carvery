namespace Api.Features.Notes.UpdateNote.Domain;

public sealed record UpdateNoteCommand(int Id, string Title, string? Content);