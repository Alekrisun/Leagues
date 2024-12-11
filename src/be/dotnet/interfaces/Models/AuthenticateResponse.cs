using interfaces.Entities;

namespace interfaces.Models;

public class AuthenticateResponse
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
    public bool IsAdmin { get; set; }

    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Username = user.Username;
        Token = token;
        IsAdmin = user.IsAdmin;
    }
}