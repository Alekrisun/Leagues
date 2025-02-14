using MongoDB.Bson.Serialization.Attributes;

namespace DiySoccer.Domain.Entities
{
    public class GameTeamDb
    {
        [BsonElement("id")]
        public string Id { get; set; }

        [BsonElement("score")]
        public int Score { get; set; }

        [BsonElement("bestId")]
        public string BestMemberId { get; set; }

        [BsonElement("members")]
        public IEnumerable<GameMemberDb> Members { get; set; }

        public GameTeamDb()
        {
            Members = Enumerable.Empty<GameMemberDb>();
        }
    }
}
