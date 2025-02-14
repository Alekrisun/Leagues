
using Interfaces.Authenticate.BuisnessLogic;
using Interfaces.Core;
using interfaces.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DiySoccer.Core.Attributes
{
    public class DiySoccerAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly LeagueAccessStatus _accessStatus;

        public DiySoccerAuthorizeAttribute(LeagueAccessStatus accessStatus)
        {
            _accessStatus = accessStatus;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (User)context.HttpContext.Items["User"];
            if (user == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var authenticateManager = context.HttpContext.RequestServices.GetService<IAuthenticateManager>();
            
            var leagueId = context.RouteData.Values.ContainsKey("leagueId") 
                ? context.RouteData.Values["leagueId"]?.ToString() 
                : string.Empty;

            if (string.IsNullOrEmpty(leagueId))
                leagueId = context.RouteData.Values.ContainsKey("tournamentId")
                    ? context.RouteData.Values["tournamentId"]?.ToString()
                    : string.Empty;

            if (string.IsNullOrEmpty(leagueId))
                new UnauthorizedResult();
            
            if (authenticateManager.GetAccess(leagueId) == LeagueAccessStatus.None)
                context.Result = new UnauthorizedResult();
        }
    }
}