using DiySoccer.Application.Core.Interfaces;
using MediatR;
using MongoDB.Driver;
using DiySoccer.Domain.Entities;

namespace DiySoccer.Application.Leagues.Queries.GetDetails;

public class GetLeagueDetailHanlder : IRequestHandler<GetLeagueDetailQuery, GetLeagueDetailDto?>
{
    private readonly IApplicationDbContext _context;

    public GetLeagueDetailHanlder(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<GetLeagueDetailDto?> Handle(GetLeagueDetailQuery request, CancellationToken cancellationToken)
    {
        var league = await (await _context.Leagues
                .FindAsync(x => x.EntityId == request.LeagueId, cancellationToken: cancellationToken))
            .FirstOrDefaultAsync(cancellationToken: cancellationToken);
        if (league == null)
            return null;
        
        var leagueDetail = new GetLeagueDetailDto
        {
            Id = league.EntityId, 
            Name = league.Name,
            SubName = league.SubName,
            Description = league.Description,
            Information = league.Information,
            MediaId = league.MediaId, 
        };
        
        var games = await (await _context.Games
                .FindAsync(x => x.LeagueId == request.LeagueId, cancellationToken: cancellationToken))
            .ToListAsync(cancellationToken: cancellationToken);
        
        var events = (await (await _context.Events
                .FindAsync(x => x.LeagueId == request.LeagueId, cancellationToken: cancellationToken))
            .ToListAsync(cancellationToken: cancellationToken))
            .OrderBy(x => x.StartDate)
            .ToDictionary(x => x.EntityId, x => x);
        
        var teams = await (await _context.Teams
                .FindAsync(x => x.LeagueId == request.LeagueId, cancellationToken: cancellationToken))
            .ToListAsync(cancellationToken: cancellationToken);

        var users = (await (await _context.Users
                .FindAsync(x => x.LeagueId == request.LeagueId, cancellationToken: cancellationToken))
            .ToListAsync(cancellationToken: cancellationToken));
        
        MapTeams(leagueDetail, teams, games, events);
        MapGames(leagueDetail, games);
        MapUsers(leagueDetail, users);
        MapEvents(leagueDetail, events);
        
        return leagueDetail;
    }

    private void MapEvents(GetLeagueDetailDto leagueDetail, IDictionary<string, EventDb> events)
    {
        foreach (var eventDb in events)
        {
            leagueDetail.Events.Add(eventDb.Key, new GetLeagueDetailEventDto
            {
                Name = eventDb.Value.Name,
                StartDate = eventDb.Value.StartDate,
                EndDate = eventDb.Value.EndDate,
                Games = eventDb.Value.Games != null && eventDb.Value.Games.Any() 
                    ? eventDb.Value.Games.Select(x => new GetLeagueDetailEventGameDto
                        {
                            Id = x.Id,
                            HomeTeamId = x.HomeTeamId,
                            GuestTeamId = x.GuestTeamId,
                        }) 
                        .ToList()
                    : new List<GetLeagueDetailEventGameDto>(),
            });
        }
    }
    
    private void MapUsers(GetLeagueDetailDto leagueDetail, IList<UserDb> users)
    {
        foreach (var user in users)
        {
            leagueDetail.Users.Add(user.EntityId, user.Name);
        }
    }
    
    private void MapTeams(GetLeagueDetailDto leagueDetail, IList<TeamDb> teams, IList<GameDb> games, IDictionary<string, EventDb> events)
    {
        foreach (var team in teams)
        {
            if (team.Hidden)
                continue;
            
            var teamdDto = new GetLeagueDetailTeamDto
            {
                Name = team.Name,
                MediaId = team.MediaId,
                Description = team.Description,
                GameIds = games
                    .Where(x => x.HomeTeam.Id == team.EntityId ||x.GuestTeam.Id == team.EntityId)
                    .Where(x => events.ContainsKey(x.EventId))
                    .Select(x => new { GameId = x.EntityId, Event = events[x.EventId] })
                    .OrderByDescending(x => x.Event.StartDate)
                    .Select(x => x.GameId)
                    .ToList(),
                UserIds = team.MemberIds.ToList()
            };
            
            leagueDetail.Teams.Add(team.EntityId, teamdDto);
        }
    }
    
    private void MapGames(GetLeagueDetailDto leagueDetail, IList<GameDb> games)
    {
        foreach (var game in games)
        {
            if (!leagueDetail.Teams.ContainsKey(game.HomeTeam.Id)
                || !leagueDetail.Teams.ContainsKey(game.GuestTeam.Id))
                continue;
            
            var gameDto = new GetLeagueDetailGameDto
            {
                EventId = game.EventId,
                
                HomeTeamId = game.HomeTeam.Id,
                HomeTeamScore = game.HomeTeam.Score,
                HomeTeamBestMemberId = game.HomeTeam.BestMemberId,
                HomeMembers = game.HomeTeam.Members.Any()
                    ? game.HomeTeam.Members.Select(x => new GetLeagueDetailGameUserDto
                        {
                            Id = x.Id,
                            Score = x.Score,
                            Help = x.Help,
                        })
                        .ToList()
                    : new List<GetLeagueDetailGameUserDto>(),
                
                GuestTeamId = game.GuestTeam.Id,
                GuestTeamScore = game.GuestTeam.Score,
                GuestTeamBestMemberId = game.GuestTeam.BestMemberId,
                GuestMembers = game.GuestTeam.Members.Any()
                    ? game.GuestTeam.Members.Select(x => new GetLeagueDetailGameUserDto
                        {
                            Id = x.Id,
                            Score = x.Score,
                            Help = x.Help,
                        })
                        .ToList()
                    : new List<GetLeagueDetailGameUserDto>(),
            };
                
            leagueDetail.Games.Add(game.EntityId, gameDto);
        }
    }
}