using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Domain.Entities;
using MongoDB.Driver;

namespace DiySoccer.Infrastructure.Data.Mongo;

public class ApplicationDbContext : IApplicationDbContext
{
    public IMongoCollection<LeagueDb> Leagues { get; private set; }
    public IMongoCollection<EventDb> Events { get; }
    public IMongoCollection<GameDb> Games { get; }
    public IMongoCollection<TeamDb> Teams { get; }
    public IMongoCollection<UserDb> Users { get; }

    public ApplicationDbContext()
    {
        var client = new MongoClient(MongoConnetcionString.ConnectionString);
        var database = client.GetDatabase(MongoConnetcionString.Database);
        
        Leagues = database.GetCollection<LeagueDb>("leagues");
        Events = database.GetCollection<EventDb>("events");
        Games = database.GetCollection<GameDb>("games");
        Teams = database.GetCollection<TeamDb>("teams");
        Users = database.GetCollection<UserDb>("users");
    }
}