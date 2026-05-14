namespace Api.Features.Home.GetWelcome.Domain;

public class GetWelcomeService
{
    public string Execute(GetWelcomeCommand _command)
    {
        return "Welcome";
    }
}