using DiySoccer.Application.Authenticate.Queries.Login;
using DiySoccer.Web.Api.Core;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Web.Api.Endpoints;

public class AuthenticateEndpoints : EndpointGroupBase
{
    public override string GroupRoute => "authenticate";
    
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            //.RequireAuthorization()
            .MapGet(Login);
    }

    private async Task<Results<Ok<GetTokenDto>, NotFound>> Login(ISender sender, [FromBody] GetTokenQuery query)
    {
        var result = await sender.Send(query);
        if (result == null)
            return TypedResults.NotFound();

        return TypedResults.Ok(result);
    }
}