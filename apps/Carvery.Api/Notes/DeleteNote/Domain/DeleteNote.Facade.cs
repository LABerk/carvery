namespace Api.Features.Notes.DeleteNote.Domain;

public class DeleteNoteFacade(DeleteNoteService service)
{
    private readonly DeleteNoteService _service = service;

    public async Task<DeleteNoteResponse> ExecuteAsync(DeleteNoteCommand command, CancellationToken cancellationToken)
    {
        var deleted = await _service.ExecuteAsync(command, cancellationToken);
        return new DeleteNoteResponse(deleted);
    }
}