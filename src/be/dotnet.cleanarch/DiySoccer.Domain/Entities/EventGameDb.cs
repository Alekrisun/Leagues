using MongoDB.Bson.Serialization.Attributes;

namespace DiySoccer.Domain.Entities
{
    public class EventGameDb
    {
        [BsonElement("id")]
        public int Id { get; set; }

        [BsonElement("homeTeamId")]
        public string HomeTeamId { get; set; }

        [BsonElement("guestTeamId")]
        public string GuestTeamId { get; set; }
    }
}
