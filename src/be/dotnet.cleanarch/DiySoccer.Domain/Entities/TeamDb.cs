using MongoDB.Bson.Serialization.Attributes;

namespace DiySoccer.Domain.Entities
{
    [BsonIgnoreExtraElements]
    public class TeamDb
    {
        [BsonId]
        public string EntityId { get; set; }
        
        [BsonElement("lid")]
        public string LeagueId { get; set; }

        [BsonElement("rid")]
        public string ReferenceId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("hidden")]
        public bool Hidden { get; set; }

        [BsonElement("mediaId")]
        public string MediaId { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("members")]
        public IEnumerable<string> MemberIds { get; set; }

        public TeamDb()
        {
            MemberIds = Enumerable.Empty<string>();
        }
    }
}
