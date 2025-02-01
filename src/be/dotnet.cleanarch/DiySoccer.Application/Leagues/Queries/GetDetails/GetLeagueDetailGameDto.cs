using System.Text.Json.Serialization;

namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailGameDto
{
    public string? EventId { get; set; }
    
    public required string HomeTeamId { get; set; }
    public int HomeTeamScore { get; set; }
    public string? HomeTeamBestMemberId { get; set; }
    public required IList<GetLeagueDetailGameUserDto> HomeMembers { get; set; }
    
    public required string GuestTeamId { get; set; }
    public int GuestTeamScore { get; set; }
    public string? GuestTeamBestMemberId { get; set; }
    public required IList<GetLeagueDetailGameUserDto> GuestMembers { get; set; }

    public GetLeagueDetailGameDto()
    {
        HomeMembers = new List<GetLeagueDetailGameUserDto>();
        GuestMembers = new List<GetLeagueDetailGameUserDto>();
    }
}