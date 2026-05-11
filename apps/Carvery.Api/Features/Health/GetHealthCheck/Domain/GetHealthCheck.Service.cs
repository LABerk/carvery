namespace Api.Features.Health.GetHealthCheck.Domain;

public class GetHealthCheckService
{
    public string Execute(GetHealthCheckCommand _command)
    {
        return "Healthy";
    }
}