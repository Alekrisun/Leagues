using DiySoccer.Application.Core.Security;
using DiySoccer.Domain.Constants;
using MediatR;

namespace DiySoccer.Application.Leagues.Queries.GetDetails;

//[Authorize(Role = Roles.Member)]
public record GetLeagueDetailQuery : IRequest<GetLeagueDetailDto>
{
    public required string LeagueId { get; init; }
}