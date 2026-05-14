using Api.Features.Notes.UpdateNote.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Notes.UpdateNote.Http;

[ApiController]
[Route("Notes")]
public class UpdateNoteController(UpdateNoteFacade facade) : ControllerBase
{
    private readonly UpdateNoteFacade _facade = facade;

    [HttpPut("{id:int}", Name = "UpdateNote")]
    public async Task<ActionResult<Note>> UpdateNote(int id, [FromBody] UpdateNoteRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateNoteCommand(id, request.Title, request.Content);
        var response = await _facade.ExecuteAsync(command, cancellationToken);
        if (response.Note is null)
        {
            return NotFound();
        }

        return Ok(response.Note);
    }
}