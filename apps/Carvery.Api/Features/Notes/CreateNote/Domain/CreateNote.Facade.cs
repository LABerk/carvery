namespace Api.Features.Notes.CreateNote.Domain;

public class CreateNoteFacade(CreateNoteService service)
{
    private readonly CreateNoteService _service = service;

    public async Task<CreateNoteResponse> ExecuteAsync(CreateNoteCommand command, CancellationToken cancellationToken)
    {
        var note = await _service.ExecuteAsync(command, cancellationToken);
        return new CreateNoteResponse(note);
    }
}