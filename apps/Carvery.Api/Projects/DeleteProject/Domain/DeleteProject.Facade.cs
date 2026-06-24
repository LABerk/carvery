namespace Api.Features.Projects.DeleteProject.Domain;

public class DeleteProjectFacade(DeleteProjectService service)
{
    private readonly DeleteProjectService _service = service;

    public async Task<DeleteProjectResponse> ExecuteAsync(
        DeleteProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var deleted = await _service.ExecuteAsync(command, cancellationToken);
        return new DeleteProjectResponse(deleted);
    }
}
