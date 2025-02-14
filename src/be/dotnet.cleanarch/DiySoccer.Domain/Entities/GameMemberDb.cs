using MongoDB.Bson.Serialization.Attributes;

namespace DiySoccer.Domain.Entities
{
    public class GameMemberDb
    {
        [BsonElement("id")]
        public string Id { get; set; }

        [BsonElement("score")]
        public int Score { get; set; }

        [BsonElement("help")]
        public int Help { get; set; }
    }
}
