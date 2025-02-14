using DiySoccer.Application.Core.Extensions;
using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Application.Core.Models;
using DiySoccer.Application.Leagues.Queries.GetAllWithPagination;
using MediatR;
using MongoDB.Driver;

namespace DiySoccer.Application.Authenticate.Queries.Login;

public class GetTokenHandler : IRequestHandler<GetTokenQuery, GetTokenDto?>
{
    private readonly IIdentityService _identityService;
    
    public GetTokenHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<GetTokenDto?> Handle(GetTokenQuery request, CancellationToken cancellationToken)
    {
        var token = _identityService.GenerateTokenAsync(request.Username, request.Password);
        if (string.IsNullOrEmpty(token.Item1))
            return Task.FromResult<GetTokenDto?>(null);

        return Task.FromResult(new GetTokenDto
        {
            Id = token.Item2.Id,
            FirstName = token.Item2.FirstName,
            LastName = token.Item2.LastName,
            Username = token.Item2.Username,
            Token = token.Item1,
            IsAdmin = token.Item2.IsAdmin,
        });
    }
}