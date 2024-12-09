using Interfaces.Authenticate.BuisnessLogic;
using Interfaces.Core;
using interfaces.Entities;
using Interfaces.Leagues.DataAccess;
using Interfaces.Leagues.DataAccess.Model;
using Microsoft.AspNetCore.Http;

namespace Implementations.Authenticate.BuisnessLogic
{
    public class AuthenticateManager : IAuthenticateManager
    {
        private readonly ILeaguesRepository _leaguesRepository;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticateManager(IHttpContextAccessor httpContextAccessor, ILeaguesRepository leaguesRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _leaguesRepository = leaguesRepository;
        }

        public User? GetCurrentUser()
        {
            if (_httpContextAccessor.HttpContext == null)
                return null;
            
            var userObject = _httpContextAccessor.HttpContext.Items["User"];
            if (userObject == null)
                return null;

            return (User)userObject;
        }

        public LeagueAccessStatus GetAccess(LeagueDb league, User? user)
        {
            if (user == null)
                return LeagueAccessStatus.Member;

            if (user.IsAdmin)
                return LeagueAccessStatus.Admin;
            
            return league.Admins.Any(x => x == user.Id)
                ? LeagueAccessStatus.Editor
                : LeagueAccessStatus.Member;
        }
        
        public LeagueAccessStatus GetAccess(LeagueDb league)
        {
            var user = GetCurrentUser();
            return GetAccess(league, user);
        }
        
        public LeagueAccessStatus GetAccess(string leagueId)
        {
            var league = _leaguesRepository.Get(leagueId);
            if (league == null)
                return LeagueAccessStatus.None;

            return GetAccess(league);
        }
    }
}
