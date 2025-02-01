namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailDto
{
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