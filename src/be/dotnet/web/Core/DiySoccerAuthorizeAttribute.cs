
using Interfaces.Authenticate.BuisnessLogic;
using Interfaces.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DiySoccer.Core.Attributes
{
    public class DiySoccerAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly LeagueAccessStatus _accessStatus;

        public IAuthenticateManager AuthenticateManager { get; set; }

        public DiySoccerAuthorizeAttribute(LeagueAccessStatus accessStatus)
        {
            _accessStatus = accessStatus;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var leagueId = context.RouteData.Values.ContainsKey("leagueId") 
                ? context.RouteData.Values["leagueId"]?.ToString() 
                : string.Empty;

            if (string.IsNullOrEmpty(leagueId))
                leagueId = context.RouteData.Values.ContainsKey("tournamentId")
                    ? context.RouteData.Values["tournamentId"]?.ToString()
                    : string.Empty;

            switch (_accessStatus)
            {
                case LeagueAccessStatus.Member:
                    if (!AuthenticateManager.IsMember(leagueId))
                        context.Result = new UnauthorizedResult();
                    break;
                case LeagueAccessStatus.Editor:
                    if (!AuthenticateManager.IsEditor(leagueId))
                        context.Result = new UnauthorizedResult();
                    break;
                case LeagueAccessStatus.Admin:
                    if (!AuthenticateManager.IsAdmin())
                        context.Result = new UnauthorizedResult();
                    break;
                default:
                    context.Result = new UnauthorizedResult();
                    break;
            }
        }
    }
}