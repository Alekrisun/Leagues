using Interfaces.Core;
using interfaces.Entities;
using Interfaces.Leagues.BuisnessLogic.Model;
using Interfaces.Leagues.DataAccess.Model;

namespace Interfaces.Authenticate.BuisnessLogic
{
    public interface IAuthenticateManager
    {
        User? GetCurrentUser();
        LeagueAccessStatus GetAccess(LeagueDb league, User? user);
        LeagueAccessStatus GetAccess(LeagueDb league);
        LeagueAccessStatus GetAccess(string leagueId);
    }
}
