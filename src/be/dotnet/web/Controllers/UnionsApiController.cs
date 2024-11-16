using DiySoccer.Core.Attributes;
using Interfaces.Core;
using Interfaces.Teams.BuisnessLogic;
using Interfaces.Teams.BuisnessLogic.Models;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class UnionsApiController : BaseApiController
    {
        private readonly ITeamsManager _teamsManager;

        public UnionsApiController(ITeamsManager teamsManager)
        {
            _teamsManager = teamsManager;
        }

        #region POST

        [Route("api/unions/{unionId}/teams/{teamId}/copy")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPost]
        public TeamViewModel Copy(string unionId, string teamId)
        {
            var model = _teamsManager.Copy(teamId, unionId);
            return (model);
        }

        #endregion
    }
}