namespace Api.Features.Notes.UpdateNote.Domain;

public class UpdateNoteFacade(UpdateNoteService service)
{
    private readonly UpdateNoteService _service = service;

    public async Task<UpdateNoteResponse> ExecuteAsync(UpdateNoteCommand command, CancellationToken cancellationToken)
    {
        var note = await _service.ExecuteAsync(command, cancellationToken);
        return new UpdateNoteResponse(note);
    }
}