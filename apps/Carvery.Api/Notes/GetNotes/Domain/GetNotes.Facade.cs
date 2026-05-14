namespace Api.Features.Notes.GetNotes.Domain;

public class GetNotesFacade(GetNotesService service)
{
    private readonly GetNotesService _service = service;

    public async Task<GetNotesResponse> ExecuteAsync(GetNotesCommand command, CancellationToken cancellationToken)
    {
        var notes = await _service.ExecuteAsync(command, cancellationToken);
        return new GetNotesResponse(notes);
    }
}