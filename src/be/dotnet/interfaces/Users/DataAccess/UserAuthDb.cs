using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Interfaces.Users.DataAccess
{
    [BsonIgnoreExtraElements]
    public class UserAuthDb
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string UserName { get; set; }
        
        public string Email { get; set; }
        
        public bool IsAdmin { get; set; }
    }
}
