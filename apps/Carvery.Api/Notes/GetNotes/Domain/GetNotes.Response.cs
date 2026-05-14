using Carvery.Database.Entities;

namespace Api.Features.Notes.GetNotes.Domain;

public sealed record GetNotesResponse(IReadOnlyList<Note> Notes);