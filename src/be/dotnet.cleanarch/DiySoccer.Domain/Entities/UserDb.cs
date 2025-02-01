using MongoDB.Bson.Serialization.Attributes;

namespace DiySoccer.Domain.Entities
{
    public class UserDb
    {
        [BsonId]
        public string EntityId { get; set; }

        [BsonElement("lid")]
        public string LeagueId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }
}
