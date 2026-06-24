using Api.Features.Projects.DeleteProject.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Projects.DeleteProject.Http;

[ApiController]
[Route("projects")]
public class DeleteProjectController(DeleteProjectFacade facade) : ControllerBase
{
    private readonly DeleteProjectFacade _facade = facade;

    [HttpDelete("{id:int}", Name = "DeleteProject")]
    public async Task<IActionResult> DeleteProject(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteProjectCommand(id);
        var response = await _facade.ExecuteAsync(command, cancellationToken);
        if (!response.Deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
