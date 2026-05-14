using Api.Features.Notes.DeleteNote.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Notes.DeleteNote.Http;

[ApiController]
[Route("Notes")]
public class DeleteNoteController(DeleteNoteFacade facade) : ControllerBase
{
    private readonly DeleteNoteFacade _facade = facade;

    [HttpDelete("{id:int}", Name = "DeleteNote")]
    public async Task<IActionResult> DeleteNote(int id, CancellationToken cancellationToken)
    {
        var response = await _facade.ExecuteAsync(new DeleteNoteCommand(id), cancellationToken);
        if (!response.Deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}