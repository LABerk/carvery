namespace Api.Features.Home.GetWelcome.Domain;

public class GetWelcomeFacade(GetWelcomeService service)
{
    private readonly GetWelcomeService _service = service;

    public GetWelcomeResponse Execute(GetWelcomeCommand command)
    {
        var message = _service.Execute(command);
        return new GetWelcomeResponse(message);
    }
}