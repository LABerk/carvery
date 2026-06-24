using Api.Features.Projects.CreateProject.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Projects.CreateProject.Http;

[ApiController]
[Route("projects")]
public class CreateProjectController(CreateProjectFacade facade) : ControllerBase
{
    private readonly CreateProjectFacade _facade = facade;

    [HttpPost(Name = "CreateProject")]
    public async Task<ActionResult<Project>> CreateProject(
        [FromBody] CreateProjectCommand command,
        CancellationToken cancellationToken
    )
    {
        var response = await _facade.ExecuteAsync(command, cancellationToken);
        return CreatedAtRoute("GetProjectById", new { id = response.Project.Id }, response.Project);
    }
}
