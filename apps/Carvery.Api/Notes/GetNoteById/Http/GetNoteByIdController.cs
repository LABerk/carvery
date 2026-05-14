using Api.Features.Notes.GetNoteById.Domain;
using Carvery.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Notes.GetNoteById.Http;

[ApiController]
[Route("Notes")]
public class GetNoteByIdController(GetNoteByIdFacade facade) : ControllerBase
{
    private readonly GetNoteByIdFacade _facade = facade;

    [HttpGet("{id:int}", Name = "GetNoteById")]
    public async Task<ActionResult<Note>> GetNoteById(int id, CancellationToken cancellationToken)
    {
        var response = await _facade.ExecuteAsync(new GetNoteByIdCommand(id), cancellationToken);
        if (response.Note is null)
        {
            return NotFound();
        }

        return Ok(response.Note);
    }
}