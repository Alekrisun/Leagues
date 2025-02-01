using System.Text.Json.Serialization;

namespace DiySoccer.Domain.Entities;

public class ApplicationUserDb
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }

    [JsonIgnore]
    public string Password { get; set; }
    
    [JsonIgnore]
    public bool IsAdmin { get; set; }
}