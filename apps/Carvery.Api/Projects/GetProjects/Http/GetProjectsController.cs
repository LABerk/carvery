using Api.Features.Projects.GetProjects.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Projects.GetProjects.Http;

[ApiController]
[Route("projects")]
public class GetProjectsController(GetProjectsFacade facade) : ControllerBase
{
    private readonly GetProjectsFacade _facade = facade;

    [HttpGet(Name = "GetProjects")]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects(
        CancellationToken cancellationToken
    )
    {
        var response = await _facade.ExecuteAsync(cancellationToken);
        return Ok(response.Projects);
    }
}
