namespace Api.Features.Notes.UpdateNote.Http;

public sealed record UpdateNoteRequest(string Title, string? Content);