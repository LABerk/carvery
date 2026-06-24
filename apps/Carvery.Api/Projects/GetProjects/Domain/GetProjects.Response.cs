using Carvery.Database.Entities;

namespace Api.Features.Projects.GetProjects.Domain;

public sealed record GetProjectsResponse(IReadOnlyList<Project> Projects);
