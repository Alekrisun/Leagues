using Interfaces.Authenticate.BuisnessLogic;
using Interfaces.Core;
using interfaces.Entities;
using Interfaces.Leagues.BuisnessLogic;
using Interfaces.Leagues.BuisnessLogic.Model;
using interfaces.Services;
using Interfaces.Settings.BuisnessLogic;
using Interfaces.Users.DataAccess;
using Microsoft.AspNetCore.Http;

namespace Implementations.Authenticate.BuisnessLogic
{
    public class AuthenticateManager : IAuthenticateManager
    {
        private readonly ILeaguesManager _leaguesManager;
        private readonly IUsersRepository _usersRepository;
        private readonly IUserService _userService;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticateManager(ILeaguesManager leaguesManager, IUsersRepository usersRepository, IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _leaguesManager = leaguesManager;
            _usersRepository = usersRepository;
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
        }

        public SettingsViewModel GetSettings()
        {
            var model = new SettingsViewModel();
            
            var currentUser = GetCurrentUser();
            model.Permissions.IsAdmin = IsAdmin(currentUser);
            model.Permissions.IsAuthenticated = currentUser != null;
            
            var relationships = new Dictionary<string, string>();
            var leagues = _leaguesManager.GetAllUnsecure();
            foreach (var league in leagues)
            {
                var access = GetAccess(league, currentUser);
                relationships.Add(league.Id, ((int)access).ToString());
            }
            model.Permissions.Relationships = relationships;
            return model;
        }

        private User? GetCurrentUser()
        {
            if (_httpContextAccessor.HttpContext == null)
                return null;
            
            var userObject = _httpContextAccessor.HttpContext.Items["User"];
            if (userObject == null)
                return null;

            return (User)userObject;
        }

        private LeagueAccessStatus GetAccess(LeagueUnsecureViewModel league, User? user)
        {
            if (user == null)
                return LeagueAccessStatus.Member;
            
            if (IsAdmin(user))
                return LeagueAccessStatus.Admin;
            
            //if (string.IsNullOrEmpty(league.VkGroup))
            //{
            //    return league.Admins.Any(x => x.Id == currentUserId)
            //        ? LeagueAccessStatus.Editor
            //        : LeagueAccessStatus.Member;
            //}
            //var loginInfo = context.Authentication.GetExternalLoginInfoAsync();
            //if (loginInfo == null || loginInfo.Result == null)
            //    return LeagueAccessStatus.Undefined;
            //var vkUserIdClaim = loginInfo.Result.ExternalIdentity.Claims.FirstOrDefault(c => c.Type == "VkUserId");
            //if (vkUserIdClaim == null)
            //    return LeagueAccessStatus.Undefined;
            //var api = new VkApi();
            //long vkUserId;
            //try
            //{
            //    vkUserId = long.Parse(vkUserIdClaim.Value);
            //}
            //catch (Exception)
            //{
            //    return LeagueAccessStatus.Undefined;
            //}
            //var response = api.Groups.IsMember("spbdiyfootball", vkUserId, new long[] { vkUserId }, false);
            //if (!response[0].Member)
            //    return LeagueAccessStatus.Undefined;
            
            return league.Admins.Any(x => x.Id == user.Id.ToString())
                ? LeagueAccessStatus.Editor
                : LeagueAccessStatus.Member;
        }

        public bool IsMember(User? user,string unionId)
        {
            if (IsAdmin(user))
                return true;
            
            var union = _leaguesManager.GetUnsecure(unionId);
            if (union == null)
                return false;
            
            var currentUserId = GetCurrentUser();
            
            var access = GetAccess(union, user);
            return access == LeagueAccessStatus.Member ||
                access == LeagueAccessStatus.Editor || 
                access == LeagueAccessStatus.Admin;
        }

        public bool IsEditor(User? user, string leagueId)
        {
            if (IsAdmin(user))
                return true;

            var league = _leaguesManager.GetUnsecure(leagueId);
            if (league == null)
                return false;

            var currentUserId = GetCurrentUser();

            var access = GetAccess(league, user);
            return access == LeagueAccessStatus.Editor || access == LeagueAccessStatus.Admin;
        }

        public bool IsAdmin(User? user)
        {
            return user != null && user.IsAdmin;
        }
    }
}
