namespace DiySoccer.Application.Authenticate.Queries.Login;

public class GetTokenDto
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
    public bool IsAdmin { get; set; }
}