using DiySoccer.Application.Core.Models;
using MediatR;

namespace DiySoccer.Application.Leagues.Queries.GetAllWithPagination;

public record GetLeaguesWithPaginationQuery : IRequest<PaginatedList<GetAllLeagueDto>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}