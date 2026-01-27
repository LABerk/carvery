using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("/")]
public class WelcomeController(ILogger<WelcomeController> logger) : ControllerBase
{
    private static readonly string Welcome = "Welcome";
    private readonly ILogger<WelcomeController> _logger = logger;

    [HttpGet(Name = "GetWelcome")]
    public string GetWelcome()
    {
        return Welcome;
    }
}
