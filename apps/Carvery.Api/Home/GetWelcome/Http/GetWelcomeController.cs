using Api.Features.Home.GetWelcome.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Home.GetWelcome.Http;

[ApiController]
[Route("/")]
public class GetWelcomeController(GetWelcomeFacade facade) : ControllerBase
{
    private readonly GetWelcomeFacade _facade = facade;

    [HttpGet(Name = "GetWelcome")]
    public ActionResult<string> GetWelcome()
    {
        var response = _facade.Execute(new GetWelcomeCommand());
        return Ok(response.Message);
    }
}