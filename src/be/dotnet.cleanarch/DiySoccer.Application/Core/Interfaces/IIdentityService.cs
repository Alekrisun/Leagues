using DiySoccer.Domain.Entities;

namespace DiySoccer.Application.Core.Interfaces;

public interface IIdentityService
{
    Task<string?> GetUserIdAsync(string userId);
    Task<ApplicationUserDb?> GetUserAsync(string userId);
    Tuple<string?, ApplicationUserDb?> GenerateTokenAsync(string userName, string password);
}
