using DiySoccer.Core.Attributes;
using Interfaces.Core;
using Interfaces.Leagues.BuisnessLogic;
using Interfaces.Leagues.BuisnessLogic.Model;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class LeaguesApiController : BaseApiController
    {
        private readonly ILeaguesManager _leaguesManager;

        public LeaguesApiController(ILeaguesManager leaguesManager)
        {
            _leaguesManager = leaguesManager;
        }

        #region GET

        [Route("api/leagues/{leagueId}/statistics")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public LeagueStatisticsViewModel GetLeagueStatistic(string leagueId)
        {
            var statistic = _leaguesManager.GetStatisticByLeague(leagueId);
            return statistic;
        }

        [Route("api/leagues/{leagueId}/table")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public LeagueTableViewModel GetTable(string leagueId)
        {
            var statistic = _leaguesManager.GetTable(leagueId);
            return statistic;
        }

        [Route("api/leagues/{leagueId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Admin)]
        [HttpGet]
        public LeagueUnsecureViewModel GetUnsecure(string leagueId)
        {
            var league = _leaguesManager.GetUnsecure(leagueId);
            return  league;
        }

        [Route("api/leagues/{leagueId}/info")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public LeagueInfoViewModel GetInfo(string leagueId)
        {
            var league = _leaguesManager.GetInfo(leagueId);
            return  league;
        }

        [Route("api/leagues")]
        [HttpGet]
        public LeaguesViewModel GetLeagues()
        {
            var league = _leaguesManager.GetLeagues();
            return  league;
        }

        #endregion

        #region PUT

        [Route("api/leagues/{leagueId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Admin)]
        [HttpPut]
        public LeagueUnsecureViewModel Update(LeagueUnsecureViewModel model)
        {
            _leaguesManager.Update(model);

            return model;
        }

        #endregion

        #region POST

        [Route("api/leagues")]
        [DiySoccerAuthorize(LeagueAccessStatus.Admin)]
        [HttpPost]
        public LeagueUnsecureViewModel Create(LeagueUnsecureViewModel model)
        {
            _leaguesManager.Create(model);

            return model;
        }

        #endregion

        #region DELETE

        [Route("api/leagues/{id}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Admin)]
        [HttpDelete]
        public void Delete(string id)
        {
            _leaguesManager.Delete(id);
        }

        #endregion
    }
}