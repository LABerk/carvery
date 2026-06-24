using Api.Features.Projects.UpdateProject.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Projects.UpdateProject.Http;

[ApiController]
[Route("projects")]
public class UpdateProjectController(UpdateProjectFacade facade) : ControllerBase
{
    private readonly UpdateProjectFacade _facade = facade;

    [HttpPut("{id:int}", Name = "UpdateProject")]
    public async Task<ActionResult<Project>> UpdateProject(
        int id,
        [FromBody] UpdateProjectRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new UpdateProjectCommand(
            id,
            request.Name,
            request.Wood,
            request.Status,
            request.Description
        );
        var response = await _facade.ExecuteAsync(command, cancellationToken);
        if (response.Project is null)
        {
            return NotFound();
        }

        return Ok(response.Project);
    }
}
