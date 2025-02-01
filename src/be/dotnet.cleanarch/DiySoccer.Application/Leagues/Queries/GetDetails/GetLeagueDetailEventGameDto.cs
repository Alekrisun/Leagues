namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailEventGameDto
{
    public required int Id { get; set; }
    public required string HomeTeamId { get; set; }
    public required string GuestTeamId { get; set; }
}