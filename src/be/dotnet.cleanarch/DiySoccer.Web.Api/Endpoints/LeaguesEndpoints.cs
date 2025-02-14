using DiySoccer.Application.Core.Models;
using DiySoccer.Application.Leagues.Queries.GetAllWithPagination;
using DiySoccer.Application.Leagues.Queries.GetDetails;
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
            .MapGet(GetLeaguesWithPagination)
            .MapGet(GetLeagueDetail, "{leagueId}");
    }

    private async Task<Ok<PaginatedList<GetAllLeagueDto>>> GetLeaguesWithPagination(ISender sender)
    {
        var result = await sender.Send(new GetLeaguesWithPaginationQuery());

        return TypedResults.Ok(result);
    }
    
    private async Task<Results<Ok<GetLeagueDetailDto>, NotFound>> GetLeagueDetail(ISender sender, string leagueId)
    {
        if (string.IsNullOrEmpty(leagueId))
            return TypedResults.NotFound();
        
        var result = await sender.Send(new GetLeagueDetailQuery{LeagueId = leagueId});
        if (result == null)
            return TypedResults.NotFound();

        return TypedResults.Ok(result);
    }
}