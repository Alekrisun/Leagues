namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailEventDto
{
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public IList<GetLeagueDetailEventGameDto> Games { get; set; } = new List<GetLeagueDetailEventGameDto>();
}