using DiySoccer.Application.Core.Models;
using DiySoccer.Application.Leagues.Queries.GetAllWithPagination;
using DiySoccer.Web.Api.Core;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Web.Api.Endpoints;

public class LeaguesEndpoints : EndpointGroupBase
{
    public override string GroupRoute => "leagues";
    
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            //.RequireAuthorization()
            .MapGet(GetLeaguesWithPagination);
    }
    
    public async Task<Ok<PaginatedList<GetAllLeagueDto>>> GetLeaguesWithPagination(ISender sender, [FromBody] GetLeaguesWithPaginationQuery query)
    {
        var result = await sender.Send(query);

        return TypedResults.Ok(result);
    }
}