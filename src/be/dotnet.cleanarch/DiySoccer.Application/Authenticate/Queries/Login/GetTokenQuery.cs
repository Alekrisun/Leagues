using MediatR;

namespace DiySoccer.Application.Authenticate.Queries.Login;

public record GetTokenQuery : IRequest<GetTokenDto?>
{
    public string Username { get; set; }
    public string Password { get; set; }
}