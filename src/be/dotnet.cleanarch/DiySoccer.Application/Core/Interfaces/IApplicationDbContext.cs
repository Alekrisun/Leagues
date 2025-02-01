using DiySoccer.Domain.Entities;
using MongoDB.Driver;

namespace DiySoccer.Application.Core.Interfaces;

public interface IApplicationDbContext
{
    IMongoCollection<LeagueDb> Leagues { get; }
}