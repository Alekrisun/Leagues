using DiySoccer.Core.Attributes;
using Interfaces.Core;
using Interfaces.Unions.BuisnessLogic;
using Interfaces.Unions.BuisnessLogic.Models.Tournaments;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class TournamentsApiController : BaseApiController
    {
        private readonly ITournamentsManager _tournamentsManager;

        public TournamentsApiController(ITournamentsManager tournamentsManager)
        {
            _tournamentsManager = tournamentsManager;
        }

        #region GET

        [Route("api/tournaments/{tournamentId}/info")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public TournamentInfoViewModel GetInfo(string tournamentId)
        {
            var model = _tournamentsManager.GetTournamentInfo(tournamentId);
            return (model);
        }

        #endregion
    }
}