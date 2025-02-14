namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailTeamDto
{
    public string? Name { get; set; }
    public string? MediaId { get; set; }
    public string? Description { get; set; }
    public required List<string> GameIds { get; set; }
    public required List<string> UserIds { get; set; }
}