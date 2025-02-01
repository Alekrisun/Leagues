using System.Text.Json.Serialization;

namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailGameUserDto
{
    public required string Id { get; set; }
    public int Score { get; set; }
    public int Help { get; set; }
}