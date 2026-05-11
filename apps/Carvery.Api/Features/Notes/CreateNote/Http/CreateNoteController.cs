using Api.Features.Notes.CreateNote.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Notes.CreateNote.Http;

[ApiController]
[Route("Notes")]
public class CreateNoteController(CreateNoteFacade facade) : ControllerBase
{
    private readonly CreateNoteFacade _facade = facade;

    [HttpPost(Name = "CreateNote")]
    public async Task<ActionResult<Note>> CreateNote([FromBody] CreateNoteCommand command, CancellationToken cancellationToken)
    {
        var response = await _facade.ExecuteAsync(command, cancellationToken);
        return CreatedAtRoute("GetNoteById", new { id = response.Note.Id }, response.Note);
    }
}