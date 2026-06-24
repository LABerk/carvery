namespace Api.Features.Projects.UpdateProject.Http;

public sealed record UpdateProjectRequest(
    string Name,
    string Wood,
    string Status,
    string? Description
);
