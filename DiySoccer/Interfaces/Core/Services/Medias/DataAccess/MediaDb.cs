using MongoDB.Bson.Serialization.Attributes;

namespace Interfaces.Core.Services.Medias.DataAccess
{
    public class MediaDb
    {
        [BsonId]
        public string EntityId { get; set; }

        // Base64 string
        [BsonElement("data")]
        public string Data { get; set; }

        [BsonElement("dataBase24")]
        public byte[] DataBytes { get; set; }

        [BsonElement("url")]
        public string RelativeUrl { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("type")]
        public string ContentType { get; set; }
    }
}
