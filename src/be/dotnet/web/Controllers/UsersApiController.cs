﻿using DiySoccer.Core.Attributes;
using Interfaces.Core;
using Interfaces.Users.BuisnessLogic;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class UsersController : BaseApiController
    {
        private readonly IUsersManager _usersManager;

        public UsersController(IUsersManager usersManager)
        {
            _usersManager = usersManager;
        }

        #region GET

        [Route("api/league/{leagueId}/users/")]
        [DiySoccerAuthorize(LeagueAccessStatus.Member)]
        [HttpGet]
        public IEnumerable<IdNameViewModel> FindPlayer(string leagueId, string query, int page, int pageSize, string exceptTeamIds = null)
        {
            var exceptTeamIdsList = string.IsNullOrEmpty(exceptTeamIds) ? Enumerable.Empty<string>() : exceptTeamIds.Split(',').Where(x => !string.IsNullOrEmpty(x));
            var results = _usersManager.FindPlayer(leagueId, query, exceptTeamIdsList, page, pageSize);
            return (results);
        }

        [Route("api/users/")]
        [DiySoccerAuthorize(LeagueAccessStatus.Admin)]
        [HttpGet]
        public IEnumerable<IdNameViewModel> FindUser(string query, int page, int pageSize)
        {
            var results = _usersManager.FindUser(query, page, pageSize);
            return (results);
        }

        #endregion
    }
}