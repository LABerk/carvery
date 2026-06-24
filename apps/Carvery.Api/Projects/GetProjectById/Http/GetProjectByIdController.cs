using Api.Features.Projects.GetProjectById.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Projects.GetProjectById.Http;

[ApiController]
[Route("projects")]
public class GetProjectByIdController(GetProjectByIdFacade facade) : ControllerBase
{
    private readonly GetProjectByIdFacade _facade = facade;

    [HttpGet("{id:int}", Name = "GetProjectById")]
    public async Task<ActionResult<Project>> GetProjectById(
        int id,
        CancellationToken cancellationToken
    )
    {
        var command = new GetProjectByIdCommand(id);
        var response = await _facade.ExecuteAsync(command, cancellationToken);
        if (response.Project is null)
        {
            return NotFound();
        }

        return Ok(response.Project);
    }
}
