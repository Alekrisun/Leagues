namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string SubName { get; set; }
    public string Description { get; set; }
    public string Information { get; set; }
    public string MediaId { get; set; }
    public IDictionary<string, GetLeagueDetailTeamDto> Teams { get; set; }
    public IDictionary<string, GetLeagueDetailGameDto> Games { get; set; }
    public IDictionary<string, string> Users { get; set; }
    public IDictionary<string, GetLeagueDetailEventDto> Events { get; set; }

    public GetLeagueDetailDto()
    {
        Teams = new Dictionary<string, GetLeagueDetailTeamDto>();
        Games = new Dictionary<string, GetLeagueDetailGameDto>();
        Users = new Dictionary<string, string>();
        Events = new Dictionary<string, GetLeagueDetailEventDto>();
    }
}