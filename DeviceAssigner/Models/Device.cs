using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DeviceAssigner.Models
{
    public class Device 
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Status { get; set; }

    }
}