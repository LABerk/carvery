namespace Api.Features.Projects.CreateProject.Domain;

public sealed record CreateProjectCommand(
    string Name,
    string Wood,
    string Status,
    string? Description
);
