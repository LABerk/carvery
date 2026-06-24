namespace Api.Features.Projects.GetProjects.Domain;

public class GetProjectsFacade(GetProjectsService service)
{
    private readonly GetProjectsService _service = service;

    public async Task<GetProjectsResponse> ExecuteAsync(CancellationToken cancellationToken)
    {
        var projects = await _service.ExecuteAsync(cancellationToken);
        return new GetProjectsResponse(projects);
    }
}
