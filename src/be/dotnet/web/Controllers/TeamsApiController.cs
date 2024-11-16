using DiySoccer.Core.Attributes;
using Interfaces.Core;
using Interfaces.Teams.BuisnessLogic;
using Interfaces.Teams.BuisnessLogic.Models;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class TeamsController : BaseApiController
    {
        private readonly ITeamsManager _teamsManager;

        public TeamsController(ITeamsManager teamsManager)
        {
            _teamsManager = teamsManager;
        }

        #region GET

        [Route("api/leagues/{leagueId}/teams/{teamId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public TeamViewModel GetTeamByLeague(string leagueId, string teamId)
        {
            var team = _teamsManager.Get(leagueId, teamId);
            return team;
        }

        [Route("api/leagues/{leagueId}/teams/{teamId}/info")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public TeamInfoViewModel GetTeamInfo(string leagueId, string teamId)
        {
            var teamInfo = _teamsManager.GetInfo(leagueId, teamId);
            return (teamInfo);
        }

        [Route("api/leagues/{leagueId}/teams")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public List<TeamViewModel> GetTeamsByLeague(string leagueId)
        {
            var teams = _teamsManager.GetByLeague(leagueId).ToList();
            return (teams);
        }

        [Route("api/teams/search")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public List<IdNameViewModel> FindTeams(string query, int page, int pageSize)
        {
            var teams = _teamsManager.Find(query, page, pageSize).ToList();
            return (teams);
        }

        #endregion

        #region PUT

        [Route("api/leagues/{leagueId}/teams/{teamId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPut]
        public TeamViewModel Update(string leagueId, string teamId, [FromBody]TeamViewModel model)
        {
            _teamsManager.Update(leagueId, teamId, model);
            return (model);
        }

        #endregion

        #region POST

        [Route("api/leagues/{leagueId}/teams")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPost]
        public TeamViewModel Create(string leagueId, [FromBody]TeamViewModel model)
        {
            _teamsManager.Create(leagueId, model);
            return (model);
        }

        #endregion
    }
}