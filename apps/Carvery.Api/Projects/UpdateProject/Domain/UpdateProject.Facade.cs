namespace Api.Features.Projects.UpdateProject.Domain;

public class UpdateProjectFacade(UpdateProjectService service)
{
    private readonly UpdateProjectService _service = service;

    public async Task<UpdateProjectResponse> ExecuteAsync(
        UpdateProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var project = await _service.ExecuteAsync(command, cancellationToken);
        return new UpdateProjectResponse(project);
    }
}
