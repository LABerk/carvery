using Api.Features.Notes.GetNotes.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Notes.GetNotes.Http;

[ApiController]
[Route("Notes")]
public class GetNotesController(GetNotesFacade facade) : ControllerBase
{
    private readonly GetNotesFacade _facade = facade;

    [HttpGet(Name = "GetNotes")]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes(CancellationToken cancellationToken)
    {
        var response = await _facade.ExecuteAsync(new GetNotesCommand(), cancellationToken);
        return Ok(response.Notes);
    }
}