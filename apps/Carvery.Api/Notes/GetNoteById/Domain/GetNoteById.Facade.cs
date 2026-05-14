namespace Api.Features.Notes.GetNoteById.Domain;

public class GetNoteByIdFacade(GetNoteByIdService service)
{
    private readonly GetNoteByIdService _service = service;

    public async Task<GetNoteByIdResponse> ExecuteAsync(GetNoteByIdCommand command, CancellationToken cancellationToken)
    {
        var note = await _service.ExecuteAsync(command, cancellationToken);
        return new GetNoteByIdResponse(note);
    }
}