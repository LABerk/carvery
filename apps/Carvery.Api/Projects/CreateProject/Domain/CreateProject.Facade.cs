namespace Api.Features.Projects.CreateProject.Domain;

public class CreateProjectFacade(CreateProjectService service)
{
    private readonly CreateProjectService _service = service;

    public async Task<CreateProjectResponse> ExecuteAsync(
        CreateProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var project = await _service.ExecuteAsync(command, cancellationToken);
        return new CreateProjectResponse(project);
    }
}
