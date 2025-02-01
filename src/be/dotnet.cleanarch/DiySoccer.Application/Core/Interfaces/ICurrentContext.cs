namespace DiySoccer.Application.Core.Interfaces;

public interface ICurrentContext
{
    Task<string?> GetCurrentUserId();
    string? GetCurrentLeagueId();
    
}
