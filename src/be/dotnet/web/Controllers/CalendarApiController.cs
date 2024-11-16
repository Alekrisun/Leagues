using DiySoccer.Core.Attributes;
using Interfaces.Calendar;
using Interfaces.Calendar.Models;
using Interfaces.Core;
using Interfaces.Events.BuisnessLogic;
using Interfaces.Events.BuisnessLogic.Models;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class CalendarApiController : BaseApiController
    {
        private readonly IEventsManager _eventsManager;
        private readonly ICalendarManager _calendarManager;

        public CalendarApiController(IEventsManager eventsManager, ICalendarManager calendarManager)
        {
            _eventsManager = eventsManager;
            _calendarManager = calendarManager;
        }

        #region GET
        
        [Route("api/leagues/{leagueId}/calendar")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public CalendarViewModel GetCalendar(string leagueId)
        {
            var model = _calendarManager.GetViewModel(leagueId);
            return model;
        }

        [Route("api/leagues/{leagueId}/events")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public IEnumerable<IdNameViewModel> GetEvents(string leagueId)
        {
            var model = _calendarManager.GetEvents(leagueId);
            return model;
        }

        #endregion

        #region PUT

        [Route("api/leagues/{leagueId}/events/{eventId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPut]
        public EventVewModel Update(string leagueId, [FromBody]EventVewModel model)
        {
            var updated = _eventsManager.Update(leagueId, model);
            return updated;
        }

        #endregion

        #region POST

        [Route("api/leagues/{leagueId}/events")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPost]
        public EventVewModel Create(string leagueId)
        {
            var model = _eventsManager.Create(leagueId);
            return model;
        }

        [Route("api/leagues/{leagueId}/events/{eventId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPost]
        public EventGameVewModel CreateEventGame(string leagueId, string eventId)
        {
            var model = _eventsManager.CreateEventGame(leagueId, eventId);
            return model;
        }

        #endregion

        #region DELETE

        [Route("api/leagues/{leagueId}/events/{eventId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpDelete]
        public void Delete(string leagueId, string eventId)
        {
            _eventsManager.Delete(eventId);
        }

        [Route("api/leagues/{leagueId}/events/{eventId}/{eventGameId}")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpDelete]
        public void Delete(string leagueId, string eventId, int eventGameId)
        {
            _eventsManager.DeleteEventGame(eventId, eventGameId);
        }

        #endregion
    }
}