using DiySoccer.Domain.Enums;

namespace DiySoccer.Application.Leagues.Queries.GetAllWithPagination;

public class GetAllLeagueDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public LeagueType Type { get; set; }
    public string SubName { get; set; }
    public string Information { get; set; }
    public string MediaId { get; set; }
}