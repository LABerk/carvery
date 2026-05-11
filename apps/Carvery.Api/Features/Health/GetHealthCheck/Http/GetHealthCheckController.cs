using Api.Features.Health.GetHealthCheck.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Health.GetHealthCheck.Http;

[ApiController]
[Route("HealthCheck")]
public class GetHealthCheckController(GetHealthCheckFacade facade) : ControllerBase
{
    private readonly GetHealthCheckFacade _facade = facade;

    [HttpGet(Name = "GetHealthCheck")]
    public ActionResult<GetHealthCheckResponse> GetHealthCheck()
    {
        var response = _facade.Execute(new GetHealthCheckCommand());
        return Ok(response);
    }
}