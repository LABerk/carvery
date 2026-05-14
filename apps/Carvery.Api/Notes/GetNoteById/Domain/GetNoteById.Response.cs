using Carvery.Database.Entities;

namespace Api.Features.Notes.GetNoteById.Domain;

public sealed record GetNoteByIdResponse(Note? Note);