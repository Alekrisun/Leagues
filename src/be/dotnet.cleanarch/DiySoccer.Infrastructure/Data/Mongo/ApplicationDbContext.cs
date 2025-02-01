using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Domain.Entities;
using MongoDB.Driver;

namespace DiySoccer.Infrastructure.Data.Mongo;

public class ApplicationDbContext : IApplicationDbContext
{
    private readonly IMongoClient _client;
    private readonly IMongoDatabase _database;
    
    protected IMongoCollection<LeagueDb> LeaguesCollection { get; }
    public IMongoCollection<LeagueDb> Leagues => LeaguesCollection;
    
    public ApplicationDbContext()
    {
        _client = new MongoClient(MongoConnetcionString.ConnectionString);
        _database = _client.GetDatabase(MongoConnetcionString.Database);
        LeaguesCollection = _database.GetCollection<LeagueDb>("leagues");
    }
}