using DiySoccer.Core.Attributes.Services;
using interfaces.Models;
using interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api;

[ApiController]
[Route("[controller]")]
public class AuthenticateController
{
    private IUserService _userService;

    public AuthenticateController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);

        if (response == null)
            return new JsonResult(new { message = "Username or password is incorrect" });

        return new JsonResult(response);
    }
}