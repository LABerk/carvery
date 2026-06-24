using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjectById.Domain;

public sealed record GetProjectByIdResponse(Project? Project);
