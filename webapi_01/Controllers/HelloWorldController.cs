using Microsoft.AspNetCore.Mvc;

namespace webapi_01.Controllers;

[ApiController]
[Route("[controller]")]
public class HelloWorldController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public HelloWorldController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("/GetHello")]
    public string GetHello()
    {
        return "Hello World!";
    }

    [HttpGet]
    [Route("/GetGoodbye")]
    public string GetGoodbye()
    {
        return "Goodbye World!";
    }
}
