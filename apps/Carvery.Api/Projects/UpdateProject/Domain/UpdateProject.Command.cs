namespace Api.Features.Projects.UpdateProject.Domain;

public sealed record UpdateProjectCommand(
    int Id,
    string Name,
    string Wood,
    string Status,
    string? Description
);
