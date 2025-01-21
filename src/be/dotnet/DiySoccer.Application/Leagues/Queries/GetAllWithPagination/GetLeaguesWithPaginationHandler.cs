using DiySoccer.Application.Core.Extensions;
using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Application.Core.Models;
using MediatR;
using MongoDB.Driver;

namespace DiySoccer.Application.Leagues.Queries.GetAllWithPagination;

public class GetLeaguesWithPaginationHandler : IRequestHandler<GetLeaguesWithPaginationQuery, PaginatedList<GetAllLeagueDto>>
{
    private readonly IApplicationDbContext _context;
    
    public GetLeaguesWithPaginationHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<PaginatedList<GetAllLeagueDto>> Handle(GetLeaguesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Leagues
            .AsQueryable()
            .Select(x => new GetAllLeagueDto
            {
                Id = x.EntityId,
                Name = x.Name,
                Description = x.Description,
            })
            .PaginatedListAsync(request.Page, request.PageSize);
    }
    
}