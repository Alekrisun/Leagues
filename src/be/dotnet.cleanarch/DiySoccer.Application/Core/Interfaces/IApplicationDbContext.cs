using DiySoccer.Domain.Entities;
using MongoDB.Driver;

namespace DiySoccer.Application.Core.Interfaces;

public interface IApplicationDbContext
{
    IMongoCollection<LeagueDb> Leagues { get; }
    IMongoCollection<EventDb> Events { get; }
    IMongoCollection<GameDb> Games { get; }
    IMongoCollection<TeamDb> Teams { get; }
    IMongoCollection<UserDb> Users { get; }
}