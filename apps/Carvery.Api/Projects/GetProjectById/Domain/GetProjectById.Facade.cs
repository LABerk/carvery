namespace Api.Features.Projects.GetProjectById.Domain;

public class GetProjectByIdFacade(GetProjectByIdService service)
{
    private readonly GetProjectByIdService _service = service;

    public async Task<GetProjectByIdResponse> ExecuteAsync(
        GetProjectByIdCommand command,
        CancellationToken cancellationToken
    )
    {
        var project = await _service.ExecuteAsync(command, cancellationToken);
        return new GetProjectByIdResponse(project);
    }
}
