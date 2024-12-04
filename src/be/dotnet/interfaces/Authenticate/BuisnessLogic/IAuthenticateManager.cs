using interfaces.Entities;
using Interfaces.Settings.BuisnessLogic;

namespace Interfaces.Authenticate.BuisnessLogic
{
    public interface IAuthenticateManager
    {
        SettingsViewModel GetSettings();

        bool IsMember(User? user, string leagueId);

        bool IsEditor(User? user, string leagueId);

        bool IsAdmin(User? user);
    }
}
