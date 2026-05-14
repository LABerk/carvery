namespace Api.Features.Health.GetHealthCheck.Domain;

public class GetHealthCheckFacade(GetHealthCheckService service)
{
    private readonly GetHealthCheckService _service = service;

    public GetHealthCheckResponse Execute(GetHealthCheckCommand command)
    {
        var status = _service.Execute(command);
        return new GetHealthCheckResponse(status);
    }
}